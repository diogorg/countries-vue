import { store } from '@/vuex/index'
import {Store} from 'vuex'

describe('Vuex Store', () => {
    it('Should Create Store', () => {
        expect(store).toBeInstanceOf(Store)
    })
})