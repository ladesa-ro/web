<script lang="ts" setup>
import AccessRoleButton from './AccessRoleButton.vue';

const route = useRoute();

enum Profile {
  DAPE = 'DAPE',
  PROFESSOR = 'Professor',
}

const activeProfile = computed(() => {
  if (route.path.startsWith('/sisgha/dape')) {
    return Profile.DAPE;
  } else if (route.path.startsWith('/sisgha/professor')) {
    return Profile.PROFESSOR;
  }

  return null;
});

defineEmits(['close']);
</script>

<template>
  <div
    class="access-role u-flex u-flex-col u-justify-between u-items-center u-p-5 u-rounded-lg u-font-semibold"
  >
    <UITitle
      variant="mini"
      text="Alternar cargo"
      class="access-role__title"
    />

    <section
      class="access-role__buttons u-flex u-justify-between u-gap-3-5 u-w-full"
    >
      <AccessRoleButton
        :active="activeProfile === Profile.PROFESSOR"
        :position-name="Profile.PROFESSOR"
        to="/sisgha/professor"
      >
        <IconsEducator height="49" width="36" />
      </AccessRoleButton>

      <AccessRoleButton
        :active="activeProfile === Profile.DAPE"
        :position-name="Profile.DAPE"
        to="/sisgha/dape"
      >
        <IconsUser height="40" width="38" />
      </AccessRoleButton>
    </section>

    <UIButtonModalCancel
      class="u-w-full"
      variant="small"
      @click="$emit('close')"
    />
  </div>
</template>

<style scoped>
.access-role {
  gap: 1.125rem;
  padding-top: 1.125rem;
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 50%);
  background-color: var(--ladesa-background-color);
  color: var(--ladesa-text-default-color);
}

.access-role__title {
  align-self: flex-start;
}

@media (min-width: 640px) {
  .access-role__buttons {
    gap: var(--ui-space-5);
  }
}
</style>
