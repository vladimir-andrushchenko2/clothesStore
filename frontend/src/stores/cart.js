import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCartStore = defineStore('cart', () => {
  const state = ref([])

  const sizeOfCart = computed(() => state.value.length)

  const items = computed(() => state.value)

  function setItems(items) {
    state.value = items
  }

  return { sizeOfCart, items, setItems }
})

