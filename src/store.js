import { provide } from 'vue'

const AxiosSymbol = window.Symbol()

function useConfigure (options = {}) {
  if (options.axios !== undefined) {
    provide(AxiosSymbol, options.axios)
  }
}

export {
  useConfigure,
  AxiosSymbol
}
