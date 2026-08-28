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
  queryKey: computed(() => ['perfis-alunos', 'detail', props.matricula.perfil.id]),
  queryFn: () =>
    api.call(perfilFindById, { path: { id: props.matricula.perfil.id } }),
});

const perfil = computed(() => perfilQuery.data.value);
const dataVinculo = computed(() =>
  dayjs(props.matricula.dateCreated).format('DD/MM/YYYY')
);
</script>

<template>
  <tr class="border-b border-ldsa-grey/40">
    <td class="py-2 pr-3">{{ perfil?.usuario?.nome ?? '—' }}</td>
    <td class="py-2 pr-3">{{ perfil?.usuario?.matricula ?? '—' }}</td>
    <td class="py-2 pr-3">{{ dataVinculo }}</td>
    <td class="py-2 pr-3 text-right">
      <button
        type="button"
        class="text-ldsa-red font-medium hover:underline"
        @click="emit('desvincular', matricula)"
      >
        Desvincular
      </button>
    </td>
  </tr>
</template>
