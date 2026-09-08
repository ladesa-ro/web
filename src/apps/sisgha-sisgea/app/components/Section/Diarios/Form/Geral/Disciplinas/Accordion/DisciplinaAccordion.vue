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
  <UICollapsible v-if="dcRef" v-model="isOpen" class="disciplina-accordion">
    <template #trigger>
      <div
        class="u-flex u-items-center u-justify-between disciplina-accordion__trigger"
      >
        <span class="u-font-semibold u-text-sm disciplina-accordion__title">
          {{ dcRef.disciplina.disciplinaNome ?? dcRef.disciplinaId }}
        </span>
        <IconsArrow
          class="disciplina-accordion__arrow"
          :class="
            isOpen
              ? 'disciplina-accordion__arrow--open'
              : 'disciplina-accordion__arrow--closed'
          "
        />
      </div>
    </template>

    <div class="u-flex u-flex-col u-gap-5 disciplina-accordion__body">
      <!-- Abas -->
      <div class="u-flex u-gap-2">
        <button
          v-for="tab in tabItems"
          :key="tab.value"
          class="u-flex-1 u-flex u-flex-col u-items-center u-justify-center u-gap-2 u-rounded-lg disciplina-accordion__tab"
          :class="{
            'disciplina-accordion__tab--active': activeTab === tab.value,
          }"
          @click="activeTab = tab.value as 'dias' | 'professores'"
        >
          <span
            class="u-font-semibold u-text-xs disciplina-accordion__tab-label"
          >
            {{ tab.label }}
          </span>
        </button>
      </div>

      <!-- Conteúdo da aba ativa (v-show preserva estado sem desmontar) -->
      <div v-show="activeTab === 'dias'">
        <SectionDiariosFormGeralDisciplinasAccordionDiasDeAulaTab
          :index="index"
        />
      </div>
      <div v-show="activeTab === 'professores'">
        <SectionDiariosFormGeralDisciplinasAccordionProfessoresTab
          :index="index"
        />
      </div>
    </div>
  </UICollapsible>
</template>

<style scoped>
.disciplina-accordion {
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 100%);
  border-radius: var(--ui-radius-lg);
}

.disciplina-accordion__trigger {
  padding: var(--ui-space-4) var(--ui-space-5);
  cursor: pointer;
}

.disciplina-accordion__title {
  color: var(--ladesa-text-default-color);
}

.disciplina-accordion__arrow {
  width: var(--ui-space-3);
  height: var(--ui-space-3);
  transition: transform var(--ui-duration-base) var(--ui-easing-standard);
}

.disciplina-accordion__arrow--open {
  transform: rotate(90deg);
}

.disciplina-accordion__arrow--closed {
  transform: rotate(-90deg);
}

.disciplina-accordion__body {
  padding: 0 var(--ui-space-5) var(--ui-space-5);
}

.disciplina-accordion__tab {
  height: 6rem;
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 100%);
  color: var(--ladesa-text-default-color);
  cursor: pointer;
  transition:
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    border-color var(--ui-duration-base) var(--ui-easing-standard),
    color var(--ui-duration-base) var(--ui-easing-standard);
}

.disciplina-accordion__tab--active {
  background-color: var(--ladesa-green-1-color);
  border-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
}

.disciplina-accordion__tab-label {
  letter-spacing: 0.025em;
}
</style>
