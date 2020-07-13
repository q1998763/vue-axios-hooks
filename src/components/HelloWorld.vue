<template>
  <div class="hello">
    name: {{ store.name }}
  </div>
</template>

<script>
import useStore from '@/store'

export default {
  setup () {
    const { store } = useStore()

    return {
      store
    }
  }
}
</script>
