import { shallowMount } from '@vue/test-utils'
import CountryResult from '@/components/countries/CountryResult.vue'
import { createStore } from 'vuex'
import { state } from '@/vuex/state'
import { components } from './basic-components'

const store = createStore({
    state() {
        return state
    }
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
})