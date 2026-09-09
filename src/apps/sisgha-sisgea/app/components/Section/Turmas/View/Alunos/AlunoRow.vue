<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { perfilFindById } from '@ladesa-ro/web.api.client';
import dayjs from 'dayjs';
import type { TurmaMatriculaFindOneOutputDto } from '@ladesa-ro/web.api.client';

const props = defineProps<{ matricula: TurmaMatriculaFindOneOutputDto }>();
const emit = defineEmits<{
  desvincular: [matricula: TurmaMatriculaFindOneOutputDto];
}>();

const api = useApiClient();

const perfilQuery = useQuery({
  queryKey: computed(() => [
    'perfis-alunos',
    'detail',
    props.matricula.perfil.id,
  ]),
  queryFn: () =>
    api.call(perfilFindById, { path: { id: props.matricula.perfil.id } }),
});

const perfil = computed(() => perfilQuery.data.value);
const dataVinculo = computed(() =>
  dayjs(props.matricula.dateCreated).format('DD/MM/YYYY')
);
</script>

<template>
  <tr class="aluno-row">
    <td class="u-py-2 u-pr-3">{{ perfil?.usuario?.nome ?? '—' }}</td>
    <td class="u-py-2 u-pr-3">{{ perfil?.usuario?.matricula ?? '—' }}</td>
    <td class="u-py-2 u-pr-3">{{ dataVinculo }}</td>
    <td class="u-py-2 u-pr-3 u-text-right">
      <button
        type="button"
        class="aluno-row__unlink u-font-medium"
        @click="emit('desvincular', matricula)"
      >
        Desvincular
      </button>
    </td>
  </tr>
</template>

<style scoped>
.aluno-row {
  border-bottom: 1px solid rgb(from var(--ladesa-grey-color) R G B / 40%);
}

.aluno-row__unlink {
  color: var(--ladesa-red-color);
}

.aluno-row__unlink:hover {
  text-decoration: underline;
}
</style>
