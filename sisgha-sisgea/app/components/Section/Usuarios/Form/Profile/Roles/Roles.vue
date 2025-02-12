<script lang="ts" setup>
import { useField } from 'vee-validate';

const { value: vinculos } = useField<any[]>('vinculos');

const addField = () => {
  // spread operator
  // rest operator
  vinculos.value = [
    ...vinculos.value,
    { campus: { id: null }, ativo: true, cargos: [] },
  ];
};

const removeField = (targetIndex: number) => {
  if (targetIndex > 0) {
    vinculos.value = vinculos.value.map((vinculo, idx) => {
      if (idx === targetIndex) {
        return {
          ...vinculo,
          ativo: false,
          cargos: [],
          campus: vinculo.campus,
        };
      }

      return vinculo;
    });
  }
};
</script>

<template>
  <v-divider :thickness="2" color="success" opacity="1" />

  <div v-for="(vinculo, index) in vinculos" :key="index">
    <div v-show="vinculo.ativo" class="flex gap-5 items-start">
      <VVAutocompleteAPICampus :name="`vinculos[${index}].campus.id`" />

      <VVSelectRoles
        :name="`vinculos[${index}].cargos`"
        class="w-full max-w-[10.65rem]"
      />

      <v-btn
        v-if="index > 0"
        class="my-[0.625rem]"
        density="compact"
        icon="mdi-delete"
        variant="flat"
        @click="removeField(index)"
      />
    </div>
  </div>

  <button
    class="border-dotted border-[3px] rounded-lg p-4 border-ldsa-grey hover:bg-ldsa-green-1/10 ease-in"
    type="button"
    @click="addField"
  >
    Novo Vínculo
  </button>
  <v-divider :thickness="2" color="success" opacity="1" />
</template>
