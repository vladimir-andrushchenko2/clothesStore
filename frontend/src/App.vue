<script setup>
import { RouterView } from 'vue-router'
import HeaderBase from './components/HeaderBase.vue'
import FooterBase from './components/FooterBase.vue'
import { useCartStore } from './stores/cart'
import api from './utils/api'

const store = useCartStore()

api.getCart().then((items) => {
  store.setItems(items)
})
</script>

<template>
  <HeaderBase />

  <RouterView />

  <FooterBase />
</template>
