<script lang="ts" setup>
import { IconsEducator, IconsUser } from '#components';
import { useCanEditProfile, useUserCargoAndCampi } from '#imports';
import { useQuery } from '@tanstack/vue-query';
import { computed, ref } from 'vue';
import { usuarioFindById } from '@ladesa-ro/web.api.client';
import type { UsuarioFindOneOutputDto } from '@ladesa-ro/web.api.client';
import CampusSelect from './Campus/CampusSelect.vue';

type Props = { user: UsuarioFindOneOutputDto };
const { user } = defineProps<Props>();

const { canEdit } = useCanEditProfile(user.id);

const showEditModal = ref(false);
const closeEditModal = () => {
  showEditModal.value = false;
};

const { data: profilePictureUrl } = useUsuarios().imageProfile(computed(() => user?.id ?? null));

const { campiList } = useUserCargoAndCampi();
const api = useApiClient();

const roleConfig = {
  professor: {
    label: 'Professor',
    border: 'role-badge--green',
    icon: IconsEducator,
  },
  dape: { label: 'DAPE', border: 'role-badge--green', icon: IconsUser },
};

const toggleCampusItems = campiList.map(c => ({
  label: c.apelido,
  value: c.id,
}));

const { data: userVinculosResponse } = useQuery({
  queryKey: ['usuarios', user.id, 'vinculos'],
  queryFn: async () => {
    const usuario = await api.call(usuarioFindById, { path: { id: user.id } });
    return { data: (usuario?.vinculos ?? []).filter((v: any) => v.ativo) };
  },
});

const userCampusItems = computed(() =>
  (userVinculosResponse.value?.data ?? [])
    .map((v: any) => ({
      label: v.campus?.apelido ?? 'Desconhecido',
      value: v.campus?.id,
    }))
    .filter(
      (c: any, i: number, arr: any[]) =>
        arr.findIndex((a: any) => a.value === c.value) === i
    )
);

const search = ref('');
const open = ref(false);

const selectedCampusLocal = ref(userCampusItems.value[0]?.value ?? '');

watch(
  userCampusItems,
  newItems => {
    if (newItems.length && !selectedCampusLocal.value && newItems[0]) {
      selectedCampusLocal.value = newItems[0].value;
    }
  },
  { immediate: true }
);

const { data: vinculosResponse } = useQuery({
  queryKey: ['usuarios', user.id, 'vinculos', selectedCampusLocal],
  queryFn: async () => {
    const usuario = await api.call(usuarioFindById, { path: { id: user.id } });
    return {
      data: (usuario?.vinculos ?? []).filter(
        (v: any) => v.ativo && v.campus?.id === selectedCampusLocal.value
      ),
    };
  },
});

const vinculos = computed(() =>
  (vinculosResponse.value?.data ?? []).filter(
    (v: any) => v.campus?.id === selectedCampusLocal.value
  )
);

const moreThanOneCampus = computed(() => toggleCampusItems.length > 1);

const vinculosBadges = computed(() => {
  const seen = new Set<string>();
  const badges: (typeof roleConfig)[keyof typeof roleConfig][] = [];
  for (const v of vinculos.value) {
    const key = v.cargo?.toLowerCase() ?? '';
    const badge =
      key in roleConfig
        ? roleConfig[key as keyof typeof roleConfig]
        : { label: v.cargo, border: 'role-badge--grey', icon: IconsUser };
    if (!seen.has(badge.label)) {
      badges.push(badge);
      seen.add(badge.label);
    }
  }
  return badges;
});
</script>

