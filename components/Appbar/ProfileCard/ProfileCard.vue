<script setup lang="ts">
import { ref } from 'vue';
import { ApiImageResource, useApiImageRoute } from '../../../integrations';
import { useApiContext } from '../../API/Context/setup-context';

const { resumoVinculos, usuario } = useApiContext();

const profilePicureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  usuario
);

// Adicionando uma propriedade reativa para o cargo selecionado
const selectedCargo = ref<string | null>(null);

const handleCargoClick = (cargo: string) => {
  selectedCargo.value = cargo;
};

type Props = {
  canChangeProfile: boolean;
};

defineProps<Props>();
</script>

<template>
  <div
    v-if="usuario && resumoVinculos"
    class="flex items-center gap-3 rounded-lg inset-y-0 w-29 bg-ldsa-green-1/10 dark:bg-ldsa-grey/30 pl-3 pr-6 py-2"
    :class="{ 'cursor-pointer': canChangeProfile }"
  >
    <VImg
      :width="48"
      :height="48"
      :src="profilePicureUrl ?? ''"
      class="rounded-full bg-ldsa-green-1"
    />

    <div>
      <p class="font-semibold">{{ usuario?.nome }}</p>

      <p class="font-normal flex flex-row items-center gap-2">
        <span v-for="cargo in resumoVinculos?.cargos" :key="cargo">
          <span @click="handleCargoClick(cargo)">
            {{ cargo }}
          </span>
          <span
            v-if="
              cargo !== resumoVinculos.cargos[resumoVinculos.cargos.length - 1]
            "
            >,
          </span>
        </span>

        <slot name="arrowIcon"></slot>
      </p>
    </div>
  </div>
</template>
