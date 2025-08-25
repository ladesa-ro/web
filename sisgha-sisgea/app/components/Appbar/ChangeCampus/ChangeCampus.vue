<script lang="ts" setup>
const open = ref(false);

const { moreThanOneCampus, campiPorCargo, campiList } = useUserCargoAndCampi();

const toggleCampusItems = campiList.map(campus => ({
  label: campus.apelido,
  value: campus.id,
}));

const selectedCampus = useSelectedCampusContext();
selectedCampus.value = toggleCampusItems[0]?.value ?? null;
</script>

<template>
  <UIPopover v-model="open" v-if="moreThanOneCampus">
    <template #activator>
      <div
        class="flex items-center text-[11px] font-medium text-ldsa-text-default mr-3 truncate max-w-full lg:max-w-80 min-w-12 border-2 border-ldsa-grey rounded p-1 max-[740px]:hidden"
      >
        <IconsLocate class="mr-1 text-ldsa-text-green shrink-0" />
        <span class="truncate">{{
          toggleCampusItems.find(campus => campus.value === selectedCampus)
            ?.label ?? ''
        }}</span>
      </div>

      <div class="p-2.5 min-[740px]:hidden shrink-0">
        <IconsLocate class="w-4.5" />
      </div>
    </template>

    <div
      class="flex flex-col border-2 border-ldsa-grey rounded-lg p-4 bg-ldsa-bg mt-2"
    >
      <UITitle variant="mini" text="Alternar campus" class="mb-4" />

      <UIRadio
        v-model="selectedCampus"
        :items="toggleCampusItems"
        v-slot="{ item, selected }"
      >
        <button
          :class="[
            'flex items-center text-left gap-2 p-1.5 w-full max-[350px]:min-w-24 min-w-48 sm:min-w-3xs max-[350px]:max-w-[80vw] min-[350px]:max-w-2xs sm:max-w-xs text-sm font-medium border-2 rounded-lg mb-2',
            selected &&
              'bg-ldsa-green-2/10 border-ldsa-green-2/60 text-ldsa-text-green',
            !selected && 'border-ldsa-grey/75',
          ]"
        >
          <UIRadioCircle
            class="scale-60 shrink-0"
            :item-value="item.value"
            :is-selected="selected"
          />

          {{ item.label }}
        </button>
      </UIRadio>

      <span class="mt-2 flex max-[350px]:flex-col justify-between gap-2">
        <UIButtonModalCancel variant="small" @click="open = false" />

        <UIButtonModalCommonButtonsGreenWithCheck
          variant="small"
          text="Confirmar"
        />
      </span>
    </div>
  </UIPopover>
</template>
