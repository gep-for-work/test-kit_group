<script setup>
defineProps({
  isBtnDisabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <form class="form">
    <header v-if="$slots.header" class="form__header">
      <slot name="header" />
    </header>

    <div class="form__body" v-if="$slots.default">
      <slot />
    </div>

    <footer class="form__footer">
      <slot name="footer" />

      <button v-if="$slots.reset" class="form__btn form__btn--reset" type="reset">
        <slot name="submit">Reset</slot>
      </button>

      <button class="form__btn form__btn--submit" type="submit" :disabled="isBtnDisabled">
        <slot v-if="$slots.submit" name="submit" />
        <template v-else> Submit </template>
      </button>
    </footer>
  </form>
</template>

<style lang="scss">
.form {
  border: 1px solid gray;
  padding: 0.5em;
  border-radius: 0.25em;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__group {
    margin-bottom: 0.5em;

    &__title {
      font-size: 0.75em;
    }

    &__items {
      display: flex;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__btn {
    padding: 0.25em 0.5em;
    font-size: 1.25em;
    margin-left: 0.5em;
    text-transform: uppercase;
  }
}
</style>
