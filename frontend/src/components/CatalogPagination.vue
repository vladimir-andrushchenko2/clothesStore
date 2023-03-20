<script setup>
import IconArrowRight from './icons/IconArrowRight.vue'
import IconArrowLeft from './icons/IconArrowLeft.vue'

const props = defineProps({
  pagination: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['changePage'])

function handlePageClick(page) {
  emit('changePage', page)
}
</script>

<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': pagination.page === 1 }"
        @click.prevent="handlePageClick(pagination.page - 1)"
        aria-label="Предыдущая страница"
      >
        <IconArrowLeft />
      </a>
    </li>
    <li v-for="page in pagination.pages" :key="page" class="pagination__item">
      <a
        @click.prevent="handlePageClick(page)"
        href="#"
        class="pagination__link"
        :class="{ 'pagination__link--current': page === pagination.page }"
      >
        {{ page }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        @click.prevent="handlePageClick(pagination.page + 1)"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': pagination.page === pagination.pages }"
        href="#"
        aria-label="Следующая страница"
      >
        <IconArrowRight />
      </a>
    </li>
  </ul>
</template>

<!-- "pagination": {
  "page": 2,
  "pages": 2,
  "total": 14
} -->
