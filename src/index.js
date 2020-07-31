import { reactive, toRefs, inject } from 'vue'
import StaticAxios, { CancelToken } from 'axios'
import { debounce, throttle } from 'lodash'
import { useConfigure, AxiosSymbol } from './store'

const state = reactive({
  loading: false,
  data: null,
  error: null
})

let axiosInstance

function configToObject (config) {
  if (typeof config === 'string') {
    return {
      url: config
    }
  }

  return config
}

function request (config, options) {
  const opts = {}
  opts.cancelToken = options.cancelToken

  state.loading = true
  axiosInstance({
    ...config,
    ...opts
  }).then(response => {
    state.data = response
  }).catch(err => {
    if (!StaticAxios.isCancel(err)) {
      console.log(err)
    }

    state.error = err
  }).finally(() => {
    state.loading = false
  })
}

function useAxios (config, options = {}) {
  config = configToObject(config)

  let source = CancelToken.source()
  options.cancelToken = source.token

  axiosInstance = inject(AxiosSymbol, StaticAxios)

  let refetch
  if (options.debounce) {
    refetch = debounce(() => request(config, options), options.debounce)
  } else if (options.throttle) {
    console.log(options.throttle)
    refetch = throttle(() => request(config, options), options.throttle)
  } else {
    refetch = () => request(config, options)
  }

  function cancel () {
    source.cancel()

    source = CancelToken.source()
    options.cancelToken = source.token
  }

  return {
    ...toRefs(state),
    refetch,
    cancel
  }
}

export default useAxios

export {
  useConfigure
}
