import axios from 'axios'

const request = 'https://restcountries.com/v3.1/all'

const getAllLanguagesByCountries = (countries) => {
    const list = countries.map((c) => {
        if (!c.languages) return
        return Object.values(c.languages)
    }).flat().sort().filter(v => v !== undefined)

    return ['ALL', ...new Set(list)]
}

export const getCountriesFromCache = () => {
    const cached = localStorage.getItem('countries')
    if (!cached) return undefined;
    const countries = JSON.parse(cached)
    const total = countries
    const regions = ['ALL', ...new Set(countries.map((country) => country.region).flat())].sort().flat()
    const langs = getAllLanguagesByCountries(countries)
    return { countries, total, regions, langs }
}

const setCache = (countries) => localStorage.countries = JSON.stringify(countries)

const requestApi = async () => {
    return await axios.get(request)
}

export const getCountriesFromApi = async () => {
    const response = await requestApi()
    if (!response) return undefined
    const countries = response.data.sort((a, b) => a.name.common > b.name.common ? 1 : -1)
    const regions = ['ALL', ...new Set(response.data.map((country) => country.region).flat())].sort().flat()
    const langs = getAllLanguagesByCountries(response.data)
    const total = countries
    setCache(countries)

    return { countries, total, regions, langs }
}