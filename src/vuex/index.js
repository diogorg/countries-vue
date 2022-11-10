import Vuex from 'vuex'
import axios from 'axios'

const getAllLanguagesByCountries = (countries) => {
    const list = countries.map((c) => {
        if (!c.languages) return
        return Object.values(c.languages)
    }).flat().sort().filter(v => v !== undefined)
    return ['ALL', ...new Set(list)]
}

const state = {
    total: [],
    countries: [],
    regions: ['ALL'],
    langs: ['ALL'],
    dialog: false,
    selected: null
}

const mutation = {
    selectCountry(state, { country }) {
        state.dialog = true
        state.selected = country
    },
    closeDialog(state) {
        state.dialog = false
        state.selected = null
    },
    filterCountries(state, { name, region, lang, quasar }) {
        state.countries = []
        if (name == null && (region == null || region == 'ALL')) {
            return this.getAllCountriesAndRegions(state, { quasar })
        }
        state.countries = state.total
        if (region != null && region != 'ALL') {
            state.countries = state.countries.filter((c) => c.region == region)
        }
        if (lang != null && lang != 'ALL') {
            state.countries = state.countries.filter((c) => c.languages && Object.values(c.languages).includes(lang))
        }
        if (name) {
            state.countries = state.countries.filter((c) =>
                c.name.common.toUpperCase().indexOf(name.toUpperCase()) >= 0
            )
        }
    },
    getAllCountriesAndRegions(state, { quasar }) {
        if (localStorage.countries) {
            const countries = JSON.parse(localStorage.countries)
            state.countries = countries
            state.total = countries
            state.regions = ['ALL', ...new Set(countries.map((country) => country.region).flat())].sort().flat()
            state.langs = getAllLanguagesByCountries(countries)
            return
        }
        axios.get('https://restcountries.com/v3.1/all')
            .then(function (response) {
                state.countries = response.data.sort((a, b) => a.name.common > b.name.common ? 1 : -1)
                state.regions = ['ALL', ...new Set(response.data.map((country) => country.region).flat())].sort().flat()
                state.langs = getAllLanguagesByCountries(response.data)
                localStorage.countries = JSON.stringify(state.countries)
                state.total = state.countries
                quasar.notify({
                    type: 'positive',
                    message: 'Countries Loaded!',
                    position: 'bottom-right',
                    timeout: 2500,
                })
            })
            .catch(function (error) {
                quasar.notify({
                    type: 'negative',
                    message: error.message || 'API Error',
                    position: 'bottom-right',
                    timeout: 2500,
                })
            });
    }
}
export const store = new Vuex.Store({
    state: () => state,
    mutations: {
        ...mutation
    },
    actions: {}
})