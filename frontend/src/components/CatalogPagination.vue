<script setup>
import IconArrowRight from './icons/IconArrowRight.vue'
import IconArrowLeft from './icons/IconArrowLeft.vue'
import { ref } from 'vue'

const props = defineProps({
  pagination: {
    type: Object,
    required: true
  }
})

const currentPage = ref(props.pagination.page)

const emit = defineEmits(['changePage'])
</script>

<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow pagination__link--disabled"
        aria-label="Предыдущая страница"
      >
        <IconArrowLeft />
      </a>
    </li>
    <li v-for="page in pagination.pages" :key="page" class="pagination__item">
      <a class="pagination__link" :class="{ 'pagination__link--current': page === currentPage }">
        {{ page }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница">
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
