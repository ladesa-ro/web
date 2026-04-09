<script lang="ts" setup>
import { useUIApiListContext } from '../Context/UIApiListContext';

defineProps<{ style?: string }>();

const { formOptions, options } = useUIApiListContext();

const isFilteredByCampus = options.filteredByCampus ?? false;

const campusContext = useCampusContext();
const campi = useCampi();
const { data: allCampiData } = campi.list();

const campusItems = computed(() => {
  return (allCampiData.value?.data ?? []).map(
    (c: { id: string; apelido: string }) => ({
      value: c.id,
      label: c.apelido,
    })
  );
});

const selectedCampusId = computed(() => {
  if (!isFilteredByCampus) return null;
  return campusContext.value;
});

//

type Slots = { actions(): any };

defineSlots<Slots>();
</script>

<template>
  <div :class="style || 'w-full justify-between items-center flex gap-4'">
    <div class="flex-1">
      <UISearchBar v-model="formOptions.search" />
    </div>

    <UIFormOptionFieldsAutocomplete
      :selected-option="selectedCampusId"
      :items="campusItems"
      :disabled="true"
      label="Campus"
      :placeholder="
        isFilteredByCampus ? 'Selecione um campus' : 'Todos os campi'
      "
      class="shrink-0 w-[20rem]"
    />

    <div class="flex items-center shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
