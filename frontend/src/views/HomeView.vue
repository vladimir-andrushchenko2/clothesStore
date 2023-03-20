<script setup>
import CatalogItem from '@/components/CatalogItem.vue'
import CatalogFilter from '@/components/CatalogFilter.vue'
import CatalogPagination from '@/components/CatalogPagination.vue'
import { ref } from 'vue'
import api from '@/utils/api'

const items = ref(null)

api.getProducts().then((data) => {
  items.value = data
})

function handleFilter(filterObj) {
  api.getProducts({ filterObj }).then((data) => {
    items.value = data
  })
}
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> 152 товара </span>
      </div>
    </div>

    <div class="content__catalog">
      <CatalogFilter @filter="handleFilter" />

      <section class="catalog">
        <p v-if="!items">Items are loading...</p>
        <ul class="catalog__list">
          <CatalogItem v-for="item in items" :key="item.id" :item="item" />
        </ul>

        <CatalogPagination />
      </section>
    </div>
  </main>
</template>
