<script setup>
import IconClose from '@/components/icons/IconClose.vue'
import api from '@/utils/api'
import { defineProps } from 'vue'
import { useCartStore } from '@/stores/cart'

const store = useCartStore()

const props = defineProps({
  basketItemId: {
    type: Number,
    required: true
  }
})

function handleClick() {
  api.deleteCartItem(props.basketItemId).then((items) => {
    store.setItems(items)
  })
}
</script>

<template>
  <button
    @click="handleClick"
    class="product__del button-del"
    type="button"
    aria-label="Удалить товар из корзины"
  >
    <IconClose />
  </button>
</template>
