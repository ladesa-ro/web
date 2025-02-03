<script setup lang="ts">
import { getActivesTeacherRole, useFormUser } from '../FormUtils';

const options = [
  { value: 'Segunda' },
  { value: 'Terça' },
  { value: 'Quarta' },
  { value: 'Quinta' },
  { value: 'Sexta' },
  { value: 'Sábado' },
];

const selectedOptions = ref();

selectedOptions.value = options[0];

const currentDayIndex = ref(0);
const changeDay = (delta: number) => {
  currentDayIndex.value =
    (currentDayIndex.value + delta + options.length) % options.length;

  selectedOptions.value = options[currentDayIndex.value];
};

//

const { values: formValues } = useFormUser();

const vinculosComCargoProfessor = computed(() => {
  return getActivesTeacherRole(formValues.vinculos);
});

const activePanel = ref(vinculosComCargoProfessor.value[0]?.campus.id);

watch(vinculosComCargoProfessor, (current, previous) => {
  const inserted = current.find(
    (i) => previous.findIndex((k) => k.campus.id === i.campus.id) === -1
  );

  if (inserted) {
    activePanel.value = inserted.campus.id;
  } else {
    const activeExistsInCurrent = current.some(
      (i) => i.campus.id === activePanel.value
    );

    if (!activeExistsInCurrent) {
      activePanel.value = current[current.length - 1].campus.id;
    }
  }
});

const $emit = defineEmits(['close']);

function onClose() {
  $emit('close');
}
</script>
<template>
  <DialogModalBaseLayout
    :on-close="onClose"
    title="Disponibilidade"
    :close-button="false"
  >
    <!-- TODO: substituir por componente de matemática modular -->
    <div class="flex justify-between items-center">
      <IconsArrowIconArrow class="cursor-pointer" @click="changeDay(-1)" />
      <span class="font-bold">
        {{ selectedOptions?.value }}
      </span>
      <IconsArrowIconArrow
        class="cursor-pointer rotate-180"
        @click="changeDay(1)"
      />
    </div>

    <v-expansion-panels v-model="activePanel" mandatory class="">
      <SectionUsuariosFormAvailabilitiesAvailability
        v-for="vinculo in vinculosComCargoProfessor"
        :key="vinculo.campus.id"
        :vinculo="vinculo"
      />
    </v-expansion-panels>
  </DialogModalBaseLayout>
</template>
