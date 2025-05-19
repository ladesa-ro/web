<script lang="ts" setup>
type Props = { userId: string };
const { userId } = defineProps<Props>();

//

const apiClient = useApiClient();

const user = await apiClient.usuarios.usuarioFindOneById({ id: userId });
</script>

<template>
  <UIContainer
    variant="larger"
    class="flex flex-col justify-center gap-5 lg:gap-6.5 xl:gap-8"
  >
    <SectionProfileHeader :user="user" />

    <!-- disponibilidade + ensino -->
    <section class="flex max-[900px]:flex-col min-[900px]:flex-row gap-4">
      <SectionProfileAvailability class="flex-1/2 min-[1144px]:flex-1" />
      <SectionProfileTeaching class="flex-1/2 min-[1144px]:flex-2" />
    </section>
  </UIContainer>
</template>

<style>
@reference "~/assets/styles/app.css";

/* class provided for the child components */
.border-card {
  @apply overflow-hidden border-2 border-ldsa-grey rounded-xl;
}
</style>
