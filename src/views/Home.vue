<script setup>
import { ref, computed } from 'vue'
import { useTransactionStore } from '../stores/transactions'

import Table from '../components/Table.vue'
import CurrencyConverter from '../components/CurrencyConverter.vue'
import formatTransaction from '../utils/formatTransaction'

const store = useTransactionStore()

const showedTablePageNumber = ref(1)

const transactionList = computed(() => {
  return store.list.map((transaction) => {
    return formatTransaction(transaction)
  })

  function _format(value) {
    return value < 10 ? `0${value}` : value
  }
})
const isNotEmptyTransactionList = computed(() => {
  return !!(store.list && store.list.length)
})
</script>

<template>
  <div class="page home">
    <div class="home__wrapper">
      <CurrencyConverter />

      <Table
        v-if="isNotEmptyTransactionList"
        v-model="showedTablePageNumber"
        :items="transactionList"
      />
    </div>

    <router-link v-if="isNotEmptyTransactionList" to="/statistic">Go to statistic</router-link>
  </div>
</template>

<style scoped lang="scss">
.home {
  flex-direction: column;

  &__wrapper {
    gap: 2%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  a {
    color: white;
    margin-top: 1em;
  }
}

@media (min-width: 1024px) {
  .home {
    &__wrapper {
      flex-direction: row;
    }
  }
}
</style>
