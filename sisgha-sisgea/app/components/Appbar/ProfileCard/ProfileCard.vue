<script lang="ts" setup>
import { ApiImageResource, useApiImageRoute } from '~/utils';
import { useApiContext } from '../../API/Context/setup-context';

type Props = { canChangeProfile: boolean };
defineProps<Props>();

const { usuario } = useApiContext();

const profilePicureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  usuario
);

//

const cargos = useCampusContextCargos();

const selectedCargo = ref<string | null>(null);

const handleCargoClick = (cargo: string) => {
  selectedCargo.value = cargo;
};
</script>

<template>
  <div
    v-if="usuario && cargos"
    class="flex items-center gap-3 w-max max-w-48 min-[600px]:max-w-62 max-sm:h-12 rounded-lg inset-y-0 bg-ldsa-green-1/[.125] dark:bg-ldsa-grey/30 px-3 sm:pr-4 py-2"
  >
    <UIImg
      :src="profilePicureUrl"
      alt="Foto de perfil."
      class="max-[345px]:hidden min-w-9 max-w-9 h-9 sm:min-w-12 sm:max-w-12 sm:h-12 rounded-full"
      fallbackBgColor="var(--ladesa-green-1-color)"
    >
      <template #fallbackIcon>
        <IconsUser class="text-ldsa-white w-5 mb-px" />
      </template>
    </UIImg>

    <!-- if is mobile -->
    <p class="inline sm:hidden font-semibold text-left truncate text-sm">
      {{ usuario?.nome?.split(' ')[0] }}
    </p>
    <span class="inline sm:hidden">
      <slot name="arrowIcon" />
    </span>

    <!-- if is not mobile -->
    <div class="max-sm:hidden overflow-hidden">
      <p class="font-semibold text-left truncate">
        {{ usuario.nome?.split(' ')[0] }}
      </p>

      <p class="font-normal flex flex-row items-center gap-2">
        <span v-for="(cargo, index) in cargos" :key="cargo">
          <span @click="handleCargoClick(cargo)">
            {{
              cargo === 'professor'
                ? 'Professor'
                : cargo === 'dape'
                  ? 'DAPE'
                  : ''
            }}
          </span>
          <span v-if="index !== cargos.length - 1">, </span>
        </span>

        <slot name="arrowIcon" />
      </p>
    </div>
  </div>
</template>
