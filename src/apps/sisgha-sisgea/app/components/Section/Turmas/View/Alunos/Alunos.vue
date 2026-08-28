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
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="font-semibold text-lg">Alunos</h2>
      <MatricularModal
        :turma-id="turmaId"
        :campus-id="campusId"
        @matriculado="onMatriculado"
      />
    </div>

    <p v-if="alunos.length === 0" class="text-sm text-ldsa-grey">
      Nenhum aluno matriculado nesta turma.
    </p>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="border-b-2 border-ldsa-grey text-left text-ldsa-grey">
            <th class="py-2 pr-3 font-semibold">Nome</th>
            <th class="py-2 pr-3 font-semibold">Matrícula</th>
            <th class="py-2 pr-3 font-semibold">Vinculado em</th>
            <th class="py-2 pr-3 font-semibold" />
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
