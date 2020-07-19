import { reactive, toRefs, provide, inject } from 'vue'
import StaticAxios from 'axios'

const CancelToken = StaticAxios.CancelToken
let cancel
const AxiosSymbol = window.Symbol()

const state = reactive({
  loading: false,
  data: null
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

async function executeRequest (config, options = { cancel: true }) {
  const opts = {}

  opts.cancelToken = new CancelToken(function (c) {
    cancel = c
  })

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
  }).finally(() => {
    state.loading = false
  })
}

function request (config, options) {
  if (options.cancel && cancel) {
    cancel('Operation canceled by the user.')
  }
  return executeRequest(config, options)
}

function useAxios (config, options) {
  config = configToObject(config)

  axiosInstance = inject(AxiosSymbol, StaticAxios)

  const refetch = () => request(config, options)

  return {
    ...toRefs(state),
    refetch
  }
}

export default useAxios

export {
  useConfigure
}
