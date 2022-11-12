import { mutation } from '@/vuex/mutation'
import { filterCountries } from '@/vuex/model/filter-countries'
import { getCountriesFromCache, getCountriesFromApi } from '@/vuex/model/get-countries'
import { apiFailNotification, apiSuccessNotification } from '@/notifications'

jest.mock('@/vuex/model/filter-countries')
jest.mock('@/vuex/model/get-countries')
jest.mock('@/notifications')

const quasar = jest.fn()
let state = {
    total: [],
    countries: [],
    regions: ['ALL'],
    langs: ['ALL'],
    dialog: false,
    selected: null
}

describe('Vuex Mutation', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('Should Select Coutry', () => {
        mutation.selectCountry(state, { country: 'Brazil' })
        expect(state.dialog).toBeTruthy()
        expect(state.selected).toEqual('Brazil')
    })

    it('Should Close Dialog', () => {
        state.dialog = true
        state.selected = 'Brazil'
        mutation.closeDialog(state)
        expect(state.dialog).toBeFalsy()
        expect(state.selected).toBeNull()
    })

    it('Should Filter Countries', () => {
        const expected = [1, 2, 3]
        filterCountries.mockImplementation(() => expected)
        mutation.filterCountries(state, { name: 'name', region: 'region', lang: 'lang' })
        expect(state.countries).toEqual(expected)
        expect(filterCountries).toBeCalledTimes(1)
    })

    it('Should Get All Countries From API And Send Success Notification', () => {
        const countries = [1]
        const total = [2]
        const regions = [3]
        const langs = [4]
        getCountriesFromCache.mockImplementation(() => undefined)
        getCountriesFromApi.mockImplementation(() => ({ countries, total, regions, langs }))
        apiSuccessNotification.mockImplementation(() => true)
        mutation.getAllCountriesAndRegions(state, { quasar })
        expect(state.countries).toEqual(countries)
        expect(getCountriesFromCache).toBeCalledTimes(1)
        expect(getCountriesFromApi).toBeCalledTimes(1)
        expect(apiSuccessNotification).toBeCalledTimes(1)
        expect(apiSuccessNotification).toBeCalledWith(quasar)
        expect(apiFailNotification).toBeCalledTimes(0)
    })

    it('Should Fail Getting All Countries From API And Send Fail Notification', () => {

        getCountriesFromCache.mockImplementation(() => undefined)
        getCountriesFromApi.mockImplementation(() => undefined)
        apiFailNotification.mockImplementation(() => true)
        mutation.getAllCountriesAndRegions(state, { quasar })
        expect(getCountriesFromCache).toBeCalledTimes(1)
        expect(getCountriesFromApi).toBeCalledTimes(1)
        expect(apiSuccessNotification).toBeCalledTimes(0)
        expect(apiFailNotification).toBeCalledTimes(1)
        expect(apiFailNotification).toBeCalledWith(quasar)
    })

    it('Should Get All Countries From Cache And Send Success Notification', () => {
        const countries = [1]
        const total = [2]
        const regions = [3]
        const langs = [4]
        getCountriesFromCache.mockImplementation(() => ({ countries, total, regions, langs }))
        apiSuccessNotification.mockImplementation(() => true)
        mutation.getAllCountriesAndRegions(state, { quasar })
        expect(state.countries).toEqual(countries)
        expect(getCountriesFromCache).toBeCalledTimes(1)
        expect(getCountriesFromApi).toBeCalledTimes(0)
        expect(apiSuccessNotification).toBeCalledTimes(1)
        expect(apiSuccessNotification).toBeCalledWith(quasar)
        expect(apiFailNotification).toBeCalledTimes(0)
    })
})