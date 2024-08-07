<script setup lang="ts">
import { ApiImageResource, useApiImageRoute } from '../../../integrations';
import { useApiContext } from '../../API/Context/setup-context';

const { resumoVinculos, usuario } = useApiContext();

const profilePicureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  usuario
);

type Props = {
  canChangeProfile: boolean;
};

defineProps<Props>();
</script>

<template>
  <div
    class="flex items-center gap-3 rounded-lg inset-y-0 w-29 bg-[#EBF8EF] pl-3 pr-6 py-2"
    :class="{ 'cursor-pointer': canChangeProfile }"
  >
    <VImg
      :width="48"
      :height="48"
      :src="profilePicureUrl ?? ''"
      class="rounded-full bg-green-700"
    />

    <div>
      <p class="font-semibold">{{ usuario.nome }}</p>

      <p class="font-normal flex flex-row items-center gap-2">
        <span>
          {{ resumoVinculos.cargos.join(', ') }}
        </span>

        <slot name="arrowIcon"></slot>
      </p>
    </div>
  </div>
</template>
