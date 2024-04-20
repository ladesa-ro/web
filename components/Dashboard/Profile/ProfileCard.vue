<template>
  <div class="border-card">
    <h4 class="asdfg pt-[20px] px-[20px]">
      <slot name="icone"></slot>

      <span>
        <slot name="titulo"></slot>
      </span>
    </h4>

    <div class="mt-6"></div>

    <slot></slot>
  </div>
</template>

<style scoped>
.asdfg {
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 10px;
}

.asdfg span {
  font-weight: 600;
}
</style>
