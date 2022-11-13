import { shallowMount } from '@vue/test-utils'
import CountryResult from '@/components/countries/CountryResult.vue'
import { createStore } from 'vuex'
import { components } from './basic-components'
import data from '../../api-mock/min.json'

const state = {
    total: data,
    countries: data,
    regions: ['ALL'],
    langs: ['ALL'],
    dialog: false,
    selected: null
}

const mutations = {
    selectCountry: jest.fn()
}

const store = createStore({
    state() {
        return state
    },
    mutations
})

const global = {
    components,
    mocks: {
        $store: store
    }
}

describe('CountryResult', () => {
    it('Should match snapshot', () => {
        const wrap = shallowMount(CountryResult, {
            global
        })
        expect(wrap.html()).toMatchSnapshot()
    })

    it('Should Select Country', () => {
        const spyStore = jest.spyOn(store, 'commit')
        const spyMutation = jest.spyOn(mutations, 'selectCountry')
        const wrap = shallowMount(CountryResult, {
            global
        })
        const country = {
            name: 'aaa'
        }
        wrap.vm.selectCountry(country)
        expect(spyStore).toHaveBeenCalledTimes(1)
        expect(spyStore).toBeCalledWith('selectCountry', { country })
        expect(spyMutation).toHaveBeenCalledTimes(1)
        expect(spyMutation).toBeCalledWith(state, { country })
    })
})