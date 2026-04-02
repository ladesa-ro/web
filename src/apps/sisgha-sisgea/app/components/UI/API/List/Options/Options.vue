<script lang="ts" setup>
import { useUIApiListContext } from '../Context/UIApiListContext';

defineProps<{ style?: string }>();

const { formOptions, options } = useUIApiListContext();

const isFilteredByCampus = options.filteredByCampus ?? false;

const campusContext = useCampusContext();
const campi = useCampi();
const { data: allCampiData } = campi.list();

const campusLabel = computed(() => {
  if (!isFilteredByCampus || !campusContext.value) return 'Todos os campi';
  const campus = (allCampiData.value?.data ?? []).find(
    (c: { id: string; apelido: string }) => c.id === campusContext.value,
  );
  return campus?.apelido ?? 'Todos os campi';
});

//

type Slots = { actions(): any };

defineSlots<Slots>();
</script>

<template>
  <div :class="style || 'w-full justify-between items-center flex gap-4'">
    <div
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-ldsa-grey/40 text-xs font-medium text-ldsa-text-default shrink-0"
    >
      <IconsLocate class="w-3.5 h-3.5 text-ldsa-green-2 shrink-0" />
      <span class="truncate max-w-40">{{ campusLabel }}</span>
    </div>

    <UISearchBar v-model="formOptions.search" />

    <div class="flex items-center shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
