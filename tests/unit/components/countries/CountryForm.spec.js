import { shallowMount } from '@vue/test-utils'
import CountryForm from '@/components/countries/CountryForm.vue'
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

describe('CountryForm.vue', () => {
    it('Should match snapshot', () => {
        const wrap = shallowMount(CountryForm, {
            global
        })
        expect(wrap.html()).toMatchSnapshot()
    })
})