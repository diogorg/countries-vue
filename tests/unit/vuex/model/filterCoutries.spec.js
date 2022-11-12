import data from '../../api-mock/min.json'
import { filterCountries } from '@/vuex/model/filter-countries'

describe('Vuex Model Filter Coutries', () => {
    it('Should FReturn With No Filter', () => {
        const result = filterCountries(data, null, null, null)
        expect(result).toEqual(data)
    })
    it('Should Filter By Name', () => {
        const result = filterCountries(data, 'br', null, null)
        expect(result.length).toEqual(1)
        expect(result[0].name.common).toEqual('Brunei')
    })
    it('Should Filter By Region', () => {
        const result = filterCountries(data, null, 'Europe', null)
        expect(result.length).toEqual(19)
        expect(result[0].name.common).toEqual('Bulgaria')
        expect(result[18].name.common).toEqual('Luxembourg')
        const find = result.filter((c) => c.region != 'Europe')
        expect(find).toEqual([])
    })
    it('Should Filter By Lang', () => {
        const result = filterCountries(data, null, null, 'French')
        expect(result.length).toEqual(18)
        expect(result[0].name.common).toEqual('Guadeloupe')
        expect(result[17].name.common).toEqual('Luxembourg')
        const find = result.filter((c) => Object.values(c.languages).includes('Thai'))
        expect(find).toEqual([])
    })
})