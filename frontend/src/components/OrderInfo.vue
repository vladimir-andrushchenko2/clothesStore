<script setup>
import { selectItemTitle } from '@/utils/selectors'

defineProps({
  items: {
    type: Array,
    required: true
  },
  sizeOfCart: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  deliveryPrice: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <ul class="cart__orders">
    <li v-for="item in items" :key="item.item.id" class="cart__order">
      <h3>{{ selectItemTitle(item.item) }} ({{ item.quantity }})</h3>
      <b>{{ item.item.price * item.quantity }} ₽</b>
      <span>item ID: {{ item.item.id }}</span>
    </li>
  </ul>

  <div class="cart__total">
    <p>
      Delivery price: <b>{{ deliveryPrice }}</b>
    </p>
    <p>
      Total: <b>{{ sizeOfCart }}</b> items <b>{{ totalPrice }} $</b>
    </p>
  </div>
</template>
