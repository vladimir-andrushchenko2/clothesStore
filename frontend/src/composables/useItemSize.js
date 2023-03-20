import { ref } from 'vue'

export default function useItemSize() {
  // uses ref because used in computed furher
  const sizeOfItem = ref(null)

  function setSizeOfItem(value) {
    if (value === 'none') {
      sizeOfItem.value = null
      return
    }

    sizeOfItem.value = value
  }

  return { sizeOfItem, setSizeOfItem }
}
