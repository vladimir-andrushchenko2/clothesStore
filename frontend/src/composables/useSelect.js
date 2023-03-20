export default function useSelect() {
  const selected = new Set()

  function select(itemId) {
    if (selected.has(itemId)) {
      selected.delete(itemId)
    } else {
      selected.add(itemId)
    }
  }

  function getSelected() {
    return Array.from(selected)
  }

  return [getSelected, select]
}

// import { ref } from 'vue'

// export default function useSelect() {
//   const selected = ref(new Set())

//   function select(itemId) {
//     if (selected.value.has(itemId)) {
//       selected.value.delete(itemId)
//     } else {
//       selected.value.add(itemId)
//     }
//   }

//   function getSelected() {
//     return Array.from(selected)
//   }

//   return [getSelected, select]
// }
