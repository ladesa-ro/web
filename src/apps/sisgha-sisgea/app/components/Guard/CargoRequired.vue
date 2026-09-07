<script lang="ts" setup>
import { useApiContext } from '~/composables/api-context/setup';

const props = defineProps<{ cargo: string }>();

const { resumoVinculos } = useApiContext();
const hasCargo = computed(() =>
  resumoVinculos.value.cargos.includes(props.cargo)
);
</script>

<template>
  <slot v-if="hasCargo" />

  <div v-else class="u-flex u-items-center u-justify-center guard-message">
    <div class="u-flex u-flex-col u-items-center u-gap-4 u-text-center guard-message__box">
      <IconsUser class="guard-message__icon" />

      <h2 class="u-text-lg u-font-semibold guard-message__title">
        Você não tem acesso a esta funcionalidade
      </h2>

      <p class="u-text-sm guard-message__description">
        Esta página é exclusiva para usuários com o vínculo necessário.
      </p>
    </div>
  </div>
</template>

<style scoped>
.guard-message {
  padding-block: 4rem;
  padding-inline: var(--ui-space-4);
}

.guard-message__box {
  max-width: 24rem;
}

.guard-message__icon {
  width: 3rem;
  height: 3rem;
  color: var(--ladesa-grey-color);
}

.guard-message__title {
  color: var(--ladesa-text-default-color);
}

.guard-message__description {
  color: var(--ladesa-grey-color);
  line-height: 1.625;
}
</style>
