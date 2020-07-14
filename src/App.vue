<template>
  <div>
    <hello-world />
  </div>
</template>

<script>
import Axios from 'axios'
import { useConfigure } from './index.js'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    HelloWorld
  },
  setup () {
    const axios = Axios.create({
      baseURL: 'https://reqres.in/api'
    })

    axios.interceptors.response.use(
      (res) => {
        return res.data
      }
    )
    useConfigure({ axios })
  }
}
</script>
