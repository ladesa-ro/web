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
  <hr class="border border-ldsa-grey my-1" />

  <div
    v-for="(vinculo, index) in vinculos"
    :key="index"
    :class="{ hidden: !vinculo.ativo }"
  >
    <div v-if="vinculo.ativo" class="flex gap-4 items-center">
      <VVAutocompleteAPICampus :name="`vinculos[${index}].campus.id`" />

      <VVSelectRoles
        :name="`vinculos[${index}].cargos`"
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
    class="flex justify-center gap-3 border-dotted border-3 rounded-lg p-4 border-ldsa-grey hover:bg-ldsa-grey/10 transition-[background-color]"
    type="button"
    @click="addField"
  >
    Novo Vínculo
    <IconsAdd class="w-4"/>
  </button>

  <hr class="border border-ldsa-grey my-1" />
</template>
