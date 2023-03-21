<script setup>
import CatalogItem from '@/components/CatalogItem.vue'
import CatalogFilter from '@/components/CatalogFilter.vue'
import CatalogPagination from '@/components/CatalogPagination.vue'
import { ref } from 'vue'
import api from '@/utils/api'

const items = ref(null)
const pagination = ref(null)
const filter = ref(null)

api.getProducts().then(({ items: data, pagination: paginationData }) => {
  items.value = data
  pagination.value = paginationData
})

function handleFilter(filterObj) {
  api.getProducts({ filterObj }).then(({ items: data, pagination: paginationData }) => {
    items.value = data
    pagination.value = paginationData
    filter.value = filterObj
  })
}

function handleChangePage(page) {
  api
    .getProducts({ filterObj: filter.value, page })
    .then(({ items: data, pagination: paginationData }) => {
      items.value = data
      pagination.value = paginationData
    })
}
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span v-if="pagination" class="content__info"> {{ pagination.total }} товаров </span>
      </div>
    </div>

    <div class="content__catalog">
      <CatalogFilter @filter="handleFilter" />

      <section class="catalog">
        <p v-if="!items">Items are loading...</p>
        <ul class="catalog__list">
          <CatalogItem v-for="item in items" :key="item.id" :item="item" />
        </ul>

        <CatalogPagination
          v-if="pagination"
          :pagination="pagination"
          @change-page="handleChangePage"
        />
      </section>
    </div>
  </main>
</template>
