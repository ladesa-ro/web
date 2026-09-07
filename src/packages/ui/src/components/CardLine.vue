<script lang="ts" setup>
type Props = { title?: string };
defineProps<Props>();
</script>

<template>
  <div class="ui-card-line">
    <div class="ui-card-line__content">
      <h1 class="ui-card-line__title">
        <slot name="title">
          {{ title }}
        </slot>
      </h1>

      <slot />
    </div>

    <div class="ui-card-line__actions">
      <slot name="actions" />
    </div>
  </div>
</template>
