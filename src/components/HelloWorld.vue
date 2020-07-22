<template>
  <div class="hello">
    <div>
      {{ loading }}
      {{ data }}
    </div>
    <button @click="getData">refetch</button>
    <button @click="cancel">cancel</button>
    <button @click="getError">error</button>
    {{ error }}
  </div>
</template>

<script>
import useAxios from '../index'

export default {
  setup () {
    const { refetch, loading, data, cancel } = useAxios({
      method: 'get',
      url: '/users?delay=1'
    }, {
      debounce: 300
    })

    const { refetch: errorFetch, error } = useAxios('https://reqres.in/api/unknown/23?delay=1')

    const getData = () => {
      refetch()
    }

    const getError = () => {
      errorFetch()
    }

    return {
      loading,
      getData,
      data,
      cancel,
      getError,
      error
    }
  }
}
</script>
