<script setup>
// import { RouterLink } from 'vue-router'

import IconInsta from './icons/IconInsta.vue'
import IconVk from './icons/IconVk.vue'
import IconFb from './icons/IconFb.vue'
import IconTw from './icons/IconTw.vue'
import IconTg from './icons/IconTg.vue'
</script>

<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <ul class="footer__links">
        <li>
          <a class="footer__link" href="#"> Каталог </a>
        </li>
        <li>
          <a class="footer__link" href="tel:88006009009"> 8 800 600 90 09 </a>
        </li>
        <li>
          <a class="footer__link" href="mailto:hi@technozavrrr.com"> hi@technozavrrr.com </a>
        </li>
        <li>
          <a class="footer__link" href="#"> Распродажа </a>
        </li>
        <li>
          <a class="footer__link footer__link--medium" href="#"> Заказать звонок </a>
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Вконтакте">
            <IconVk />
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Инстаграм">
            <IconInsta />
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Facebook">
            <IconFb />
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Twitter">
            <IconTw />
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Telegram">
            <IconTg />
          </a>
        </li>
      </ul>

      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются в&nbsp;соответствии
        с&nbsp;законодательством&nbsp;РФ, в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных
        правах.
      </p>

      <ul class="footer__data">
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright"> © 2020 Moire </span>
    </div>
  </footer>
</template>
