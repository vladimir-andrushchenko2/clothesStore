<script setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import IconMinus from '@/components/icons/IconMinus.vue'
import useItemCounter from '@/composables/useItemCounter'
import { defineProps } from 'vue'

const props = defineProps({
  quantity: {
    type: Number,
    required: true
  }
})

const { itemCounter, decrementItemCounter, incrementItemCounter, setItemCounter } = useItemCounter()

setItemCounter(props.quantity)

function handleDecrement() {
  decrementItemCounter()
}

function handleIncrement() {
  incrementItemCounter()
}
</script>

<template>
  <div class="product__counter form__counter">
    <button @click="handleDecrement" type="button" aria-label="Убрать один товар">
      <IconMinus />
    </button>

    <input type="text" :value="itemCounter" name="count" />

    <button @click="handleIncrement" type="button" aria-label="Добавить один товар">
      <IconPlus />
    </button>
  </div>
</template>
