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

type Slots = { actions(): any };

defineSlots<Slots>();
</script>

<template>
  <div
    :class="style || 'u-w-full u-justify-between u-items-center u-flex u-gap-4'"
  >
    <div class="u-flex-1">
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
      class="u-shrink-0 api-list-options__campus-field"
    />

    <div class="u-flex u-items-center u-shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.api-list-options__campus-field {
  width: 20rem;
}
</style>
