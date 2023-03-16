<script setup>
import IconPlus from '../components/icons/IconPlus.vue'
import IconMinus from '../components/icons/IconMinus.vue'
import ColorPalette from '@/components/ColorPalette.vue'
import { useRoute, RouterLink } from 'vue-router'
import { ref, reactive, computed } from 'vue'

import api from '@/utils/api'
import useComputedCurrentImgBasedOnColor from '@/composables/useColorToImageComputed'

const route = useRoute()

const item = ref(null)

let currentImg
// default color is first one in the array
let currentColorId

api.getProduct(route.params.id).then((product) => {
  item.value = product

  currentColorId = ref(item.value.colors[0].id)
  currentImg = useComputedCurrentImgBasedOnColor(item.value.colors, currentColorId)
})

const formState = reactive({
  amount: 1
})

function decrement() {
  if (formState.amount > 1) {
    formState.amount--
  }
}

function increment() {
  formState.amount++
}

const computedPrice = computed(() => item.value.price * formState.amount)

function handleColorChange(colorId) {
  currentColorId.value = colorId
}

function handleOrderSubmit() {}
</script>

<template>
  <main v-if="item" class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" to="/"> Каталог </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" to="/"> {{ item.category.title }} </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ item.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="currentImg" :alt="item.title" />
        </div>
        <ul class="pics__list">
          <!-- <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img
                width="98"
                height="98"
                src="img/product-square-2.jpg"
                srcset="img/product-square-2@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li> -->
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ item.id }}</span>
        <h2 class="item__title">{{ item.title }}</h2>
        <div class="item__form">
          <form class="form" @submit.prevent="handleOrderSubmit">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button @click="decrement" type="button" aria-label="Убрать один товар">
                  <IconMinus />
                </button>

                <input type="text" :value="formState.amount" name="count" />

                <button @click="increment" type="button" aria-label="Добавить один товар">
                  <IconPlus />
                </button>
              </div>

              <b class="item__price"> {{ computedPrice }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ColorPalette
                  @color-chande="(colorId) => handleColorChange(colorId)"
                  :colors="item.colors"
                  :current-color-id="currentColorId"
                  :item-id="item.id"
                />
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" name="category">
                    <option value="value1">37-39</option>
                    <option value="value2">40-42</option>
                    <option value="value3">42-50</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">В корзину</button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Информация о товаре </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Доставка и возврат </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br />
            30% полиэстер<br />
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br />
            Гладить при макс. 110ºC<br />
            Не использовать машинную сушку<br />
            Отбеливать запрещено<br />
            Не подвергать химчистке<br />
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
