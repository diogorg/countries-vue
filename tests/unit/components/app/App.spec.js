import { shallowMount } from '@vue/test-utils'
import App from '@/components/App.vue'
import { components } from '../countries/basic-components'

const global = {
    components,
}

describe('App.vue', () => {
    it('Should match snapshot', () => {
        const wrap = shallowMount(App, { global })
        expect(wrap.html()).toMatchSnapshot()
    })
})