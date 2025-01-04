<script setup lang="ts">

type Props = {
  userId: string;
};
const props = defineProps<Props>();

//

const apiClient = useApiClient();

const usuario = await apiClient.usuarios.usuarioFindOneById({
  id: props.userId,
});
</script>

<template>
  <div class="flex flex-col justify-center py-7 px-20">
    <SectionProfileHeader :user="usuario"/>

    <!-- disponibilidade + ensino -->
    <section class="flex gap-4 mt-8">
      <SectionProfileAvailability class="flex-2" />
      <SectionProfileTeaching class="flex-1" />
    </section>
  </div>
</template>

<style>
/* class provided for the child components */
.border-card {
  @apply overflow-hidden;
  @apply border-[2px] rounded-xl border-ldsa-grey;
}
</style>
