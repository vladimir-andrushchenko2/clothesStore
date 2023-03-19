<script setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import IconMinus from '@/components/icons/IconMinus.vue'
import ColorPalette from '@/components/ColorPalette.vue'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import useFetchItemViewData from '@/composables/useFetchItemViewData'
import { useCartStore } from '@/stores/cart'
import api from '@/utils/api'
import useItemCounter from '@/composables/useItemCounter'
import useItemSize from '@/composables/useItemSize'

const store = useCartStore()

const { item, currentColorId, computedCurrentImg } = useFetchItemViewData()

const { itemCounter, decrementItemCounter, incrementItemCounter } = useItemCounter()

const { sizeOfItem, setSizeOfItem } = useItemSize()

const computedPrice = computed(() => item.value.price * itemCounter.value)

const isInvalidFormState = computed(() => !sizeOfItem.value)

function handleColorChange(colorId) {
  currentColorId.value = colorId
}

function handleSizeChange(event) {
  setSizeOfItem(event.target.value)
}

function handleOrderSubmit() {
  api
    .postCartItem({
      productId: item.value.id,
      colorId: currentColorId.value,
      sizeId: sizeOfItem.value,
      quantity: itemCounter.value
    })
    .then((items) => {
      store.setItems(items)
    })
}
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
          <img v-if="item" width="570" height="570" :src="computedCurrentImg" :alt="item.title" />
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
                <button @click="decrementItemCounter" type="button" aria-label="Убрать один товар">
                  <IconMinus />
                </button>

                <input type="text" :value="itemCounter" name="count" />

                <button
                  @click="incrementItemCounter"
                  type="button"
                  aria-label="Добавить один товар"
                >
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
                  <select @change="handleSizeChange" class="form__select" name="category">
                    <option value="none">Выберите размер</option>
                    <option v-for="size in item.sizes" :key="size.id" :value="size.id">
                      {{ size.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button
              class="item__button button button--primery"
              type="submit"
              :disabled="isInvalidFormState"
            >
              В корзину
            </button>
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
