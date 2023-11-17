<script setup>
import { computed, reactive, nextTick } from 'vue'
import { useCurrenciesStore } from '../stores/currencies'
import { useTransactionStore } from '../stores/transactions'

import Form from '../components/Form.vue'
import Select from '../components/Select.vue'
import TextInput from '../components/TextInput.vue'

const currenciesStore = useCurrenciesStore()
const transactionStore = useTransactionStore()

const form = reactive({
  from: {
    input: '',
    currency: 'USD'
  },
  to: {
    input: '',
    currency: 'UAH'
  }
})

const fromSelectList = computed(() => {
  return Object.keys(currenciesStore.currencies)
    .filter((currency) => {
      return currency !== form.to.currency
    })
    .map((currency) => {
      return {
        txt: `(${currency}) ${currenciesStore.currencies[currency].name}`,
        value: currency
      }
    })
})
const toSelectList = computed(() => {
  return Object.keys(currenciesStore.currencies)
    .filter((currency) => {
      return currency !== form.from.currency
    })
    .map((currency) => {
      return {
        txt: `(${currency}) ${currenciesStore.currencies[currency].name}`,
        value: currency
      }
    })
})
const selectedPair = computed(() => {
  return `${form.from.currency}${currenciesStore.pairSeparator}${form.to.currency}`
})
const rate = computed(() => {
  return currenciesStore.currenciesPair[selectedPair.value].rate
})
const isLimitError = computed(() => {
  return form.from.input * rate.value > currenciesStore.currencies[form.to.currency].reserve
})

const updateTo = () => {
  nextTick(() => {
    const newTo = form.from.input * rate.value

    if (isLimitError.value) {
      alert('Недостатній резерв')
    } else {
      form.to.input = newTo || ''
    }
  })
}
const updateFrom = () => {
  nextTick(() => {
    const newFrom = (form.to.input * 1) / rate.value

    if (newFrom > currenciesStore.currencies[form.to.currency].reserve) {
      alert('Недостатній резерв')
    } else {
      form.from.input = newFrom || ''
    }
  })
}
const onSwap = () => {
  const currentCurrencyFrom = form.from.currency

  form.from.currency = form.to.currency
  form.to.currency = currentCurrencyFrom
}
const onSubmit = (evt) => {
  transactionStore.addToList({
    from: {
      amount: +form.from.input,
      currency: form.from.currency
    },
    to: {
      amount: +form.to.input,
      currency: form.to.currency
    },
    rate: +rate.value,
    timestamp: new Date().getTime()
  })

  currenciesStore.currencies[form.to.currency].reserve -= form.to.input

  form.from.input = ''
  form.to.input = ''
}
</script>

<template>
  <div class="currency-convector">
    <Form @submit.prevent="onSubmit" :is-btn-disabled="isLimitError || !form.from.input">
      <div class="form__group">
        <span class="form__group__title">Віддаю</span>
        <div class="form__group__items">
          <Select
            @update:modelValue="updateTo"
            v-model="form.from.currency"
            :options="fromSelectList"
          />
          <TextInput @update:modelValue="updateTo" type="number" v-model="form.from.input" />
        </div>
      </div>

      <button @click="onSwap" type="button" class="currency-convector__swap">↑↓</button>

      <div class="form__group">
        <span class="form__group__title">Отримую</span>
        <div class="form__group__items">
          <Select
            @update:modelValue="updateTo"
            v-model="form.to.currency"
            :options="toSelectList"
          />
          <TextInput @update:modelValue="updateFrom" type="number" v-model="form.to.input">
            <template #limit>
              Резерв:
              {{ currenciesStore.currencies[form.to.currency].reserve }}
              {{ form.to.currency }}
            </template>

            <template v-if="isLimitError" #error> Недостатній резерв </template>
          </TextInput>
        </div>
      </div>

      <template #footer>
        Курс обміну:
        {{ rate }}
      </template>

      <template #submit>Обміняти</template>
    </Form>
  </div>
</template>

<style scoped lang="scss">
.currency-convector {
  &__swap {
    $offset: 1em;

    color: white;
    margin: -$offset;
    border: none;
    padding: $offset;
    background: transparent;
    align-self: flex-end;
    border-radius: 50%;
  }
}
</style>
