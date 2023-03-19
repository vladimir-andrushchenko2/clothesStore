import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import getCartTotalPrice from '@/helpers/getCartTotalPrice'

export const useCartStore = defineStore('cart', () => {
  const state = ref([])

  const sizeOfCart = computed(() => state.value.reduce((prev, curr) => prev + curr.quantity, 0))

  const items = computed(() => state.value)

  const totalPrice = computed(() => {
    return getCartTotalPrice(state.value)
  })

  function setItems(items) {
    state.value = items
  }

  return { sizeOfCart, items, setItems, totalPrice }
})

