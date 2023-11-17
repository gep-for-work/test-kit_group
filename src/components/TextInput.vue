<script setup>
defineProps({
  type: {
    type: String,
    default: 'text',
    validator(prop) {
      return ['text', 'number', 'password', 'email', 'search', 'url'].includes(prop)
    }
  },
  modelValue: {
    default: ''
  },
  placeholder: {
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

const onInput = (evt) => {
  emit('update:modelValue', evt.target.value)
}
</script>

<template>
  <label class="form__item text-input">
    <span v-if="$slots.label" class="text-input__label">
      <slot name="label" />
    </span>

    <input
      v-if="type === 'number'"
      step="any"
      class="text-input__input"
      :value="modelValue"
      @input.lazy="onInput"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readOnly="readOnly"
    />
    <input
      v-else
      class="text-input__input"
      :value="modelValue"
      @input.lazy="onInput"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readOnly="readOnly"
    />

    <span v-if="$slots.limit" class="text-input__limit">
      <slot name="limit" />
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
.text-input {
  color: black;
  position: relative;
  margin-bottom: 0.25em;

  &__label {
    font-weight: 700;
    margin-bottom: 0.25em;
  }

  &__input {
    border: 2px solid gray;
    cursor: pointer;
    padding: 0.75em 1em;
    font-size: 1em;

    &:focus-visible {
      cursor: text;
      outline: none;
    }
  }

  &__limit {
    top: 0.125em;
    right: 0.375em;
    position: absolute;
    font-size: 0.625em;
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
