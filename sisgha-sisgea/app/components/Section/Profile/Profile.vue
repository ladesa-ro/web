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
  <UIContainer variant="larger" class="flex flex-col justify-center gap-8">
    <SectionProfileHeader :user="user" />

    <!-- disponibilidade + ensino -->
    <section class="flex max-[900px]:flex-col min-[900px]:flex-row gap-4">
      <SectionProfileAvailability class="flex-1/2 lg:flex-[1.1]" />
      <SectionProfileTeaching class="flex-1/2 lg:flex-[1.9]" />
    </section>
  </UIContainer>
</template>

<style>
@reference "~/assets/styles/app-reference.css";

/* class provided for the child components */
.border-card {
  @apply overflow-hidden;
  @apply border-2 border-ldsa-grey rounded-xl;
}
</style>
