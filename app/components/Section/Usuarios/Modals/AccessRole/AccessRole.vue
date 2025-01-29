<script setup lang="ts">
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
        :position-name="Profile.PROFESSOR"
        :active="activeProfile === Profile.PROFESSOR"
        to="/sisgha/professor"
      >
        <IconsIconEducator width="36" height="49" />
      </AccessRoleButton>

      <AccessRoleButton
        :position-name="Profile.DAPE"
        :active="activeProfile === Profile.DAPE"
        to="/sisgha/dape"
      >
        <IconsIconUser width="38" height="40" />
      </AccessRoleButton>
    </section>

    <button
      class="flex justify-between items-center gap-2.5"
      @click="$emit('close')"
    >
      Cancelar
      <IconsIconClose width="11" height="10" class="mt-px" />
    </button>
  </div>
</template>
