// @ts-nocheck
import './assets/less/base.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Buffer } from 'buffer'

const app = createApp(App)
//创建store实例
const store = createPinia()
//使用持久化插件
store.use(piniaPluginPersistedstate)
app.use(store)
//使用路由插件
app.use(router)
//使用UI插件
app.use(ElementPlus)

//注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

window.Buffer = Buffer

app.mount('#app')
