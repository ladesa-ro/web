<script lang="ts" setup>
import { UILoading } from '#components';
import { useRouter } from 'vue-router';
import { useCanEditProfile } from '#imports';

type Props = { userId: string };
const { userId } = defineProps<Props>();

const usuarios = useUsuarios();
const { data: user, isLoading, isError } = usuarios.findOne(ref(userId));

//
const { canEdit } = useCanEditProfile(userId);
const showGoBack = computed(() => !canEdit.value);

const router = useRouter();
const goBack = () => {
  router.push('/sisgha/dape/usuarios');
};
</script>

<template>
  <UIContainer variant="larger" class="profile-page__container">
    <UIBreadcrumbDapeBreadcrumb />

    <template v-if="user">
      <div v-if="showGoBack">
        <UIButtonModalGoBack @click="goBack" />
      </div>
      <SectionProfileHeader :user="user" />

      <!-- TODO: puxar da api -->
      <section class="profile-page__grid">
        <SectionProfileAvailability
          class="border-card profile-page__availability"
        />

        <SectionProfileTeaching
          :user="user"
          class="border-card profile-page__teaching"
        />
      </section>
    </template>

    <span v-else-if="isLoading"><UILoading /></span>
    <span v-else-if="isError">
      Ocorreu um erro inesperado ao procurar o usuário.
    </span>
  </UIContainer>
</template>

<style>
/* class provided for the child components */
.border-card {
  overflow: hidden;
  border: 2px solid var(--ladesa-grey-color);
  border-radius: var(--ui-radius-xl);
}
</style>

<style scoped>
.profile-page__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--ui-space-5);
}

@media (min-width: 64rem) {
  .profile-page__container {
    gap: 1.625rem;
  }
}

@media (min-width: 80rem) {
  .profile-page__container {
    gap: var(--ui-space-8);
  }
}

.profile-page__grid {
  display: grid;
  gap: var(--ui-space-4);
  grid-auto-rows: auto;
}

@media (min-width: 48rem) {
  .profile-page__grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .profile-page__availability {
    order: 0;
    grid-column: span 2 / span 2;
  }

  .profile-page__teaching {
    order: 0;
    grid-column: span 3 / span 3;
  }
}
</style>
