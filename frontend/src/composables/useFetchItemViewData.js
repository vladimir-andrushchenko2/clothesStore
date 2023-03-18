import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

import api from '@/utils/api'
import getImgOfColor from '@/helpers/getImgColor'

export default function useFetchItemViewData() {
  const route = useRoute()

  const item = ref(null)
  const currentColorId = ref(null)

  api.getProduct(route.params.id).then((product) => {
    item.value = product
    currentColorId.value = product.colors[0].id
  })

  const computedCurrentImg = computed(() => {
    if (item.value) {
      return getImgOfColor(item.value, currentColorId.value)
    }

    return ''
  })

  return { item, currentColorId, computedCurrentImg }
}
