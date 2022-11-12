import { state } from '@/vuex/state'

describe('Vuex State', () => {
    it('Should validate state', () => {
        expect(state).toEqual({
            total: [],
            countries: [],
            regions: ['ALL'],
            langs: ['ALL'],
            dialog: false,
            selected: null
        })
    })
})