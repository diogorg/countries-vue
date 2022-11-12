const hasNoFilter = (name, region, lang) => name == null && 
(region == null || region == 'ALL') &&
(lang == null || lang == 'ALL')

const hasFilterByRegion = (region) => region != null && region != 'ALL'

const hasFilterByLangs = (lang) => lang != null && lang != 'ALL'

const hasFilterByName = (name) => name

export const filterCountries = (total, name, region, lang) => {
        let countries = total
        if (hasNoFilter(name, region, lang)) return countries
        if (hasFilterByRegion(region)) {
            countries = countries.filter((c) => c.region == region)
        }
        if (hasFilterByLangs(lang)) {
            countries = countries.filter((c) => c.languages && Object.values(c.languages).includes(lang))
        }
        if (hasFilterByName(name)) {
            countries = countries.filter((c) =>
                c.name.common.toUpperCase().indexOf(name.toUpperCase()) >= 0
            )
        }

        return countries
    }