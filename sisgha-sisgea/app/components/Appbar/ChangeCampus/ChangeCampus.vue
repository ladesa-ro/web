<script lang="ts" setup>
import { useApiContext } from '~/components/API/Context/setup-context';
const {
  resumoVinculos: {
    value: { mapaCargoCampi: apiCargoCampi },
  },
} = useApiContext();

const arrCargosCampi: any[][] = [];

Object.entries(apiCargoCampi).forEach(([cargoName, cargoCampi]) => {
  arrCargosCampi.push([cargoName, cargoCampi.map(campus => campus.id)]);
});

const getUserCampi = () => {
  let moreThanOneCargo = false;
  let moreThanOneCampus = false;

  if (arrCargosCampi.length > 1) {
    moreThanOneCargo = true;
  }

  const campiCargo1 = arrCargosCampi[0]?.slice(1)[0] ?? [];
  const campiCargo2 = arrCargosCampi[1]?.slice(1)[0] ?? [];

  if (
    (campiCargo1.length > 1 || campiCargo2.length > 1) &&
    campiCargo1.length !== 0 &&
    campiCargo2.length !== 0
  ) {
    moreThanOneCampus = true;
  } else {
    // ainda precisa verificar se os 2 campi (1 para cada cargo) sao diferentes ou iguais

    const campi1set = new Set(campiCargo1);
    const campi2set = new Set(campiCargo2);

    if (campi1set.difference(campi2set).size > 0) {
      moreThanOneCampus = true;
    }
  }

  const cargoCampiObj = Object.fromEntries(arrCargosCampi);
  return { cargoCampiObj, moreThanOneCargo, moreThanOneCampus };
};

// if more than one campus -> habilitar a mudanca de campus

// if more than one cargo -> habilitar a mudanca de cargo prof e dape
const open = ref(false);
</script>

<template>
  <UIPopover v-model="open" v-if="!getUserCampi().moreThanOneCampus">
    <template #activator>
      <div
        class="flex items-center text-[11px] font-medium text-ldsa-text-default mr-3 truncate max-w-full lg:max-w-80 min-w-12 border-2 border-ldsa-grey rounded p-1 max-[740px]:hidden cursor-pointer"
      >
        <IconsLocate class="mr-1 text-ldsa-text-green shrink-0" />
        <span class="truncate">IFSP - Campus Pindamonhangaba</span>
      </div>

      <div class="p-2.5 min-[740px]:hidden cursor-pointer shrink-0">
        <IconsLocate class="w-4.5" />
      </div>
    </template>

    <div
      class="flex flex-col gap-4 border-2 border-ldsa-grey rounded-lg p-4 bg-ldsa-bg mt-2"
    >
      <h1 class="text-center font-semibold">Alternar campus</h1>

      <UIRadio
        :items="[
          { label: 'IFRO - Campus Ji-Paraná', value: 'fldaseisd' },
          { label: 'IFRO - Campus Cacoal', value: 'fldaseisd22222222222222' },
        ]"
        v-slot="{ item, selected }"
      >
        <button
          :class="[
            'flex items-center text-left gap-2 p-2 w-full max-[350px]:min-w-24 min-w-48 sm:min-w-3xs max-[350px]:max-w-[80vw]  min-[350px]:max-w-2xs sm:max-w-xs  text-sm font-medium',
            selected && 'bg-ldsa-green-2/10 rounded-lg',
          ]"
        >
        <UIRadioCircle
          class="scale-85 shrink-0"
          :item-value="item.value"
          :is-selected="selected"
        />

          {{ item.label }}

        </button>
      </UIRadio>

      <span class="flex max-[350px]:flex-col justify-between gap-2">
        <UIButtonModalCancel variant="small" @click="open = false" />

        <UIButtonModalCommonButtonsGreenWithCheck
          variant="small"
          text="Confirmar"
        />
      </span>
    </div>
  </UIPopover>
</template>
