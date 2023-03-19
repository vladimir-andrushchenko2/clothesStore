<script setup>
import CartItemQuantity from '@/components/CartItemQuantity.vue'
import CartItemDeleteBtn from '@/components/CartItemDeleteBtn.vue'
import { defineProps } from 'vue'
import getImgOfColor from '@/helpers/getImgColor'

const props = defineProps({
  cartItem: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="getImgOfColor(cartItem.item, cartItem.colorId)"
        width="120"
        height="120"
        :alt="cartItem.item.title"
      />
    </div>
    <h3 class="product__title">{{ cartItem.item.title }}</h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{ backgroundColor: cartItem.colorCode }"></i>
        {{ cartItem.colorTitle }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ cartItem.item.id }} </span>

    <CartItemQuantity :quantity="cartItem.quantity" :basket-item-id="props.cartItem.basketItemId" />

    <b class="product__price"> {{ cartItem.item.price * cartItem.quantity }} ₽ </b>

    <CartItemDeleteBtn :basket-item-id="props.cartItem.basketItemId" />
  </li>
</template>
