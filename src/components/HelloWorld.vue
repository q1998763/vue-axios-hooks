<template>
  <div class="hello">
    <div>
      {{ loading }}
      {{ data }}
    </div>
    <button @click="refetch">refetch</button>
  </div>
</template>

<script>
import useAxios from '../index'

export default {
  setup () {
    const { refetch, loading, data } = useAxios({
      method: 'get',
      url: '/users?delay=1'
    })

    refetch()

    return {
      loading,
      refetch,
      data
    }
  }
}
</script>
