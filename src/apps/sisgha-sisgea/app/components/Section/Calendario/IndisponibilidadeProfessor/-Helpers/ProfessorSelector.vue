<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { perfilList, perfilFindById } from '@ladesa-ro/web.api.client';
import type { PerfilFindOneOutputDto } from '@ladesa-ro/web.api.client';

const modelValue = defineModel<string | null>({ default: null });

const search = ref('');
const api = useApiClient();

const listQuery = useQuery({
  queryKey: computed(() => ['perfis-professores', 'list', search.value]),
  queryFn: () =>
    api.call(perfilList, {
      query: {
        search: search.value || undefined,
        'filter.cargo.nome': ['professor'],
        limit: 20,
      },
    }),
});

const activeQuery = useQuery({
  queryKey: computed(() => ['perfis-professores', 'detail', modelValue.value]),
  queryFn: () => api.call(perfilFindById, { path: { id: modelValue.value! } }),
  enabled: computed(() => !!modelValue.value),
});

function labelFor(perfil: PerfilFindOneOutputDto) {
  return perfil.campus?.apelido
    ? `${perfil.usuario.nome} (${perfil.campus.apelido})`
    : (perfil.usuario.nome ?? '');
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
    label="Professor"
    placeholder="Selecione um professor"
  />
</template>
