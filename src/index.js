import { reactive, toRefs } from 'vue'
import StaticAxios from 'axios'
import LRU from 'lru-cache'

const useAxios = makeUseAxios()

const {
  configure
} = useAxios

export default useAxios

export {
  configure
}

function createCacheKey (config) {
  const cleanedConfig = { ...config }
  delete cleanedConfig.cancelToken

  return JSON.stringify(cleanedConfig)
}

function configToObject (config) {
  if (typeof config === 'string') {
    return {
      url: config
    }
  }

  return config
}

export function makeUseAxios (configurationOptions) {
  const state = reactive({
    loading: false,
    data: null
  })

  console.log(1, configurationOptions)
  let cache
  let axiosInstance

  function resetConfigure () {
    cache = new LRU()
    axiosInstance = StaticAxios
  }

  function configure (options = {}) {
    console.log(2, options)
    if (options.axios !== undefined) {
      axiosInstance = options.axios
    }

    if (options.cache !== undefined) {
      cache = options.cache
    }
  }

  resetConfigure()
  configure(configurationOptions)

  // function loadCache (data) {
  //   cache.load(data)
  // }

  // function clearCache () {
  //   cache.reset()
  // }

  return Object.assign(useAxios, {
    resetConfigure,
    configure
  })
  // return useAxios

  function tryStoreInCache (config, response) {
    if (!cache) {
      return
    }

    const cacheKey = createCacheKey(config)

    const responseForCache = { ...response }
    delete responseForCache.config
    delete responseForCache.request

    cache.set(cacheKey, responseForCache)
  }

  // function tryGetFromCache (config, options) {
  //   if (!cache || !options.useCache) {
  //     return
  //   }

  //   const cacheKey = createCacheKey(config)
  //   const response = cache.get(cacheKey)

  //   // if (response && dispatch) {
  //   //   dispatch({ type: actions.REQUEST_END, payload: response })
  //   // }

  //   return response
  // }

  async function executeRequest (config) {
    try {
      // dispatch({ type: actions.REQUEST_START })
      state.loading = true
      const response = await axiosInstance(config)

      tryStoreInCache(config, response)
      state.data = response
      state.loading = false
      // dispatch({ type: actions.REQUEST_END, payload: response })

      return response
    } catch (err) {
      if (!StaticAxios.isCancel(err)) {
        // dispatch({ type: actions.REQUEST_END, payload: err, error: true })
      }

      throw err
    }
  }

  async function request (config, options) {
    console.log(4, config)
    return (
      // tryGetFromCache(config, options) ||
      executeRequest(config)
    )
  }

  function useAxios (config, options) {
    config = configToObject(config)
    options = { manual: false, useCache: true, ...options }

    console.log(3, config, options)

    const run = () => request(config, options)

    return {
      ...toRefs(state),
      run
    }
  }
}
