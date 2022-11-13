import { shallowMount } from '@vue/test-utils'
import CountryPage from '@/components/countries/CountryPage.vue'
import { createStore } from 'vuex'
import { state } from '@/vuex/state'
import { components } from './basic-components'

const store = createStore({
    state() {
        return state
    },
    mutations: {
        getAllCountriesAndRegions() {
            return []
        }
    }
})

const global = {
    components,
    mocks: {
        $store: store
    }
}

describe('CountryPage.vue', () => {
    it('Should match snapshot', () => {
        const wrap = shallowMount(CountryPage, {
            global
        })
        expect(wrap.html()).toMatchSnapshot()
    })
})