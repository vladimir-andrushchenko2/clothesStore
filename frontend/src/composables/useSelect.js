import { ref } from 'vue'

export default function useSelect() {
  const selected = ref(new Set())

  function select(itemId) {
    if (selected.value.has(itemId)) {
      selected.value.delete(itemId)
    } else {
      selected.value.add(itemId)
    }
  }

  function getSelected() {
    return Array.from(selected.value)
  }

  function isSelected(itemId) {
    return selected.value.has(itemId)
  }

  function clear() {
    selected.value.clear()
  }

  return [getSelected, select, isSelected, clear]
}
