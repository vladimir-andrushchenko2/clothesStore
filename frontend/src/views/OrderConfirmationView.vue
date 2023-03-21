<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/utils/api'
import OrderInfo from '@/components/OrderInfo.vue'
import getCartTotalPrice from '@/helpers/getCartTotalPrice'

const route = useRoute()

const order = ref(null)

api.getOrderConfirmation(route.params.id).then((orderData) => {
  order.value = orderData
})
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" to="/"> Каталог </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" to="/cart"> Корзина </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order?.orderId }}</span>
      </h1>
    </div>

    <section class="cart" v-if="order">
      <form class="cart__form form">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
            с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
            уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value"> {{ order.name }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value"> {{ order.address }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value"> {{ order.phone }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value"> {{ order.email }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value"> {{ order.paymentType }} </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <OrderInfo
            v-if="order"
            :items="order.items"
            :size-of-cart="order.quantity"
            :total-price="getCartTotalPrice(order.items)"
            :delivery-price="order.deliveryPrice"
          />
        </div>
      </form>
    </section>
  </main>
</template>
