<script setup>
import { RouterLink } from 'vue-router'
import IconCart from '@/components/icons/IconCart.vue'
import { useCartStore } from '@/stores/cart'

const store = useCartStore()
</script>

<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <RouterLink class="header__logo" to="/">
        <img
          src="@/assets/logo-moire.svg"
          alt="Логотип интернет магазина Moire"
          width="116"
          height="34"
        />
      </RouterLink>

      <a class="header__tel" href="tel:8 800 600 90 09"> 8 800 600 90 09 </a>

      <RouterLink class="header__cart" to="/cart" aria-label="Корзина с товарами">
        <IconCart />
        <span class="header__count" aria-label="Количество товаров">{{ store.getSizeOfCart }}</span>
      </RouterLink>
    </div>
  </header>
</template>
