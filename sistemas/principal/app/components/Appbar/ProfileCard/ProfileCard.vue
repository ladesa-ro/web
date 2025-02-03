<script setup lang="ts">
import { ApiImageResource, useApiImageRoute } from '../../../integrations';
import { useApiContext } from '../../API/Context/setup-context';

const { resumoVinculos, usuario } = useApiContext();

const profilePicureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  usuario
);

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
    class="flex items-center gap-3 w-max rounded-lg inset-y-0 bg-ldsa-green-1/[.125] dark:bg-ldsa-grey/30 pl-3 pr-6 py-2"
    :class="{ 'cursor-pointer': canChangeProfile }"
  >
    <UIImg
      :src="profilePicureUrl"
      alt="Foto de perfil."
      fallbackBgColor="var(--ladesa-green-1-color)"
      class="w-12 h-12 rounded-full"
    >
      <template #fallbackIcon>
        <IconsIconUser class="text-ldsa-white w-5 mb-px" />
      </template>
    </UIImg>

    <div>
      <p class="font-semibold text-left">{{ usuario?.nome }}</p>

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

        <slot name="arrowIcon" />
      </p>
    </div>
  </div>
</template>
