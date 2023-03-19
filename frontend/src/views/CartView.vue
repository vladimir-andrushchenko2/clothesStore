<script setup>
import CartItem from '@/components/CartItem.vue'
import { useCartStore } from '@/stores/cart'
import router from '@/router'

const store = useCartStore()

function handleOrderBtnClick() {
  router.push('/order')
}
</script>

<template>
  <main>
    <main class="content container">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="index.html"> Каталог </a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> Корзина </a>
          </li>
        </ul>

        <div class="content__row">
          <h1 class="content__title">Корзина</h1>
          <span class="content__info"> {{ store.sizeOfCart }} товара </span>
        </div>
      </div>

      <section class="cart">
        <form class="cart__form form" @submit.prevent="">
          <div class="cart__field">
            <ul class="cart__list">
              <CartItem
                v-for="cartItem in store.items"
                :key="cartItem.basketItemId"
                :cart-item="cartItem"
              />
            </ul>
          </div>

          <div class="cart__block">
            <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
            <p class="cart__price">
              Итого: <span>{{ store.totalPrice }} ₽</span>
            </p>

            <button
              class="cart__button button button--primery"
              type="submit"
              :disabled="store.sizeOfCart === 0"
              @click="handleOrderBtnClick"
            >
              Оформить заказ
            </button>
          </div>
        </form>
      </section>
    </main>
  </main>
</template>
