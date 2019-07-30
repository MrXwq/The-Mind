import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

const axios = require('axios')
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000',
})

// 请求拦截器，给请求头添加一个Authorization，有什么授权信息的时候可以传，这里传的是token
Vue.prototype.$http.interceptors.request.use(config => {
  if(localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
}, err => {
  return Promise.reject(err)
})
// axios的 http拦截器 通用的错误处理 响应拦截器
Vue.prototype.$http.interceptors.response.use(res => {
  return res
},err => {
  // 有内容的时候
  if(err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  if(err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})

// 注册全局组件
import Published from './components/Published.vue'
Vue.component('m-published', Published)
import MoodContent from './components/MoodContent.vue'
Vue.component('m-moodcontent', MoodContent)


// 全局都可以使用这个函数
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL+'/upload'
    }
  }
})

import './assets/scss/style.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
