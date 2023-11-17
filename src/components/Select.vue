<script setup>
import { computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
    validator(prop) {
      return prop.every((option) => {
        return option.txt !== undefined && option.value !== undefined
      })
    }
  },
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <label class="form__item select">
    <span v-if="$slots.label" class="text-input__label">
      <slot name="label" />
    </span>

    <span class="select__wrap">
      <select class="select__input" v-model="value" :disabled="disabled" :readOnly="readOnly">
        <option v-for="(option, idx) in options" :value="option.value" :key="idx">
          {{ option.txt && option.txt }}
        </option>
      </select>
    </span>

    <transition>
      <span v-if="$slots.tip" class="text-input__tip">
        <slot name="tip" />
      </span>
    </transition>

    <transition>
      <span v-if="$slots.error" class="text-input__error">
        <slot name="error" />
      </span>
    </transition>
  </label>
</template>

<style lang="scss">
.select {
  $bg-color: white;
  $circle-size: 1em;
  $horizontal-offset: 1em;

  width: 100%;
  display: flex;
  position: relative;
  background: $bg-color;
  align-items: center;
  margin-bottom: 0.5em;
  justify-content: center;

  &__label {
    font-weight: 700;
    margin-bottom: 0.25em;
  }

  &__wrap {
    width: 100%;
    border: 2px solid gray;
    display: flex;
    background: $bg-color;
    align-items: center;
    justify-content: center;

    // Circle
    &:before {
      width: $circle-size;
      height: $circle-size;

      margin: 0 calc(#{$horizontal-offset} / 2);
      border: 2px solid black;
      display: inline-block;
      content: '';
      border-radius: 50%;
    }
  }

  &__input {
    width: calc(100% - #{$circle-size + $horizontal-offset});
    border: none;
    cursor: pointer;
    padding: 0.75em $horizontal-offset 0.75em 0;
    font-size: 1em;
    background: $bg-color;

    &:focus-visible {
      outline: none;
    }
  }

  &__tip {
    font-size: 0.5em;
    margin-top: 0.125em;
  }

  &__error {
    color: red;
    right: 0;
    bottom: -1em;
    position: absolute;
    font-size: 0.5em;
  }

  // Hide arrow
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'],
  input[type='number']:hover,
  input[type='number']:focus {
    appearance: none;
    -moz-appearance: textfield;
  }
}
</style>
