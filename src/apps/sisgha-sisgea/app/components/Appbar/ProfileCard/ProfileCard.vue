<script lang="ts" setup>
import { useApiContext } from '../../API/Context/setup-context';

type Props = { canChangeProfile: boolean };
defineProps<Props>();

const { usuario } = useApiContext();

const { data: profilePicureUrl } = useUsuarios().imageProfile(
  computed(() => usuario.value?.id ?? null)
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
    class="u-flex u-items-center u-gap-3 u-rounded-lg u-px-3 u-py-2 profile-card"
  >
    <UIImg
      :src="profilePicureUrl"
      alt="Foto de perfil."
      class="u-rounded-full profile-card-avatar"
      fallback-bg-color="var(--ladesa-green-1-color)"
    >
      <template #fallbackIcon>
        <IconsUser class="profile-card-avatar-fallback-icon" />
      </template>
    </UIImg>

    <!-- if is mobile -->
    <p
      class="u-font-semibold u-text-left u-truncate u-text-sm profile-card-mobile-only"
    >
      {{ usuario?.nome?.split(' ')[0] }}
    </p>
    <span class="profile-card-mobile-only">
      <slot name="arrowIcon" />
    </span>

    <!-- if is not mobile -->
    <div class="u-overflow-hidden profile-card-desktop-only">
      <p class="u-font-semibold u-text-left u-truncate">
        {{ usuario.nome?.split(' ')[0] }}
      </p>

      <p class="u-font-regular u-flex u-flex-row u-items-center u-gap-2">
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

<style scoped>
.profile-card {
  width: max-content;
  max-width: 12rem;
  top: 0;
  bottom: 0;
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 12.5%);
}

@media (min-width: 600px) {
  .profile-card {
    max-width: 15.5rem;
  }
}

@media (max-width: 639px) {
  .profile-card {
    height: 3rem;
  }
}

@media (min-width: 640px) {
  .profile-card {
    padding-right: 1rem;
  }
}

:global(.dark) .profile-card {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 30%);
}

.profile-card-avatar {
  min-width: 2.25rem;
  max-width: 2.25rem;
  height: 2.25rem;
}

@media (max-width: 21.5rem) {
  .profile-card-avatar {
    display: none;
  }
}

@media (min-width: 640px) {
  .profile-card-avatar {
    min-width: 3rem;
    max-width: 3rem;
    height: 3rem;
  }
}

.profile-card-avatar-fallback-icon {
  color: var(--ladesa-white-color);
  width: 1.25rem;
  margin-bottom: 1px;
}

.profile-card-mobile-only {
  display: inline;
}

@media (min-width: 640px) {
  .profile-card-mobile-only {
    display: none;
  }
}

.profile-card-desktop-only {
  display: block;
}

@media (max-width: 639px) {
  .profile-card-desktop-only {
    display: none;
  }
}
</style>
