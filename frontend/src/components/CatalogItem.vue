<script setup>
import { defineProps, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

import ColorPalette from './ColorPalette.vue'

import getImgOfColor from '@/helpers/getImgColor'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

// default color is first one in the array
const currentColorId = ref(props.item.colors[0].id)

// const computedCurrentImg = useComputedCurrentImgBasedOnColor(props.item.colors, currentColorId)
const computedCurrentImg = computed(() => getImgOfColor(props.item, currentColorId.value))

function handleColorChange(colorId) {
  currentColorId.value = colorId
}
</script>

<template>
  <li class="catalog__item">
    <RouterLink class="catalog__pic" :to="`/item/${item.id}`">
      <img :src="computedCurrentImg" :alt="item.title" />
    </RouterLink>

    <h3 class="catalog__title">
      <RouterLink :to="`/item/${item.id}`">{{ item.title }}</RouterLink>
    </h3>

    <span class="catalog__price"> {{ item.price }} ₽ </span>

    <ColorPalette
      @color-chande="(colorId) => handleColorChange(colorId)"
      :colors="item.colors"
      :current-color-id="currentColorId"
      :item-id="item.id"
    />
  </li>
</template>
