import { createApp } from 'vue'
import App from './App.vue'

import { Bootstrap } from '../node_modules/bootstrap/dist/js/bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
createApp(App).use(Bootstrap)

createApp(App).mount('#app')
