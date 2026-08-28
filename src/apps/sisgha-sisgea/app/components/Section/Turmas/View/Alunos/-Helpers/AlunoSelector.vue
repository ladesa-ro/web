<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { perfilList, perfilFindById } from '@ladesa-ro/web.api.client';
import type { PerfilFindOneOutputDto } from '@ladesa-ro/web.api.client';

const props = defineProps<{ campusId?: string | null }>();

const modelValue = defineModel<string | null>({ default: null });

const search = ref('');
const api = useApiClient();

const listQuery = useQuery({
  queryKey: computed(() => [
    'perfis-alunos',
    'list',
    search.value,
    props.campusId,
  ]),
  queryFn: () =>
    api.call(perfilList, {
      query: {
        search: search.value || undefined,
        'filter.cargo.nome': ['aluno'],
        ...(props.campusId ? { 'filter.campus.id': [props.campusId] } : {}),
        limit: 20,
      },
    }),
});

const activeQuery = useQuery({
  queryKey: computed(() => ['perfis-alunos', 'detail', modelValue.value]),
  queryFn: () => api.call(perfilFindById, { path: { id: modelValue.value! } }),
  enabled: computed(() => !!modelValue.value),
});

function labelFor(perfil: PerfilFindOneOutputDto) {
  const matricula = perfil.usuario?.matricula
    ? ` (${perfil.usuario.matricula})`
    : '';
  return `${perfil.usuario?.nome ?? ''}${matricula}`;
}

const items = computed(() => {
  const list = (listQuery.data.value?.data ?? []).map(perfil => ({
    value: perfil.id,
    label: labelFor(perfil),
  }));

  const active = activeQuery.data.value;
  if (active && !list.some(item => item.value === active.id)) {
    list.unshift({ value: active.id, label: labelFor(active) });
  }

  return list;
});
</script>

<template>
  <UIFormOptionFieldsAutocomplete
    v-model:selected-option="modelValue"
    v-model:search-term="search"
    :items="items"
    label="Aluno"
    placeholder="Selecione um aluno"
  />
</template>
