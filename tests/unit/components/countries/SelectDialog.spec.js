import { shallowMount } from '@vue/test-utils'
import SelectDialog from '@/components/countries/SelectDialog.vue'
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

describe('SelectDialog.vue', () => {
    it('Should match snapshot', () => {
        const wrap = shallowMount(SelectDialog, {
            global
        })
        expect(wrap.html()).toMatchSnapshot()
    })
})