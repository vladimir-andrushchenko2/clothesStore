<script setup>
import { defineProps } from 'vue'

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
      <h3>{{ item.item.title }} ({{ item.quantity }})</h3>
      <b>{{ item.item.price * item.quantity }} ₽</b>
      <span>Артикул: {{ item.item.id }}</span>
    </li>
  </ul>

  <div class="cart__total">
    <p>
      Доставка: <b>{{ deliveryPrice }}</b>
    </p>
    <p>
      Итого: <b>{{ sizeOfCart }}</b> товара на сумму <b>{{ totalPrice }} ₽</b>
    </p>
  </div>
</template>
