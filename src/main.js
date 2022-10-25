import { createApp } from 'vue'
import App from './components/App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {store} from './vuex'
library.add(faGithub)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(Quasar, quasarUserOptions)
    .use(store)
    .mount('#app')
