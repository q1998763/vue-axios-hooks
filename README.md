# vue-axios-hooks
[![npm version](https://badge.fury.io/js/vue-axios-hooks.svg)](https://badge.fury.io/js/vue-axios-hooks)

Vue3 hooks for [axios]

## Installation

`npm install axios vue-axios-hooks`

## Quick Start

```js
<script>
import useAxios from 'vue-axios-hooks'

export default {
  setup () {
    const { refetch, loading, data, cancel, error } = useAxios({
      url: 'https://reqres.in/api/users?delay=1'
    })

    refetch()

    return {
      loading,
      refetch,
      data,
      cancel,
      error
    }
  }
}
</script>
```

## Configuration

```js
<!-- App.vue -->
<script>
import Axios from 'axios'
import { useConfigure } from 'vue-axios-hooks'

export default {
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
```

## Debounce
If `options.debounce` is set, requests except for the last one within the debounce interval will be dropped.
```js
const { refetch, loading, data } = useAxios({
  url: 'https://reqres.in/api/users?delay=1'
}, {
  debounce: 300
})
```

## Throttle
If `options.throttle` is set, the request will be triggered once maximum within the throttle interval.
```js
const { refetch, loading, data } = useAxios({
  url: 'https://reqres.in/api/users?delay=1'
}, {
  throttle: 1000
})
```
> `debounce` and `throttle` can only be set to one

## License

MIT

[axios]: https://github.com/axios/axios