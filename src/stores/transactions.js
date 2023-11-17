import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transactions', () => {
  const storageKey = 'transactionList'
  let initialList = []

  try {
    // User can deny access to 'localStorage'
    const prevList = localStorage.getItem(storageKey)

    if (prevList) {
      initialList = JSON.parse(prevList)
    }
  } catch (e) {
    console.error('Deny access to "localStorage"')
  }

  let list = reactive(initialList)

  function setList(newList) {
    list = newList
  }
  function addToList(newTransaction) {
    const _newTransaction = {
      id: list.length + 1,
      ...newTransaction
    }

    list.push(_newTransaction)

    try {
      // User can deny access to 'localStorage'
      localStorage.setItem(storageKey, JSON.stringify(list))
    } catch (e) {}
  }

  return { list, setList, addToList }
})
