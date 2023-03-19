import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCartStore = defineStore('cart', () => {
  const state = ref([])

  const sizeOfCart = computed(() => state.value.length)

  const items = computed(() => state.value)

  const totalPrice = computed(() => {
    return state.value
      .map((item) => item.quantity * item.item.price)
      .reduce((prev, curr) => prev + curr, 0)
  })

  function setItems(items) {
    state.value = items
  }

  return { sizeOfCart, items, setItems, totalPrice }
})

