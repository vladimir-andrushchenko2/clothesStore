<script setup>
import IconArrowRight from './icons/IconArrowRight.vue'
import IconArrowLeft from './icons/IconArrowLeft.vue'
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
    <li class="pagination__item">
      <a class="pagination__link pagination__link--current"> 1 </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#"> 2 </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#"> 3 </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#"> 4 </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#"> ... </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#"> 10 </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница">
        <IconArrowRight />
      </a>
    </li>
  </ul>
</template>
