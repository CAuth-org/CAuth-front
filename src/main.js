import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from '@/router/index.js'

createApp(App)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
