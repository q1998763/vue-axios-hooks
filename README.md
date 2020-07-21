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
    const { refetch, loading, data, cancel } = useAxios({
      url: 'https://reqres.in/api/users?delay=1'
    })

    refetch()

    return {
      loading,
      refetch,
      data,
      cancel
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

## License

MIT

[axios]: https://github.com/axios/axios