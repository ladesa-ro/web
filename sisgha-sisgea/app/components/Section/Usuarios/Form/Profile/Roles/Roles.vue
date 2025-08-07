<script lang="ts" setup>
import { useField } from 'vee-validate';

const { value: vinculos } = useField<any[]>('vinculos');

const addField = () => {
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
  <!-- Substituindo v-divider por hr estilizado -->
  <hr class="border-t-2 border-success border-ldsa-green-1 opacity-100 my-1" />

  <div v-for="(vinculo, index) in vinculos" :key="index">
    <div v-show="vinculo.ativo" class="flex gap-5 items-start">
      <VVAutocompleteAPICampus :name="`vinculos[${index}].campus.id`" />

      <VVSelectRoles
        :name="`vinculos[${index}].cargos`"
        class="w-full max-w-[10.65rem]"
      />

      <button
        v-if="index > 0"
        class="my-[0.625rem] text-red-600 hover:text-red-800"
        @click="removeField(index)"
        aria-label="Remover vínculo"
        type="button"
      >
        <i class="mdi mdi-delete text-xl"></i>
      </button>
    </div>
  </div>

  <button
    class="border-dotted border-[3px] rounded-lg p-4 border-ldsa-grey hover:bg-ldsa-green-1/10 ease-in"
    type="button"
    @click="addField"
  >
    Novo Vínculo
  </button>

  <hr class="border-t-2 border-success border-ldsa-green-1 opacity-100 my-1" />
</template>
