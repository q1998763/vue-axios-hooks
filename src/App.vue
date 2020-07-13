<template>
  <div>
    <div>
      {{ loading }}
      {{ data }}
    </div>
    <button @click="run">refetch</button>
  </div>
</template>

<script>
import useAxios from './index'

export default {
  setup () {
    const { run, loading, data } = useAxios({
      method: 'get',
      url: '/users?delay=1'
    })

    run()
    return {
      loading,
      run,
      data
    }
  }
}
</script>
