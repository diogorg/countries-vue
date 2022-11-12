import Vuex from 'vuex'
import {state} from './state'
import {mutation} from './mutation'

export const store = new Vuex.Store({
    state: () => state,
    mutations: mutation,
    actions: {}
})