<script setup lang="ts">
import { useContextDiariosFormGeral } from '../../../Contexto';

const props = defineProps<{
  index: number;
}>();

const contexto = useContextDiariosFormGeral();

const dcRef = computed(() => contexto.disciplinasConfig.value[props.index]);

const professorSearch = ref('');

const usuariosComposable = useUsuarios();
const searchQuery = computed(() => ({
  search: professorSearch.value || undefined,
}));
const listQuery = usuariosComposable.list(searchQuery);

const professores = computed(() => {
  const items = listQuery.data.value?.data;
  if (!items) return [];
  return (items as Record<string, unknown>[])
    .map((u) => ({
      value: u.id as string,
      label: (u.nome as string) ?? '',
      foto: u.foto as string | null,
      cargo: u.cargo as string | null,
    }))
    .toSorted((a, b) => a.label.localeCompare(b.label));
});

const professoresSelecionados = computed({
  get: () => dcRef.value?.professoresSelecionados ?? [],
  set: (val: string[]) => {
    const dc = dcRef.value;
    if (dc) dc.professoresSelecionados = val;
  },
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Busca -->
    <UIFormTextField
      :model-value="professorSearch"
      label="Pesquisar"
      placeholder="Digite aqui."
      name="professor-search"
      @update:model-value="professorSearch = String($event ?? '')"
    />

    <!-- Lista de professores -->
    <div class="max-h-[250px] overflow-y-auto flex flex-col gap-2">
      <UICheckbox
        v-slot="{ item, selected, invertItem }"
        v-model="professoresSelecionados"
        :items="professores"
      >
        <div
          class="flex items-center gap-3 border-2 rounded-lg pr-3 mb-1 cursor-pointer transition-colors"
          :class="
            selected
              ? 'border-ldsa-green-1 bg-ldsa-green-50'
              : 'border-ldsa-grey/100'
          "
          @click.stop="invertItem(item)"
        >
          <div
            class="w-12 h-12 bg-ldsa-grey/20 rounded-md flex items-center justify-center shrink-0 overflow-hidden"
          >
            <img
              v-if="(item as Record<string, unknown>).foto"
              :src="(item as Record<string, unknown>).foto as string"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex flex-col flex-1 py-2">
            <p class="font-semibold text-sm text-ldsa-text-default">
              {{ item.label }}
            </p>
            <p
              v-if="(item as Record<string, unknown>).cargo"
              class="text-xs text-ldsa-grey/100"
            >
              {{ (item as Record<string, unknown>).cargo }}
            </p>
          </div>
          <UICheckboxSquare :item="item" :active="selected" @click.stop />
        </div>
      </UICheckbox>
    </div>
  </div>
</template>
