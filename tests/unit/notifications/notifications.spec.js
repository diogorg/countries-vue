import { apiFailNotification, apiSuccessNotification } from '@/notifications'

const mockQuasar = {
    notify: jest.fn()
}

describe('Notifications', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('Should call fail notification', () => {
        const spy = jest.spyOn(mockQuasar, 'notify')
        apiFailNotification(mockQuasar)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith({
            type: 'negative',
            message: 'API Error',
            position: 'bottom-right',
            timeout: 2500,
        })
    })
    it('Should call success notification', () => {
        const spy = jest.spyOn(mockQuasar, 'notify')
        apiSuccessNotification(mockQuasar)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith({
            type: 'positive',
            message: 'Countries Loaded!',
            position: 'bottom-right',
            timeout: 2500,
        })
    })
})