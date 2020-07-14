# vue-axios-hooks

Vue3 hooks for [axios]

## Installation

`npm install axios vue-axios-hooks`

## Quick Start

```js
<script>
import useAxios from 'vue-axios-hooks'

export default {
  setup () {
    const { refetch, loading, data } = useAxios({
      url: 'https://reqres.in/api/users?delay=1'
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
```

## License

MIT
