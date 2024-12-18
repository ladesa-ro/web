<script setup lang="ts">
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
    class="flex flex-col justify-between items-center w-[19.75rem] h-[18.125rem] px-8 py-6 border-2 border-ldsa-grey/50 rounded-lg text-ldsa-text bg-ldsa-bg"
  >
    <span class="font-[600]">Alternar cargo</span>

    <section class="flex flex-row justify-between w-full">
      <!-- ================== PROFESSOR ================== -->
      <nuxt-link
        class="button-cargo"
        :class="{ active: activeProfile === 'Professor' }"
        to="/sisgha/professor"
      >
        <IconsIconEducator width="36" height="49" />
        <p class="font-[600]">Professor</p>
      </nuxt-link>
      <!-- =============================================== -->

      <!-- ===================== DAPE ===================== -->
      <nuxt-link
        class="button-cargo"
        :class="{ active: activeProfile === 'DAPE' }"
        to="/sisgha/dape"
      >
        <IconsIconUser width="38" height="40" />
        <p class="font-[600]">DAPE</p>
      </nuxt-link>
      <!-- =============================================== -->
    </section>

    <button
      class="flex flex-row justify-between items-center min-w-24 font-[600] cursor-pointer"
      @click="$emit('close')"
    >
      Cancelar
      <IconsIconClose width="11" height="10" />
    </button>
  </div>
</template>

<style scoped>
.button-cargo {
  @apply flex flex-col justify-end items-center w-28 h-36 border-2 rounded-lg border-ldsa-grey/50 px-0 py-8 gap-2 text-center cursor-pointer;
}

.active {
  @apply bg-ldsa-green-1 border-ldsa-green-1;
  @apply text-ldsa-white;
}
</style>
