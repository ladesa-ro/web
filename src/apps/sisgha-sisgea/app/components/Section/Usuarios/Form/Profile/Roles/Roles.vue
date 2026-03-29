<script lang="ts" setup>
import { useField } from 'vee-validate';

const { value: vinculos } = useField<any[]>('vinculos');

const addField = () => {
  vinculos.value = [
    ...vinculos.value,
    { campus: { id: null }, cargo: null },
  ];
};

const removeField = (targetIndex: number) => {
  if (targetIndex > 0) {
    vinculos.value = vinculos.value.filter((_, idx) => idx !== targetIndex);
  }
};
</script>

<template>
  <hr class="border border-ldsa-grey my-1" />

  <div
    v-for="(vinculo, index) in vinculos"
    :key="index"
  >
    <div class="flex gap-4 items-center">
      <VVAutocompleteAPICampus :name="`vinculos[${index}].campus.id`" />

      <VVSelectRoles
        :name="`vinculos[${index}].cargo`"
        class="w-full max-w-[10.65rem]"
      />

      <button
        v-if="index > 0"
        class="shrink-0 flex justify-center text-ldsa-red h-12 w-7 hover:bg-ldsa-red/10 rounded-sm"
        @click="removeField(index)"
        aria-label="Remover vínculo"
        type="button"
      >
        <IconsExclude class="w-5" />
      </button>
    </div>
  </div>

  <button
    class="flex justify-center gap-3 border-dotted border-3 rounded-lg p-4 border-ldsa-grey hover:bg-ldsa-grey/10 transition-[background-color] text-ldsa-text-default"
    type="button"
    @click="addField"
  >
    Novo Vínculo
    <IconsAdd class="w-4" />
  </button>

  <hr class="border border-ldsa-grey my-1" />
</template>