<template>
  <section class="banner">
    <div class="profile-card">
      <UIImg
        :src="profilePictureUrl"
        alt="Foto de perfil do usuário."
        class="profile-card__avatar u-shrink-0 u-rounded-lg"
      >
        <template #fallbackIcon>
          <IconsUser class="profile-card__avatar-fallback" />
        </template>
      </UIImg>

      <section class="profile-metadata u-text-xs u-font-medium">
        <span>
          <h1 class="profile-metadata__name u-font-semibold u-text-sm">
            {{ user.nome }}
          </h1>
          <p class="profile-metadata__email">{{ user.email }}</p>
        </span>

        <div>
          <CampusSelect
            v-model="selectedCampusLocal"
            :campi="userCampusItems"
          />
        </div>

        <span class="profile-metadata__badges-wrapper">
          <div class="u-flex u-flex-wrap u-gap-2">
            <span
              v-for="(v, index) in vinculosBadges"
              :key="index"
              :class="[
                'role-badge u-flex u-items-center u-gap-1 u-px-2 u-py-1 u-rounded-xl u-font-semibold',
                v.border,
              ]"
            >
              {{ v.label }}
              <component :is="v.icon" class="role-badge__icon" />
            </span>
          </div>
        </span>
      </section>

      <div v-if="canEdit">
        <SectionUsuariosModalsForm :edit-id="user.id" @close="closeEditModal" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 12.5rem;
  border-radius: var(--ui-radius-lg);
  background-image: url('@/assets/imgs/Usuario.jpg');
  background-size: cover;
}

@media (min-width: 40rem) {
  .banner {
    justify-content: flex-start;
  }
}

.profile-card {
  display: flex;
  gap: var(--ui-space-4);
  overflow: visible;
  max-width: 90%;
  margin-left: 0;
  padding: 0.625rem;
  height: max-content;
  border-top-left-radius: 0.625rem;
  border-top-right-radius: 0.625rem;
  background-color: var(--ladesa-background-color);
}

@media (max-width: 25rem) {
  .profile-card {
    flex-direction: column;
    align-items: center;
    gap: var(--ui-space-2);
    max-width: 14rem;
  }
}

@media (min-width: 40rem) {
  .profile-card {
    margin-left: var(--ui-space-6);
    padding: var(--ui-space-3);
  }
}

@media (min-width: 64rem) {
  .profile-card {
    margin-left: var(--ui-space-8);
    padding: var(--ui-space-4);
    min-width: 22.5rem;
  }
}

@media (min-width: 80rem) {
  .profile-card {
    padding: var(--ui-space-5);
  }
}

.profile-card__avatar {
  width: 4.5rem;
  height: 4.5rem;
  border: 2px solid var(--ladesa-grey-color);
}

@media (min-width: 40rem) {
  .profile-card__avatar {
    width: 6rem;
    height: 6rem;
  }
}

@media (min-width: 64rem) {
  .profile-card__avatar {
    width: 7.375rem;
    height: 7.375rem;
  }
}

.profile-card__avatar-fallback {
  width: 50%;
  color: var(--ladesa-grey-color);
}

.profile-metadata {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--ui-space-2);
}

@media (max-width: 25rem) {
  .profile-metadata {
    align-items: center;
    text-align: center;
  }
}

@media (min-width: 48rem) {
  .profile-metadata {
    margin-left: var(--ui-space-2);
  }
}

@media (min-width: 64rem) {
  .profile-metadata {
    margin-left: var(--ui-space-4);
  }
}

.profile-metadata__name {
  text-wrap: wrap;
}

@media (min-width: 64rem) {
  .profile-metadata__name {
    font-size: 1rem;
  }
}

.profile-metadata__email {
  color: var(--ladesa-grey-color);
  text-wrap: wrap;
  overflow-wrap: break-word;
}

.profile-metadata__badges-wrapper {
  line-height: 1.25rem;
}

.role-badge {
  border-width: 2px;
  border-style: solid;
  font-size: 0.6rem;
  color: var(--ladesa-text-green-color);
}

.role-badge--green {
  border-color: var(--ladesa-green-1-color);
}

.role-badge--grey {
  border-color: rgb(156, 163, 175);
}

.role-badge__icon {
  width: 0.75rem;
  height: 0.75rem;
}
</style>
