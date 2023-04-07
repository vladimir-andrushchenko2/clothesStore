<script setup>
import { ref, defineEmits, computed } from 'vue'
import useFetchFilterData from '@/composables/useFetchFilterData'
import useSelect from '@/composables/useSelect'

const emit = defineEmits(['filter'])

const { categories, materials, seasons } = useFetchFilterData()

const [
  getSelectedMaterialsIds,
  selectMaterial,
  isMaterialIdSelected,
  clearMaterialIds,
  isMaterialsEmpty
] = useSelect()
const [getSelectedSeasonsIds, selectSeason, isSeasonIdSelected, clearSeasonIds, isSeasonsEmpty] =
  useSelect()
const categoryId = ref(null)
const minPrice = ref(null)
const maxPrice = ref(null)

const isClearBtnShown = computed(() => {
  return [
    categoryId.value,
    minPrice.value,
    maxPrice.value,
    !isMaterialsEmpty(),
    !isSeasonsEmpty()
  ].some((val) => val)
})

function handleSubmit() {
  emit('filter', {
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    materialIds: getSelectedMaterialsIds(),
    seasonIds: getSelectedSeasonsIds(),
    categoryId: categoryId.value
  })
}

function handleClear() {
  maxPrice.value = null
  minPrice.value = null
  categoryId.value = null
  clearMaterialIds()
  clearSeasonIds()
  emit('filter', null)
}
</script>

<template>
  <aside class="filter">
    <form class="filter__form form" @submit.prevent="handleSubmit">
      <fieldset class="form__block">
        <legend class="form__legend">Price</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="number" name="min-price" v-model.number="minPrice" />
          <span class="form__value">From</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="number" name="max-price" v-model.number="maxPrice" />
          <span class="form__value">To</span>
        </label>
      </fieldset>

      <fieldset v-if="categories" class="form__block">
        <legend class="form__legend">Category</legend>
        <label class="form__label form__label--select">
          <select v-model="categoryId" class="form__select" name="category">
            <option :value="null">All categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.slug }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset v-if="materials" class="form__block">
        <legend class="form__legend">Material</legend>
        <ul class="check-list">
          <li v-for="material in materials" :key="material.id" class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                :value="material.id"
                @change="selectMaterial(material.id)"
                :checked="isMaterialIdSelected(material.id)"
              />
              <span class="check-list__desc">
                {{ material.code }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset v-if="seasons" class="form__block">
        <legend class="form__legend">Collection</legend>
        <ul class="check-list">
          <li v-for="season in seasons" :key="season.id" class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="season.id"
                @change="selectSeason(season.id)"
                :checked="isSeasonIdSelected(season.id)"
              />
              <span class="check-list__desc">
                {{ season.code }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">Apply filter</button>
      <button
        v-if="isClearBtnShown"
        @click="handleClear"
        class="filter__reset button button--second"
        type="button"
      >
        Reset
      </button>
    </form>
  </aside>
</template>
