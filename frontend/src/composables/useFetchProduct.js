import api from '@/utils/api'
import { ref } from 'vue'

export default function useFetchProduct(id) {
  const item = ref(null)

  const currentColorId = ref(null)

  api.getProduct(id).then((product) => {
    item.value = product

    currentColorId.value = product.colors[0].id
  })

  return { item, currentColorId }
}
