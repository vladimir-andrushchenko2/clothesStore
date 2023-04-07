<script setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import IconMinus from '@/components/icons/IconMinus.vue'
import useItemCounter from '@/composables/useItemCounter'
import { ref, defineProps, watch } from 'vue'
import api from '@/utils/api'
import { useCartStore } from '@/stores/cart'

const store = useCartStore()

const props = defineProps({
  quantity: {
    type: Number,
    required: true
  },
  basketItemId: {
    type: Number,
    required: true
  }
})

const { itemCounter, decrementItemCounter, incrementItemCounter, setItemCounter, isMinItemAmount } =
  useItemCounter()

setItemCounter(props.quantity)

const quantityChangeIsLoading = ref(false)

watch(itemCounter, () => {
  quantityChangeIsLoading.value = true

  api
    .putCartItemQuantity({
      basketItemId: props.basketItemId,
      quantity: itemCounter.value
    })
    .then((items) => {
      quantityChangeIsLoading.value = false
      store.setItems(items)
    })
})

function handleQuantityChange(event) {
  if (event.target.value === '' || event.target.value === '0') {
    itemCounter.value = 1
    return
  }

  itemCounter.value = Number(event.target.value)
}
</script>

<template>
  <div class="product__counter form__counter">
    <button
      @click="decrementItemCounter"
      type="button"
      aria-label="remove one item"
      :disabled="quantityChangeIsLoading || isMinItemAmount"
    >
      <IconMinus />
    </button>

    <input
      :disabled="quantityChangeIsLoading"
      :value="itemCounter"
      @change="handleQuantityChange"
      type="text"
      name="count"
    />

    <button
      @click="incrementItemCounter"
      type="button"
      aria-label="add one item"
      :disabled="quantityChangeIsLoading"
    >
      <IconPlus />
    </button>
  </div>
</template>
