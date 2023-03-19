<script setup>
import CartItemQuantity from '@/components/CartItemQuantity.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { defineProps } from 'vue'
import getImgOfColor from '@/helpers/getImgColor'

defineProps({
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

    <!-- <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар">
        <IconMinus />
      </button>

      <input type="text" :value="cartItem.quantity" name="count" />

      <button type="button" aria-label="Добавить один товар">
        <IconPlus />
      </button>
    </div> -->

    <CartItemQuantity :quantity="cartItem.quantity" />

    <b class="product__price"> {{ cartItem.price }} ₽ </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины">
      <IconClose />
    </button>
  </li>
</template>
