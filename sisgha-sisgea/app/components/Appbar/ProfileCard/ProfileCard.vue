<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { useMonitorSize } from '~/composables/useMonitorSize';
import { ApiImageResource, useApiImageRoute } from '~/utils';
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

//

type Props = { canChangeProfile: boolean };
defineProps<Props>();

//

const isMobile = useMonitorSize();
const isScreenSmallerThan345px = useMediaQuery('(max-width: 345px)');
</script>

<template>
  <div
    v-if="usuario && resumoVinculos"
    :class="{ 'cursor-pointer': canChangeProfile }"
    class="flex items-center gap-3 w-max max-w-48 sm:max-w-50 min-h-16 rounded-lg inset-y-0 bg-ldsa-green-1/[.125] dark:bg-ldsa-grey/30 pl-3 max-[600px]:pr-4 min-[600px]:pr-6 py-2"
  >
    <UIImg
      v-if="!isScreenSmallerThan345px"
      :src="profilePicureUrl"
      alt="Foto de perfil."
      class="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
      fallbackBgColor="var(--ladesa-green-1-color)"
    >
      <template #fallbackIcon>
        <IconsIconUser class="text-ldsa-white w-5 mb-px" />
      </template>
    </UIImg>

    <p v-if="isMobile" class="font-semibold text-left truncate text-sm">
      {{ usuario?.nome?.split(' ')[0] }}
    </p>
    <slot v-if="isMobile" name="arrowIcon" />

    <div v-else>
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
