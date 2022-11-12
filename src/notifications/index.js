export const apiFailNotification = (quasar) => {
    quasar.notify({
        type: 'negative',
        message: 'API Error',
        position: 'bottom-right',
        timeout: 2500,
    })
}

export const apiSuccessNotification = (quasar) => {
    quasar.notify({
        type: 'positive',
        message: 'Countries Loaded!',
        position: 'bottom-right',
        timeout: 2500,
    })
}