<script lang="ts" setup>
import { useField } from 'vee-validate';
import { Cargo } from '../../FormUtils';

const { value: vinculos } = useField<any[]>('vinculos');

const campi = useCampi();
const campiList = campi.list();
const totalCampi = computed(() => campiList.data.value?.data?.length ?? 0);

const maxVinculos = computed(
  () => totalCampi.value * Object.keys(Cargo).length
);

const usedCombinations = computed(() => {
  return new Set(
    vinculos.value
      .filter((v: any) => v.campus?.id && v.cargo)
      .map((v: any) => `${v.campus.id}::${v.cargo}`)
  );
});

const isDuplicate = (index: number) => {
  const v = vinculos.value[index];
  if (!v?.campus?.id || !v?.cargo) return false;
  const key = `${v.campus.id}::${v.cargo}`;
  return vinculos.value.some(
    (other: any, i: number) =>
      i < index && other.campus?.id && other.cargo && `${other.campus.id}::${other.cargo}` === key
  );
};

const canAddMore = computed(() => {
  const filled = vinculos.value.filter((v: any) => v.campus?.id && v.cargo).length;
  return filled < maxVinculos.value;
});

const addField = () => {
  vinculos.value = [
    ...vinculos.value,
    { campus: { id: null }, cargo: null },
  ];
};

const removeField = (targetIndex: number) => {
  if (targetIndex > 0) {
    vinculos.value = vinculos.value.filter((_: any, idx: number) => idx !== targetIndex);
  }
};
</script>

<template>
  <hr class="border border-ldsa-grey my-1" >

  <div
    v-for="(vinculo, index) in vinculos"
    :key="index"
  >
    <div class="flex gap-4 items-start">
      <VVAutocompleteAPICampus :name="`vinculos[${index}].campus.id`" />

      <VVSelectRoles
        :name="`vinculos[${index}].cargo`"
        class="w-full max-w-[10.65rem]"
      />

      <button
        v-if="index > 0"
        class="shrink-0 flex justify-center text-ldsa-red h-12 w-7 hover:bg-ldsa-red/10 rounded-sm"
        aria-label="Remover vínculo"
        type="button"
        @click="removeField(index)"
      >
        <IconsExclude class="w-5" />
      </button>
    </div>

    <p v-if="isDuplicate(index)" class="text-ldsa-red text-xs font-semibold">
      Este vínculo já existe!
    </p>
  </div>

  <button
    v-if="canAddMore"
    class="flex justify-center gap-3 border-dotted border-3 rounded-lg p-4 border-ldsa-grey hover:bg-ldsa-grey/10 transition-[background-color] text-ldsa-text-default"
    type="button"
    @click="addField"
  >
    Novo Vínculo
    <IconsAdd class="w-4" />
  </button>

  <hr class="border border-ldsa-grey my-1" >
</template>
