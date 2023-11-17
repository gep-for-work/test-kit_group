import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

import currencies from '../const/currency'
import randomInt from '../utils/randomInt'

export const useCurrenciesStore = defineStore('currencies', () => {
  const pairSeparator = '-'
  let initialCurrenciesPair = {}

  for (const keyOut in currencies) {
    for (const keyInner in currencies) {
      if (keyOut !== keyInner) {
        const rate = randomInt(1, 10)

        initialCurrenciesPair[`${keyOut}${pairSeparator}${keyInner}`] = {
          rate
        }
        initialCurrenciesPair[`${keyInner}${pairSeparator}${keyOut}`] = {
          rate: 1 / rate
        }
      }
    }
  }

  return {
    currencies: reactive(currencies),
    currenciesPair: reactive(initialCurrenciesPair),
    pairSeparator: ref(pairSeparator)
  }
})
