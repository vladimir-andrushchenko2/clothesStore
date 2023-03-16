<script setup lang="ts">
import CatalogItem from '@/components/CatalogItem.vue'
import CatalogFilter from '@/components/CatalogFilter.vue'
import CatalogPagination from '@/components/CatalogPagination.vue'
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
      <CatalogFilter />

      <section class="catalog">
        <ul class="catalog__list">
          <CatalogItem />
        </ul>

        <CatalogPagination />
      </section>
    </div>
  </main>
</template>
