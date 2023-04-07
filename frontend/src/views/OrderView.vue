<script setup>
import { useCartStore } from '@/stores/cart'
import { reactive, ref, computed, watch } from 'vue'
import api from '@/utils/api'
import router from '@/router'
import OrderInfo from '@/components/OrderInfo.vue'

const store = useCartStore()

const form = reactive({
  name: '',
  address: '',
  phone: '',
  email: '',
  deliveryTypeId: null,
  paymentTypeId: null,
  comment: ''
})

const error = reactive({
  name: '',
  address: '',
  phone: '',
  email: '',
  deliveryTypeId: '',
  paymentTypeId: ''
})

const deliveryOptions = ref([])
const paymentOptions = ref([])

api.getDeliveryOptions().then((options) => {
  deliveryOptions.value = options
  form.deliveryTypeId = deliveryOptions.value.at(0).id
})

const deliveryPrice = computed(() => {
  return Number(deliveryOptions.value.find((option) => option.id === form.deliveryTypeId)?.price)
})

watch(
  () => form.deliveryTypeId,
  () => {
    api.getPaymentOptions(form.deliveryTypeId).then((options) => {
      paymentOptions.value = options
      form.paymentTypeId = paymentOptions.value.at(0).id
    })
  }
)

const isSubmitButtonDisabled = ref(false)
const formHasError = computed(() => {
  return Object.values(error).find((value) => value !== '')
})

function handleOrderSubmit() {
  isSubmitButtonDisabled.value = true

  api
    .postOrder(form)
    .then((res) => {
      router.push(`/confirmation/${res.id}`)
      store.clearCart()
    })
    .catch((res) => {
      const { request } = res.error
      Object.entries(request).forEach(([key, value]) => {
        error[key] = value
      })
    })
    .finally(() => {
      isSubmitButtonDisabled.value = false
    })
}
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" to="/"> Catalog </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" to="/cart"> Cart </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Make an order </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Order</h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent="handleOrderSubmit">
        <div class="cart__field">
          <div class="cart__data">
            <label class="form__label">
              <input
                class="form__input"
                type="text"
                name="name"
                placeholder="Your name"
                v-model.trim.lazy="form.name"
                @input="error.name = ''"
              />
              <span class="form__value">Name</span>
              <span class="form__error">{{ error.name }}</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                type="text"
                name="address"
                placeholder="Your address"
                v-model.trim.lazy="form.address"
                @input="error.address = ''"
              />
              <span class="form__value">Address</span>
              <span class="form__error">{{ error.address }}</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                type="tel"
                name="phone"
                placeholder="Your number"
                v-model.trim.lazy="form.phone"
                @input="error.phone = ''"
              />
              <span class="form__value">Telephone</span>
              <span class="form__error">{{ error.phone }}</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                type="email"
                name="email"
                placeholder="Email"
                v-model.trim.lazy="form.email"
                @input="error.email = ''"
              />
              <span class="form__value">Email</span>
              <span class="form__error">{{ error.email }}</span>
            </label>

            <label class="form__label">
              <textarea
                class="form__input form__input--area"
                name="comments"
                placeholder="Comment"
                v-model.trim.lazy="form.comment"
              ></textarea>
              <span class="form__value">Your comment</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Delivery</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="delivery in deliveryOptions" :key="delivery.id">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    :value="delivery.id"
                    v-model.number="form.deliveryTypeId"
                  />
                  <span class="options__value">
                    {{ delivery.title }} <b>{{ delivery.price }}</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Payment type</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="payment in paymentOptions" :key="payment.id">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    :value="payment.id"
                    v-model.number="form.paymentTypeId"
                  />
                  <span class="options__value"> {{ payment.title }} </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <OrderInfo
            :items="store.items"
            :size-of-cart="store.sizeOfCart"
            :total-price="store.totalPrice"
            :delivery-price="deliveryPrice"
          />

          <input
            class="cart__button button button--primery"
            type="submit"
            value="Make an Order"
            :disabled="isSubmitButtonDisabled || formHasError || store.sizeOfCart === 0"
          />
        </div>
        <div v-if="formHasError" class="cart__error form__error-block">
          <h4>Error!</h4>
          <p>{{ error.deliveryTypeId }}</p>
          <p>{{ error.paymentTypeId }}</p>
        </div>
      </form>
    </section>
  </main>
</template>
