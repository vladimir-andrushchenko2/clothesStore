import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCartStore = defineStore('cart', () => {
  const state = ref([])

  const getSizeOfCart = computed(() => state.value.length)

  const getItems = computed(() => state.value)

  function setItems(items) {
    state.value = items
  }

  return { state, getSizeOfCart, getItems, setItems }
})

