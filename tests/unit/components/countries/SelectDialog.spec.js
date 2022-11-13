import { shallowMount, mount } from '@vue/test-utils'
import SelectDialog from '@/components/countries/SelectDialog.vue'
import { createStore } from 'vuex'
import { components } from './basic-components'
import data from '../../api-mock/min.json'

const mutations = {
    closeDialog: jest.fn()
}
const store = createStore({
    state() {
        return {
            dialog: true,
            selected: data[0]
        }
    },
    mutations
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

    it('Should Show Languages', () => {
        const wrap = shallowMount(SelectDialog, {
            global
        })
        const country = {
            "languages": {
                "bel": "Belarusian",
                "rus": "Russian"
            }
        }
        expect(wrap.vm.showLangs(country)).toEqual('Belarusian - Russian')
    })

    it('Should Show Nothing When Dont Have Languages', () => {
        const wrap = shallowMount(SelectDialog, {
            global
        })
        const country = {}
        expect(wrap.vm.showLangs(country)).toEqual('-')
    })

    it('Should Close Dialog When Press The Button', async () => {
        const spy = jest.spyOn(mutations, 'closeDialog')
        const wrap = mount(SelectDialog, {
            global
        })
        const button = wrap.find('#close-button')
        await button.trigger('click')

        expect(spy).toHaveBeenCalledTimes(1)
    })
})