<script setup lang="ts">
import { useCampusContext, useUserCargoAndCampi } from '#imports';
import { computed, ref } from 'vue';
import fotoCampus from '~/assets/imgs/Foto-Campus.png';
import IconLocale from '~/components/Icons/IconLocale.vue';

const { userId } = defineProps<{ userId: string }>();

const { campiList } = useUserCargoAndCampi();
const selectedCampusGlobalState = useCampusContext();

const toggleCampusItems = campiList.map(campus => ({
  label: campus.apelido,
  value: campus.id,
  fotoUrl: fotoCampus,
}));

const campus = computed(() => {
  return (
    toggleCampusItems.find(
      c => c.value === selectedCampusGlobalState.value
    ) ?? { label: 'Carregando campus...', fotoUrl: '' }
  );
});

const showAlterarModal = ref(false);
</script>

<template>
  <SectionProfileSectionsLayout :icon="IconLocale" title="Campus atual">
    <div class="campus-card border-2 border-ldsa-grey rounded-xl">
      <img
        v-if="campus.fotoUrl"
        :src="campus.fotoUrl"
        alt="Foto do campus"
        class="campus-img rounded-t-xl w-full h-32 object-cover"
      />
      <p class="text-center my-3 font-semibold">{{ campus.label }}</p>
    </div>

    <DialogSkeleton
      v-model="showAlterarModal"
      class="flex justify-center w-full"
    >
      <template #activator>
        <UIButtonDefault class="w-full mt-4"> Alterar </UIButtonDefault>
      </template>

      <DialogModalBaseLayout
        title="Alterar Campus"
        :on-close="() => (showAlterarModal = false)"
        :close-button="true"
      >
        <AlterarCampus
          :campi="toggleCampusItems"
          :selected-campus-id="selectedCampusGlobalState"
          @close="showAlterarModal = false"
        />
      </DialogModalBaseLayout>
    </DialogSkeleton>
  </SectionProfileSectionsLayout>
</template>
