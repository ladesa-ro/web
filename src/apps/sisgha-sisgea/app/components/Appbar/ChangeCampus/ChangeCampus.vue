<script lang="ts" setup>
const { moreThanOneCampus, campiList } = useUserCargoAndCampi();

const toggleCampusItems = campiList.map(campus => ({
  label: campus.apelido,
  value: campus.id,
}));

const selectedCampusGlobalState = useCampusContext();

const selectedCampus = ref(
  selectedCampusGlobalState.value ?? toggleCampusItems[0]?.value ?? null
);

onMounted(() => {
  if (selectedCampusGlobalState.value === null) {
    selectedCampusGlobalState.value = selectedCampus.value;
  }
});

//

const cargos = useCampusContextCargos();

const route = useRoute();
const router = useRouter();

const verifyCargo = () => {
  if (cargos.value.length > 1 || route.path.includes('sisgea')) {
    return;
  }

  if (cargos.value[0] === 'dape') {
    router.push('/sisgha/dape/');
  } else if (cargos.value[0] === 'professor') {
    router.push('/sisgha/professor/');
  }
};

onBeforeRouteUpdate(to => {
  if (!to.path.includes('sisgea')) {
    verifyCargo();
  }
});

//

const changeCampus = () => {
  selectedCampusGlobalState.value = selectedCampus.value;
  verifyCargo();
  open.value = false;
};

//

const open = ref(false);
</script>

<template>
  <UIPopover v-model="open" v-if="moreThanOneCampus">
    <template #activator>
      <div
        class="flex items-center text-[0.6875rem] font-medium text-ldsa-text-default mr-3 truncate max-w-full lg:max-w-80 min-w-12 border-2 border-ldsa-grey rounded p-1 max-[46.2rem]:hidden"
      >
        <IconsLocate class="mr-1 text-ldsa-text-green shrink-0" />
        <span class="truncate">{{
          toggleCampusItems.find(
            campus => campus.value === selectedCampusGlobalState
          )?.label ?? 'Carregando...'
        }}</span>
      </div>

      <div class="p-2.5 min-[46.2rem]:hidden shrink-0">
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
            'flex items-center text-left gap-2 p-1.5 w-full max-[21.8rem]:min-w-24 min-w-48 sm:min-w-3xs max-[21.8rem]:max-w-[80vw] min-[21.8rem]:max-w-2xs sm:max-w-xs text-sm font-medium border-2 rounded-lg mb-2',
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

      <span class="mt-2 flex max-[21.8rem]:flex-col justify-between gap-2">
        <UIButtonModalCancel variant="small" @click="open = false" />

        <UIButtonModalConfirm
          @click="changeCampus()"
          :disabled="selectedCampusGlobalState === selectedCampus"
          variant="small"
        />
      </span>
    </div>
  </UIPopover>
</template>
