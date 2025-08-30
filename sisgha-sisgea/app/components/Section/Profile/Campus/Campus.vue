<script setup lang="ts">
import { useCampusContext, useUserCargoAndCampi } from '#imports';
import { computed, ref } from 'vue';
import fotoCampus from '~/assets/imgs/Foto-Campus.png';
import IconLocale from '~/components/Icons/IconLocale.vue';

const { userId } = defineProps<{ userId: string }>();

const { campiList } = useUserCargoAndCampi();
const selectedCampusGlobalState = useCampusContext();

// Mapeia os campi para exibição
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

// Modal
const showAlterarModal = ref(false);

// Função para alterar campus
function changeCampus(newCampusId: string) {
  selectedCampusGlobalState.value = newCampusId;
  showAlterarModal.value = false;
}
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
        <!-- Lista de campi dentro do modal -->
        <div class="campus-list flex flex-col gap-2">
          <button
            v-for="c in toggleCampusItems"
            :key="c.value"
            @click="changeCampus(c.value)"
            class="campus-option flex items-center gap-3 p-2 border rounded-md hover:bg-gray-100"
          >
            <img
              :src="c.fotoUrl"
              alt="foto campus"
              class="campus-img w-12 h-12 object-cover rounded"
            />
            <span>{{ c.label }}</span>
          </button>
        </div>
      </DialogModalBaseLayout>
    </DialogSkeleton>
  </SectionProfileSectionsLayout>
</template>
