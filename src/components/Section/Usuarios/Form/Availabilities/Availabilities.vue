<script setup lang="ts">
import { ref } from 'vue';
import IconArrow from '~/components/Icons/Arrow/IconArrow.vue';
import { getActivesTeacherRole, useFormUser } from '../FormUtils';

const selectedOptions = ref();

const options = [
  { value: 'Domingo' },
  { value: 'Segunda' },
  { value: 'Terça' },
  { value: 'Quarta' },
  { value: 'Quinta' },
  { value: 'Sexta' },
  { value: 'Sábado' },
];

selectedOptions.value = options[1];

let currentDayIndex = ref(1);

const changeDay = (delta: number) => {
  currentDayIndex.value =
    (currentDayIndex.value + delta + options.length) % options.length;

  selectedOptions.value = options[currentDayIndex.value];
};

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
</script>
<template>
  <v-form class="p-5 overflow-auto">
    <div class="modal">
      <div class="form-header">
        <h1 class="main-title">
          <span>Disponibilidade</span>
        </h1>
      </div>
      <div class="flex justify-between items-center mt-5">
        <IconArrow class="cursor-pointer" @click="changeDay(-1)" />
        <div>
          <span class="font-bold">
            {{ selectedOptions?.value }}
          </span>
        </div>

        <IconArrow class="cursor-pointer rotate-180" @click="changeDay(1)" />
      </div>

      <v-divider class="my-4" />

      <div class="flex flex-col gap-5">
        <v-expansion-panels mandatory class="mb-6" v-model="activePanel">
          <SectionUsuariosFormAvailabilitiesAvailability
            v-for="vinculo in vinculosComCargoProfessor"
            :key="vinculo.campus.id"
            :vinculo="vinculo"
          />
        </v-expansion-panels>
      </div>
    </div>
  </v-form>
</template>

<style scoped>
.modal {
  text-align: center;
}
.main-title {
  font-size: 24px;
  font-weight: 700;
}
</style>
computed, , watch
