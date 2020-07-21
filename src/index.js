import { reactive, toRefs, provide, inject } from 'vue'
import StaticAxios, { CancelToken } from 'axios'

const AxiosSymbol = window.Symbol()

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

function useConfigure (options = {}) {
  if (options.axios !== undefined) {
    provide(AxiosSymbol, options.axios)
  }
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

  const refetch = () => request(config, options)

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
