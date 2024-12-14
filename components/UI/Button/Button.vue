<template>
  <button class="ui-button">
    <div class="start-icon" v-show="$slots['start-icon']">
      <slot name="start-icon"></slot>
    </div>

    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<style scoped>
.ui-button {
  display: flex;
  align-items: center;
  flex-direction: row;

  width: 100%;

  padding: 0.875rem 1.25rem;
  border-radius: 0.5625rem;

  background-color: rgb(var(--ladesa-button-background-color));
  color: rgb(var(--ladesa-button-text-color));

  font-size: 1rem;
  font-weight: 600;
}

.ui-button:disabled {
  background-color: rgba(var(--ladesa-primary-color), 0.5);
  cursor: not-allowed;
}

.ui-button:focus {
  outline: none;
}

.ui-button:focus,
.ui-button:focus-within {
  border-color: #39a048;
  box-shadow: 0px 0px 0.5px 5px #59c16958;
}

.content {
  flex: 1;
  text-align: center;
}
</style>
