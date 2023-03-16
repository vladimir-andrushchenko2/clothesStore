<script setup>
import ColorPalette from './ColorPalette.vue'

import { defineProps } from 'vue'

defineProps(['name', 'price'])
</script>

<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img src="img/product-1.jpg" srcset="img/product-1@2x.jpg 2x" alt="Название товара" />
    </a>

    <h3 class="catalog__title">
      <a href="#">{{ name }}</a>
    </h3>

    <span class="catalog__price"> {{ price }} ₽ </span>

    <ColorPalette />
  </li>
</template>
