<script lang="ts" setup>
import { useApiContext } from '~/composables/api-context/setup';

definePageMeta({
  layout: 'sisgha-aluno',
  auth: true,
});

useTitle('dashboard', 'Meu horário');

const { resumoVinculos } = useApiContext();

const alunoPerfilId = computed(
  () => resumoVinculos.value.mapaCargoVinculos.aluno?.[0]?.id ?? null
);

const matriculas = useTurmaMatricula();
const matriculasQuery = matriculas.list(
  computed(() =>
    alunoPerfilId.value
      ? { 'filter.perfil.id': [alunoPerfilId.value], limit: 100 }
      : undefined
  )
);

const turmaIds = computed(() =>
  (matriculasQuery.data.value?.data ?? []).map(m => m.turma.id)
);

const turmas = useTurmas();
const turmasQuery = turmas.list(
  computed(() =>
    turmaIds.value.length > 0
      ? { 'filter.id': turmaIds.value, limit: 100 }
      : undefined
  )
);

const turmaItems = computed(() =>
  (turmasQuery.data.value?.data ?? []).map(turma => ({
    label: turma.nome
      ? turma.nome
      : `${turma.periodo} - ${turma.curso?.nomeAbreviado ?? ''}`,
    value: turma.id,
  }))
);

const selectedTurmaId = ref<string | null>(null);

watch(
  turmaItems,
  items => {
    if (!selectedTurmaId.value && items.length > 0) {
      selectedTurmaId.value = items[0]?.value ?? null;
    }
  },
  { immediate: true }
);

const selectedTurmaItem = computed({
  get: () =>
    turmaItems.value.find(item => item.value === selectedTurmaId.value),
  set: (item: { label: string; value: string } | undefined) => {
    selectedTurmaId.value = item?.value ?? null;
  },
});
</script>

<template>
  <GuardCargoRequired cargo="aluno">
    <UIContainer v-if="turmaItems.length > 1" class="pt-4">
      <UIFormOptionFieldsSelect
        v-model="selectedTurmaItem"
        :items="turmaItems"
        label="Turma"
        placeholder="Selecione uma turma"
        class="max-w-sm"
      />
    </UIContainer>

    <SectionHorarioProfessorEAlunoHorario :turma-id="selectedTurmaId" />
  </GuardCargoRequired>
</template>
