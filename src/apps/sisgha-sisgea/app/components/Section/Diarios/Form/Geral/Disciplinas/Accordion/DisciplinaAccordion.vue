<script setup lang="ts">
import { useContextDiariosFormGeral } from '../../Contexto';

const props = defineProps<{
  index: number;
}>();

const contexto = useContextDiariosFormGeral();

const dcRef = computed(() => contexto.disciplinasConfig.value[props.index]);

const isOpen = computed({
  get: () => dcRef.value?.accordionOpen ?? false,
  set: (val: boolean) => {
    const dc = dcRef.value;
    if (dc) dc.accordionOpen = val;
  },
});

const activeTab = computed({
  get: () => dcRef.value?.activeTab ?? 'dias',
  set: (val: 'dias' | 'professores') => {
    const dc = dcRef.value;
    if (dc) dc.activeTab = val;
  },
});

const tabItems = [
  { value: 'dias', label: 'Dias de aula' },
  { value: 'professores', label: 'Professores' },
];
</script>

<template>
  <UICollapsible v-if="dcRef" v-model="isOpen" class="border-2 border-ldsa-grey/100 rounded-lg">
    <template #trigger>
      <div
        class="flex items-center justify-between px-5 py-4 cursor-pointer"
      >
        <span class="font-semibold text-sm text-ldsa-text-default">
          {{ dcRef.disciplina.disciplinaNome ?? dcRef.disciplinaId }}
        </span>
        <IconsArrow
          class="w-3 h-3 transition-transform"
          :class="isOpen ? 'rotate-90' : '-rotate-90'"
        />
      </div>
    </template>

    <div class="px-5 pb-5 flex flex-col gap-5">
      <!-- Abas -->
      <div class="flex gap-2">
        <button
          v-for="tab in tabItems"
          :key="tab.value"
          class="flex-1 flex flex-col items-center justify-center gap-2 h-24 rounded-lg border-2 transition-colors cursor-pointer"
          :class="
            activeTab === tab.value
              ? 'bg-ldsa-green-1 border-ldsa-green-1 text-white'
              : 'border-ldsa-grey/100 text-ldsa-text-default'
          "
          @click="activeTab = tab.value as 'dias' | 'professores'"
        >
          <span class="font-semibold text-xs tracking-wide">
            {{ tab.label }}
          </span>
        </button>
      </div>

      <!-- Conteúdo da aba ativa -->
      <KeepAlive>
        <SectionDiariosFormGeralDisciplinasAccordionDiasDeAulaTab
          v-if="activeTab === 'dias'"
          :key="'dias-' + index"
          :index="index"
        />
        <SectionDiariosFormGeralDisciplinasAccordionProfessoresTab
          v-else
          :key="'profs-' + index"
          :index="index"
        />
      </KeepAlive>
    </div>
  </UICollapsible>
</template>
