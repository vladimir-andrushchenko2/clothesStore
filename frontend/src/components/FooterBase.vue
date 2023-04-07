<script setup>
// import { RouterLink } from 'vue-router'

import IconInsta from './icons/IconInsta.vue'
import IconFb from './icons/IconFb.vue'
import IconTw from './icons/IconTw.vue'
import IconTg from './icons/IconTg.vue'
</script>

<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <ul class="footer__links">
        <li>
          <a class="footer__link" href="#"> Catalog </a>
        </li>
        <li>
          <a class="footer__link" href="tel:88006009009"> 8 800 600 90 09 </a>
        </li>
        <li>
          <a class="footer__link" href="mailto:hi@technozavrrr.com"> hi@technozavrrr.com </a>
        </li>
        <li>
          <a class="footer__link" href="#"> Discounts </a>
        </li>
        <li>
          <a class="footer__link footer__link--medium" href="#"> Book a call </a>
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Instagram">
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis iste exercitationem quod
        non cumque perferendis fugiat facilis, dolorum quisquam odio, quibusdam obcaecati, quo a
        modi debitis. Laudantium officiis culpa error.
      </p>

      <ul class="footer__data">
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Confidentiality
          </a>
        </li>
      </ul>

      <span class="footer__copyright"> © 2023 Volodymyr</span>
    </div>
  </footer>
</template>
