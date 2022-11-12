import {getCountriesFromCache, getCountriesFromApi} from './model/get-countries'
import {apiFailNotification, apiSuccessNotification} from '@/notifications'
import {filterCountries} from './model/filter-countries'

export const mutation = {
    selectCountry(state, { country }) {
        state.dialog = true
        state.selected = country
    },
    closeDialog(state) {
        state.dialog = false
        state.selected = null
    },
    filterCountries(state, { name, region, lang }) {
        state.countries = filterCountries(state.total, name, region, lang)
    },
    getAllCountriesAndRegions(state, { quasar }) {
        const data = getCountriesFromCache() || getCountriesFromApi()
        if (!data) {
            apiFailNotification(quasar)
            return
        }
        apiSuccessNotification(quasar)
        state.countries = data.countries
        state.total = data.total
        state.regions = data.regions
        state.langs = data.langs
        return
    }
}