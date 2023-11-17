<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  countItemsToView: {
    type: Number,
    default: 10
  },
  modelValue: {
    type: Number
  }
})

const showedPageNumber = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
const countPaginationPage = computed(() => {
  return Math.ceil(props.items.length / props.countItemsToView)
})
const showedItems = computed(() => {
  const start = (props.modelValue - 1) * props.countItemsToView

  return props.items.slice(start, start + props.countItemsToView)
})
const ItemsPerRow = computed(() => {
  return props.items.length ? Object.keys(props.items[0]).length : 0
})

const formatString = (str) => {
  let words = []

  if (str.includes('-')) {
    // kebab-case
    words = str.split('-')
  } else if (str.includes('_')) {
    // snake_case
    words = str.split('_')
  } else {
    // camelCase
    words = str.split(/(?=[A-Z])/)
  }

  // Capitalize the first letter
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)

  return words.join(' ')
}
</script>

<template v-if="items.length">
  <table class="table">
    <thead class="table__head">
      <tr>
        <th v-for="(value, key) in items[0]" :key="key">
          {{ formatString(key) }}
        </th>
      </tr>
    </thead>
    <tbody class="table__body">
      <transition-group v-for="(item, idx) in showedItems" :key="item.id || idx" tag="tr">
        <td v-for="(value, key) in item" :key="`${item.id || idx}_${key}`">
          {{ value }}
        </td>
      </transition-group>
    </tbody>
    <tfoot class="table__pagination" v-if="countPaginationPage > 1">
      <tr>
        <td :colspan="ItemsPerRow">
          <button
            class="table__pagination__item"
            @click="showedPageNumber--"
            :disabled="showedPageNumber === 1"
          >
            ←
          </button>
          <span class="table__pagination__page">
            {{ showedPageNumber }}
          </span>
          <button
            class="table__pagination__item"
            @click="showedPageNumber++"
            :disabled="showedPageNumber === countPaginationPage"
          >
            →
          </button>
        </td>
      </tr>
    </tfoot>

    <slot name="caption" />
  </table>
</template>

<style lang="scss">
.table {
  color: black;
  border: 1px solid gray;
  background: white;
  border-collapse: collapse;

  &__head {
    text-align: left;
    border-bottom: 4px solid black;

    th {
      font-weight: 700;
    }
  }

  &__pagination {
    text-align: center;
    vertical-align: center;

    &__page {
      margin: 0 0.5em;
      padding: 0 0.5em;
    }
  }

  td,
  th {
    border: 2px solid black;
    padding: 0.25em 0.5em;
  }

  tbody tr:nth-of-type(odd) {
    background: rgba(0, 0, 0, 0.15);
  }
}
</style>
