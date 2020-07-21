<template>
  <div class="hello">
    <div>
      {{ loading }}
      {{ data }}
    </div>
    <button @click="getData">refetch</button>
    <button @click="cancel">cancel</button>
  </div>
</template>

<script>
import useAxios from '../index'

export default {
  setup () {
    const { refetch, loading, data, cancel } = useAxios({
      method: 'get',
      url: '/users?delay=1'
    })

    const getData = () => {
      cancel && cancel()
      refetch()
    }

    return {
      loading,
      getData,
      data,
      cancel
    }
  }
}
</script>
