import { createApp } from 'vue'
import Axios from 'axios'
// import LRU from 'lru-cache'
import { configure } from './index.js'
import App from './App.vue'

const axios = Axios.create({
  baseURL: 'https://reqres.in/api'
})

axios.interceptors.response.use(
  (res) => {
    return res.data
  }
)

// const cache = new LRU({ max: 10 })

configure({ axios })

createApp(App).mount('#app')
