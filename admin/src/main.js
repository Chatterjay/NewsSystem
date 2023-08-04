import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入ElementPlus组件
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

// 引入axios拦截器
import "@/util/axios.config"

createApp(App)
    .use(ElementPlus)
    .use(store)
    .use(router)
    .mount('#app')

