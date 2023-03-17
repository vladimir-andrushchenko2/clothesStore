<script setup>
import { defineEmits, defineProps } from 'vue'

defineProps({
  colors: { type: Array, required: true },
  currentColorId: { type: Number, required: true },
  itemId: { type: Number, required: true }
})

const emit = defineEmits(['colorChande'])

function onChangeColor(colorId) {
  emit('colorChande', colorId)
}
</script>

<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          :name="`color-${itemId}`"
          type="radio"
          :value="color.id"
          @change="() => onChangeColor(color.id)"
          :checked="color.id === currentColorId"
        />
        <span class="colors__value" :style="{ backgroundColor: color.code }"> </span>
      </label>
    </li>
  </ul>
</template>
