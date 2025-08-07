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
    class="flex flex-col justify-between items-center w-[19.75rem] h-[18.125rem] px-8 py-6 border-2 border-ldsa-grey/50 rounded-lg bg-ldsa-bg font-semibold text-ldsa-text-default"
  >
    <h1>Alternar cargo</h1>

    <section class="flex justify-between w-full">
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

    <button
      class="flex justify-between items-center gap-2.5"
      @click="$emit('close')"
    >
      Cancelar
      <IconsClose class="mt-px" height="10" width="11" />
    </button>
  </div>
</template>
