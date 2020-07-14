import { reactive, toRefs, provide, inject } from 'vue'
import StaticAxios from 'axios'

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
    // axiosInstance = options.axios
    console.log('1')
    provide(AxiosSymbol, options.axios)
  }
}

async function executeRequest (config) {
  try {
    state.loading = true

    const response = await axiosInstance(config)
    state.data = response

    return response
  } catch (err) {
    console.log(err)
    throw err
  } finally {
    state.loading = false
  }
}

function request (config) {
  return executeRequest(config)
}

function useAxios (config) {
  config = configToObject(config)

  axiosInstance = inject(AxiosSymbol, StaticAxios)

  const refetch = () => request(config)

  return {
    ...toRefs(state),
    refetch
  }
}

export default useAxios

export {
  useConfigure
}
