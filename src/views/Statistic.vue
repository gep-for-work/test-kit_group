<script setup>
import { computed, ref } from 'vue'
import { BarChart, PieChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { useCurrenciesStore } from '../stores/currencies'
import { useTransactionStore } from '../stores/transactions'
import Table from '../components/Table.vue'
import formatTransaction from '../utils/formatTransaction'

Chart.register(...registerables)

const currenciesStore = useCurrenciesStore()
const transactionStore = useTransactionStore()

const showedTablePageNumber = ref(1)

const transactionsData = computed(() => {
  const result = {
    from: {},
    to: {}
  }

  for (let currency in currenciesStore.currencies) {
    result.to[currency] = {
      totalAmount: 0,
      transactionCount: 0
    }
    result.from[currency] = {
      totalAmount: 0,
      transactionCount: 0
    }

    transactionStore.list.forEach((transaction) => {
      if (transaction.from.currency === currency) {
        result.from[currency].totalAmount += +transaction.from.amount
        result.from[currency].transactionCount++
      }
      if (transaction.to.currency === currency) {
        result.to[currency].totalAmount += +transaction.to.amount
        result.to[currency].transactionCount++
      }
    })
  }

  return result
})
const graphicSumData = computed(() => {
  const result = {
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'Buy',
          data: [],
          backgroundColor: 'green'
        },
        {
          label: 'Sell',
          data: [],
          backgroundColor: 'red'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Currency buy/sell total sum'
        }
      }
    }
  }

  for (let currency in currenciesStore.currencies) {
    result.chartData.labels.push(currency)

    result.chartData.datasets[0].data.push(transactionsData.value.from[currency].totalAmount)
    result.chartData.datasets[1].data.push(transactionsData.value.to[currency].totalAmount)
  }

  return result
})
const graphicPopularityData = computed(() => {
  const result = {
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'sell',
          data: [],
          backgroundColor: ['green', 'red']
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Most popular currency by number of transactions'
        }
      }
    }
  }

  let maxTransactionCountTo = -Infinity
  let maxTransactionCountFrom = -Infinity
  let transactionCurrencyTo = ''
  let transactionCurrencyFrom = ''
  for (let currency in currenciesStore.currencies) {
    if (transactionsData.value.from[currency].transactionCount > maxTransactionCountFrom) {
      maxTransactionCountFrom = transactionsData.value.from[currency].transactionCount
      transactionCurrencyFrom = currency
    }
    if (transactionsData.value.to[currency].transactionCount > maxTransactionCountTo) {
      maxTransactionCountTo = transactionsData.value.to[currency].transactionCount
      transactionCurrencyTo = currency
    }
  }

  result.chartData.labels.push(`Buy (${transactionCurrencyTo})`)
  result.chartData.labels.push(`Sell (${transactionCurrencyFrom})`)
  result.chartData.datasets[0].data.push(maxTransactionCountTo)
  result.chartData.datasets[0].data.push(maxTransactionCountFrom)

  return result
})
const todayTransactionsList = computed(() => {
  return transactionStore.list
    .filter((transaction) => {
      return isToday(transaction.timestamp)
    })
    .map((transaction) => {
      return formatTransaction(transaction)
    })
})

function isToday(timestamp) {
  const date = new Date(timestamp)
  const today = new Date()

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}
</script>

<template>
  <div class="page statistic">
    <div class="statistic__graphics">
      <PieChart
        class="statistic__graphics__item"
        :chartData="graphicPopularityData.chartData"
        :options="graphicPopularityData.options"
      />

      <BarChart
        class="statistic__graphics__item"
        :chartData="graphicSumData.chartData"
        :options="graphicSumData.options"
      />
    </div>

    <Table
      v-if="todayTransactionsList && todayTransactionsList.length"
      v-model="showedTablePageNumber"
      :items="todayTransactionsList"
    >
      <template #caption>
        <caption>
          Today transactions
        </caption>
      </template>
    </Table>
  </div>
</template>

<style lang="scss">
.statistic {
  &__graphics {
    width: 100%;
    display: flex;
    margin-bottom: 1em;
    justify-content: space-evenly;
  }
}
</style>
