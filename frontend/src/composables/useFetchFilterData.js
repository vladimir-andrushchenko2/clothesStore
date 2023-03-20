import { ref } from 'vue'
import api from '@/utils/api'

export default function useFetchItemViewData() {
  const categories = ref(null)
  api.getProductCategories().then((items) => categories.value = items)

  const materials = ref(null)
  api.getMaterials().then((items) => materials.value = items)

  const seasons = ref(null)
  api.getSeasons().then((items) => seasons.value = items)

  return { categories, materials, seasons }
}

