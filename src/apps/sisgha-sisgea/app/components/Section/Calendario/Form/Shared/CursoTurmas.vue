<script lang="ts" setup>
type Turma = { id: string; nome: string };

type Props = {
  nome: string;
  turmas: Turma[] | undefined;
  disabled?: boolean;
  isTurmaSelected: (turmaId: string) => boolean;
};

defineProps<Props>();

defineEmits<{ toggle: [turmaId: string]; load: [] }>();
</script>

<template>
  <div class="u-flex u-flex-col u-gap-2 participantes-selector__curso">
    <span class="u-text-xs u-font-medium participantes-selector__curso-nome">
      {{ nome }}
    </span>

    <div class="u-flex u-flex-wrap u-gap-2 participantes-selector__turmas">
      <UIFormCheckbox
        v-for="turma in turmas ?? []"
        :key="turma.id"
        :model-value="isTurmaSelected(turma.id)"
        :disabled="disabled"
        :label="turma.nome"
        @update:model-value="$emit('toggle', turma.id)"
      />
    </div>

    <button
      v-if="!turmas"
      type="button"
      class="u-text-xs participantes-selector__load-turmas"
      @click="$emit('load')"
    >
      Carregar turmas
    </button>
  </div>
</template>

<style scoped>
.participantes-selector__curso {
  padding-left: var(--ui-space-3);
}

.participantes-selector__curso-nome {
  color: var(--ladesa-grey-color);
}

.participantes-selector__turmas {
  padding-left: var(--ui-space-2);
}

.participantes-selector__load-turmas {
  color: var(--ladesa-green-1-color);
  text-decoration: underline;
  padding-left: var(--ui-space-2);
}
</style>
