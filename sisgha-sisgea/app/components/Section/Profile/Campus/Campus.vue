<script setup lang="ts">
import { useCampusContext, useUserCargoAndCampi } from '#imports';
import { computed, ref } from 'vue';
import fotoCampus from '~/assets/imgs/Foto-Campus.png';
import IconLocale from '~/components/Icons/IconLocale.vue';

type Props = { userId: string };
const { userId } = defineProps<Props>();

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

const showCampusSelector = ref(false);

function changeCampus(newCampusId: string) {
  selectedCampusGlobalState.value = newCampusId;
  showCampusSelector.value = false;
  showAlterarModal.value = false;
}

//
const showAlterarModal = ref(false);

function openAlterarModal() {
  showAlterarModal.value = true;
}
function closeAlterarModal() {
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

    <UIButtonDefault @click="openAlterarModal" class="w-full mt-4">
      Alterar
    </UIButtonDefault>

    <AlterarCampus
      v-if="showAlterarModal"
      :campi="toggleCampusItems"
      :selected-campus-id="selectedCampusGlobalState"
      @close="closeAlterarModal"
      @campus-alterado="
        (id: string) => console.log('Campus alterado para:', id)
      "
    />
  </SectionProfileSectionsLayout>
</template>
