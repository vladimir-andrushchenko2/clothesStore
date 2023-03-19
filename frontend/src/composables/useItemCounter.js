import { ref, computed } from 'vue'

export default function useItemCounter() {
  const itemCounter = ref(1)

  const isMinItemAmount = computed(() => itemCounter.value < 2)

  function decrementItemCounter() {
    if (itemCounter.value > 1) {
      itemCounter.value--
    }
  }

  function incrementItemCounter() {
    itemCounter.value++
  }

  function setItemCounter(value) {
    itemCounter.value = value
  }

  return {
    itemCounter,
    decrementItemCounter,
    incrementItemCounter,
    setItemCounter,
    isMinItemAmount
  }
}
