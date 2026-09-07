<script lang="ts" setup>
import type { TurmaMatriculaFindOneOutputDto } from '@ladesa-ro/web.api.client';
import MatricularModal from './MatricularModal.vue';
import AlunoRow from './AlunoRow.vue';

const props = defineProps<{ turmaId: string; campusId?: string | null }>();

const matriculas = useTurmaMatricula();

const matriculasQuery = matriculas.list(
  computed(() => ({ 'filter.turma.id': [props.turmaId], limit: 500 }))
);
const alunos = computed(() => matriculasQuery.data.value?.data ?? []);

const confirmDesvincular = useConfirmDelete();
const matriculaToRemove = ref<TurmaMatriculaFindOneOutputDto | null>(null);

async function askDesvincular(matricula: TurmaMatriculaFindOneOutputDto) {
  matriculaToRemove.value = matricula;
  const confirmed = await confirmDesvincular.confirm();
  if (confirmed && matriculaToRemove.value) {
    await matriculas.remove(matriculaToRemove.value.id);
    await matriculas.invalidate();
  }
  matriculaToRemove.value = null;
}

async function onMatriculado() {
  await matriculas.invalidate();
}
</script>

<template>
  <div class="u-flex u-flex-col u-gap-4">
    <div class="u-flex u-justify-between u-items-center">
      <h2 class="u-font-semibold u-text-lg">Alunos</h2>
      <MatricularModal
        :turma-id="turmaId"
        :campus-id="campusId"
        @matriculado="onMatriculado"
      />
    </div>

    <p v-if="alunos.length === 0" class="alunos-empty u-text-sm">
      Nenhum aluno matriculado nesta turma.
    </p>

    <div v-else class="alunos-table-wrapper">
      <table class="alunos-table u-w-full u-text-sm">
        <thead>
          <tr class="alunos-table__header-row">
            <th class="u-py-2 u-pr-3 u-font-semibold">Nome</th>
            <th class="u-py-2 u-pr-3 u-font-semibold">Matrícula</th>
            <th class="u-py-2 u-pr-3 u-font-semibold">Vinculado em</th>
            <th class="u-py-2 u-pr-3 u-font-semibold" />
          </tr>
        </thead>
        <tbody>
          <AlunoRow
            v-for="matricula in alunos"
            :key="matricula.id"
            :matricula="matricula"
            @desvincular="askDesvincular"
          />
        </tbody>
      </table>
    </div>

    <DialogConfirm
      v-model="confirmDesvincular.isOpen.value"
      title="Desvincular aluno"
      message="Deseja realmente desvincular este aluno da turma?"
      @confirm="confirmDesvincular.onConfirm"
    />
  </div>
</template>

<style scoped>
.alunos-empty {
  color: var(--ladesa-grey-color);
}

.alunos-table-wrapper {
  overflow-x: auto;
}

.alunos-table {
  border-collapse: collapse;
}

.alunos-table__header-row {
  border-bottom: 2px solid var(--ladesa-grey-color);
  text-align: left;
  color: var(--ladesa-grey-color);
}
</style>
