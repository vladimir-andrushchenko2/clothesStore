<script setup>
import ColorPalette from './ColorPalette.vue'

import { defineProps, ref, computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

// default color is first one in the array
const currentColorId = ref(props.item.colors[0].id)

const currentImg = computed(() => {
  // get currently selected color
  const color = props.item.colors.find((color) => color.id === currentColorId.value)

  // some colors don't have associated galleries
  if (color.gallery) {
    return color.gallery[0].file.url
  }

  // if selected color has no gallery return first color that has gallery
  return props.item.colors.find((color) => color.gallery).gallery[0].file.url
})

function handleColorChange(colorId) {
  currentColorId.value = colorId
}
</script>

<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="currentImg" :alt="item.title" />
    </a>

    <h3 class="catalog__title">
      <a href="#">{{ item.title }}</a>
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
