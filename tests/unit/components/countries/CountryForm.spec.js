import { shallowMount, mount } from '@vue/test-utils'
import CountryForm from '@/components/countries/CountryForm.vue'
import { createStore } from 'vuex'
import { components } from './basic-components'

const state = {
    total: [],
    countries: [],
    regions: ['ALL', 'R1', 'R2', 'R3'],
    langs: ['ALL', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'],
    dialog: false,
    selected: null
}
const mutations = {
    filterCountries: jest.fn()
}
const store = createStore({
    state() {
        return state
    },
    mutations
})

const quasar = {
    loading: {
        show: jest.fn(),
        hide: jest.fn(),
    }
}

const global = {
    components,
    mocks: {
        $store: store,
        $q: quasar
    }
}

describe('CountryForm.vue', () => {
    it('Should match snapshot', () => {
        const wrap = mount(CountryForm, {
            global
        })
        expect(wrap.html()).toMatchSnapshot()
    })

    it('Should Filter After Click on Button', async () => {
        const spy = jest.spyOn(store, 'commit')
        const spyMutation = jest.spyOn(mutations, 'filterCountries')
        const wrap = shallowMount(CountryForm, {
            global
        })
        const button = wrap.find('#filter-button')
        await button.trigger('click')

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spyMutation).toHaveBeenCalledTimes(1)
        expect(quasar.loading.show).toHaveBeenCalledTimes(1)
        expect(quasar.loading.show).toBeCalledWith({
            message: 'Filtering the countries',
            boxClass: 'bg-grey-2 text-grey-9',
            spinnerColor: 'primary'
        })
        expect(quasar.loading.hide).toHaveBeenCalledTimes(1)
    })

    it('Should Filter Langs Options', async () => {
        const wrap = await mount(CountryForm, {
            global
        })

        expect(wrap.vm.options).toEqual(['ALL', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'])
        await wrap.vm.filterLangs('L1', jest.fn())
        expect(wrap.vm.options).toEqual(['L1'])
    })

    it('Should Keep Langs Options When Filter is Null', async () => {
        const wrap = await mount(CountryForm, {
            global
        })

        expect(wrap.vm.options).toEqual(['ALL', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'])
        await wrap.vm.filterLangs(null, jest.fn())
        expect(wrap.vm.options).toEqual(['ALL', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'])
    })

    it('Should have H3', async () => {
        const wrap = await mount(CountryForm, {
            global
        })
        expect(wrap.html()).toContain('<h3 class="q-pa-sm">Filter Countries</h3>')
    })
})