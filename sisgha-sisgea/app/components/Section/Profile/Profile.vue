<script lang="ts" setup>
type Props = {
  userId: string;
};
const props = defineProps<Props>();

//

const apiClient = useApiClient();

const user = await apiClient.usuarios.usuarioFindOneById({
  id: props.userId,
});
</script>

<template>
  <div class="flex flex-col justify-center py-7 px-20">
    <SectionProfileHeader :user="user" />

    <!-- disponibilidade + ensino -->
    <section class="flex gap-4 mt-8">
      <SectionProfileAvailability class="flex-1" />
      <SectionProfileTeaching class="flex-2" />
    </section>
  </div>
</template>

<style>
@reference "~/assets/styles/app-reference.css";

/* class provided for the child components */
.border-card {
  @apply overflow-hidden;
  @apply border-2 border-ldsa-grey rounded-xl;
}
</style>
