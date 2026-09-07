<script lang="ts" setup>
import { useApiContext } from '~/composables/api-context/setup';

const { moreThanOneCampus, campiList: userCampiList } = useUserCargoAndCampi();
const { usuario } = useApiContext();

const isSuperUser = computed(() => usuario.value?.isSuperUser ?? false);

const campi = useCampi();
const { data: allCampiData } = campi.list();

const toggleCampusItems = computed(() => {
  if (isSuperUser.value) {
    return (allCampiData.value?.data ?? []).map(campus => ({
      label: campus.apelido,
      value: campus.id,
    }));
  }
  return userCampiList.map(campus => ({
    label: campus.apelido,
    value: campus.id,
  }));
});

const showSelector = computed(() => {
  if (isSuperUser.value) {
    return (allCampiData.value?.data ?? []).length > 1;
  }
  return moreThanOneCampus;
});

const selectedCampusGlobalState = useCampusContext();

const selectedCampusLabel = computed(
  () =>
    toggleCampusItems.value.find(
      c => c.value === selectedCampusGlobalState.value
    )?.label ?? 'Carregando...'
);

const selectedCampus = ref(
  selectedCampusGlobalState.value ?? toggleCampusItems.value[0]?.value ?? null
);

// Auto-select first campus when items become available
watch(
  toggleCampusItems,
  items => {
    if (items.length > 0 && !selectedCampusGlobalState.value) {
      const first = items[0]!.value;
      selectedCampus.value = first;
      selectedCampusGlobalState.value = first;
    }
  },
  { immediate: true }
);

//

const cargos = useCampusContextCargos();

const route = useRoute();
const router = useRouter();

const verifyCargo = () => {
  if (isSuperUser.value) return;

  if (cargos.value.length > 1 || route.path.includes('sisgea')) {
    return;
  }

  if (cargos.value[0] === 'dape') {
    router.push('/sisgha/dape/');
  } else if (cargos.value[0] === 'professor') {
    router.push('/sisgha/professor/');
  }
};

const removeGuard = router.beforeEach(to => {
  if (!to.path.includes('sisgea')) {
    verifyCargo();
  }
});

onBeforeUnmount(() => {
  removeGuard();
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
  <ClientOnly>
    <!-- Always show campus name; popover only when multiple options -->
    <UIPopover v-if="showSelector" v-model="open">
      <template #activator>
        <div
          class="u-items-center u-font-medium u-mr-3 u-truncate u-p-1 u-rounded-sm campus-badge campus-badge--clickable"
        >
          <IconsLocate class="u-mr-1 u-shrink-0 campus-badge-marker-icon" />
          <span class="u-truncate">{{ selectedCampusLabel }}</span>
        </div>

        <div class="u-p-2-5 u-shrink-0 campus-badge-icon-wrap">
          <IconsLocate class="campus-badge-toggle-icon" />
        </div>
      </template>

      <div
        class="u-flex u-flex-col u-rounded-lg u-p-4 u-mt-2 campus-popover-panel"
      >
        <UITitle variant="mini" text="Alternar campus" class="u-mb-4" />

        <UIRadio
          v-slot="{ item, selected }"
          v-model="selectedCampus"
          :items="toggleCampusItems"
        >
          <button
            :class="[
              'u-flex u-items-center u-text-left u-gap-2 u-p-1-5 u-w-full u-text-sm u-font-medium u-rounded-lg u-mb-2 campus-radio-btn',
              selected
                ? 'campus-radio-btn--selected'
                : 'campus-radio-btn--unselected',
            ]"
          >
            <UIRadioCircle
              class="u-shrink-0 campus-radio-circle"
              :item-value="item.value"
              :is-selected="selected"
            />

            {{ item.label }}
          </button>
        </UIRadio>

        <span class="u-mt-2 u-flex u-justify-between u-gap-2 campus-actions-row">
          <UIButtonModalCancel variant="small" @click="open = false" />

          <UIButtonModalConfirm
            :disabled="selectedCampusGlobalState === selectedCampus"
            variant="small"
            @click="changeCampus()"
          />
        </span>
      </div>
    </UIPopover>

    <!-- Read-only display when only 1 campus (no selector needed) -->
    <div
      v-else-if="selectedCampusLabel !== 'Carregando...'"
      class="u-items-center u-font-medium u-mr-3 u-truncate u-p-1 u-rounded-sm campus-badge"
    >
      <IconsLocate class="u-mr-1 u-shrink-0 campus-badge-marker-icon" />
      <span class="u-truncate">{{ selectedCampusLabel }}</span>
    </div>

    <template #fallback>
      <div
        class="u-items-center u-font-medium u-mr-3 u-truncate u-p-1 u-rounded-sm campus-badge"
      >
        <IconsLocate class="u-mr-1 u-shrink-0 campus-badge-marker-icon" />
        <span class="u-truncate campus-skeleton" />
      </div>
    </template>
  </ClientOnly>
</template>

<style scoped>
.campus-badge {
  font-size: 0.6875rem;
  color: var(--ladesa-text-default-color);
  max-width: 100%;
  min-width: 3rem;
  border: 2px solid var(--ladesa-grey-color);
  display: flex;
}

.campus-badge--clickable {
  cursor: pointer;
}

@media (max-width: 46.2rem) {
  .campus-badge {
    display: none;
  }
}

@media (min-width: 1024px) {
  .campus-badge {
    max-width: 20rem;
  }
}

.campus-badge-marker-icon {
  color: var(--ladesa-text-green-color);
}

.campus-badge-icon-wrap {
  display: block;
}

@media (min-width: 46.2rem) {
  .campus-badge-icon-wrap {
    display: none;
  }
}

.campus-badge-toggle-icon {
  width: 1.125rem;
}

.campus-popover-panel {
  border: 2px solid var(--ladesa-grey-color);
  background-color: var(--ladesa-background-color);
}

.campus-radio-btn {
  border-width: 2px;
  border-style: solid;
  min-width: 12rem;
}

@media (max-width: 21.8rem) {
  .campus-radio-btn {
    min-width: 6rem;
    max-width: 80vw;
  }
}

@media (min-width: 21.8rem) {
  .campus-radio-btn {
    max-width: 18rem;
  }
}

@media (min-width: 640px) {
  .campus-radio-btn {
    min-width: 16rem;
    max-width: 20rem;
  }
}

.campus-radio-btn--selected {
  background-color: rgb(from var(--ladesa-green-2-color) R G B / 10%);
  border-color: rgb(from var(--ladesa-green-2-color) R G B / 60%);
  color: var(--ladesa-text-green-color);
}

.campus-radio-btn--unselected {
  border-color: rgb(from var(--ladesa-grey-color) R G B / 75%);
}

.campus-radio-circle {
  transform: scale(0.6);
}

.campus-actions-row {
  flex-direction: row;
}

@media (max-width: 21.8rem) {
  .campus-actions-row {
    flex-direction: column;
  }
}

.campus-skeleton {
  display: inline-block;
  height: 0.75rem;
  width: 5rem;
  border-radius: var(--ui-radius-sm);
  background-color: rgb(from var(--ladesa-grey-color) R G B / 20%);
  animation: campus-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes campus-skeleton-pulse {
  50% {
    opacity: 0.5;
  }
}
</style>
