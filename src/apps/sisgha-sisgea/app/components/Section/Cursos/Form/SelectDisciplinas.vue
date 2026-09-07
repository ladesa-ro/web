<script lang="ts" setup>
import { FormMode } from '~/utils/constants';

const api = useApiClient();

function getDisciplinaCoverUrl(disc: {
  id: string;
  imagemCapa?: { id: string } | null;
}) {
  if (!disc.imagemCapa) return null;
  return `${api.baseUrl}/disciplinas/${disc.id}/imagem/capa?imgCapa=${disc.imagemCapa.id}`;
}

const props = defineProps<{
  numeroPeriodo: number;
  formacaoNome: string;
  selectedDisciplinaIds: Set<string>;
  mode: FormMode;
}>();

const emit = defineEmits<{
  confirm: [disciplinaIds: Set<string>];
  back: [];
}>();

// Query compartilhada via inject
const periodos = useInjectCursoPeriodos();
const { disciplinasInfiniteQuery, disciplinasList } = periodos;

const searchText = ref('');
const selectedIds = ref(new Set<string>());

watch(
  () => props.selectedDisciplinaIds,
  ids => {
    selectedIds.value = new Set(ids);
  },
  { immediate: true }
);

const filteredDisciplinas = computed(() => {
  const items = disciplinasList.value;
  if (!searchText.value.trim()) return items;
  const term = searchText.value.toLowerCase();
  return items.filter(d => d.nome?.toLowerCase().includes(term));
});

const toggleDisciplina = (id: string) => {
  const copy = new Set(selectedIds.value);
  if (copy.has(id)) {
    copy.delete(id);
  } else {
    copy.add(id);
  }
  selectedIds.value = copy;
};

function closeModal() {
  emit('back');
}

function confirmSelection() {
  emit('confirm', selectedIds.value);
}

// Scroll infinito com cleanup
const scrollTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!scrollTrigger.value) return;

  observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    if (
      entry?.isIntersecting &&
      disciplinasInfiniteQuery.hasNextPage.value &&
      !disciplinasInfiniteQuery.isFetchingNextPage.value
    ) {
      disciplinasInfiniteQuery.fetchNextPage();
    }
  });

  observer.observe(scrollTrigger.value);
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
});

const titleVerb = computed(() =>
  props.mode === FormMode.MANAGE ? 'Editar' : 'Definir'
);
</script>

<template>
  <DialogModalBaseLayout
    :on-close="closeModal"
    :title="`${titleVerb} disciplinas de Período ${numeroPeriodo}`"
    class="select-disciplinas-modal"
  >
    <UIFormTextField
      name="formacaoInfo"
      label="Formação"
      :model-value="formacaoNome || 'Não selecionada'"
      disabled
    />

    <UISearchBar v-model="searchText" />

    <div class="u-flex-1 u-flex u-flex-col u-gap-2-5 select-disciplinas__list">
      <div
        v-for="disc in filteredDisciplinas"
        :key="disc.id"
        class="u-flex u-items-center u-gap-4 u-rounded-md select-disciplinas__item"
        @click="toggleDisciplina(disc.id)"
      >
        <div
          class="u-shrink-0 u-flex u-items-center u-justify-center select-disciplinas__thumb"
        >
          <img
            v-if="disc.imagemCapa"
            :src="getDisciplinaCoverUrl(disc) ?? undefined"
            class="u-w-full u-h-full select-disciplinas__thumb-img"
            alt=""
          />
          <IconsImage v-else class="select-disciplinas__thumb-icon" />
        </div>

        <div class="u-flex-1 u-flex u-flex-col select-disciplinas__info">
          <span class="u-text-sm u-font-semibold select-disciplinas__nome">
            {{ disc.nome }}
          </span>
          <span class="u-text-xs u-font-medium select-disciplinas__carga">
            Carga horária: {{ disc.cargaHoraria }} horas
          </span>
        </div>

        <div class="u-shrink-0 u-pr-5">
          <div
            class="u-flex u-items-center u-justify-center u-rounded-sm select-disciplinas__check"
            :class="{
              'select-disciplinas__check--selected': selectedIds.has(disc.id),
            }"
          >
            <IconsConfirm
              v-if="selectedIds.has(disc.id)"
              class="select-disciplinas__check-icon"
            />
          </div>
        </div>
      </div>

      <!-- Trigger para scroll infinito -->
      <div ref="scrollTrigger" class="u-shrink-0 select-disciplinas__trigger" />

      <UILoading v-if="disciplinasInfiniteQuery.isFetching.value" />

      <div
        v-if="
          filteredDisciplinas.length === 0 &&
          !disciplinasInfiniteQuery.isLoading.value
        "
        class="u-text-sm u-text-center u-py-4 select-disciplinas__empty"
      >
        Nenhuma disciplina encontrada.
      </div>
    </div>

    <template #button-group>
      <UIButtonModalGoBack @click="closeModal" />
      <UIButtonModalBaseLayout
        text="Confirmar escolha"
        color="var(--ladesa-green-2-color)"
        type="button"
        @click="confirmSelection"
      >
        <IconsConfirm />
      </UIButtonModalBaseLayout>
    </template>
  </DialogModalBaseLayout>
</template>

<style scoped>
.select-disciplinas__list {
  overflow-y: auto;
  min-height: 0;
}

.select-disciplinas__item {
  border: 1.5px solid var(--ladesa-grey-color);
  overflow: clip;
  cursor: pointer;
}

.select-disciplinas__item:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 5%);
}

.select-disciplinas__thumb {
  width: 4rem;
  align-self: stretch;
  background-color: rgb(from var(--ladesa-grey-color) R G B / 20%);
}

.select-disciplinas__thumb-img {
  object-fit: cover;
}

.select-disciplinas__thumb-icon {
  width: var(--ui-space-6);
  color: var(--ladesa-grey-color);
}

.select-disciplinas__info {
  padding-block: var(--ui-space-3);
}

.select-disciplinas__nome {
  color: var(--ladesa-text-default-color);
}

.select-disciplinas__carga {
  color: var(--ladesa-grey-color);
}

.select-disciplinas__check {
  width: var(--ui-space-5);
  height: var(--ui-space-5);
  border: 1.5px solid var(--ladesa-grey-color);
  background-color: transparent;
  transition:
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    border-color var(--ui-duration-base) var(--ui-easing-standard);
}

.select-disciplinas__check--selected {
  background-color: var(--ladesa-green-1-color);
  border-color: var(--ladesa-green-1-color);
}

.select-disciplinas__check-icon {
  width: var(--ui-space-2-5);
  color: var(--ladesa-white-color);
}

.select-disciplinas__trigger {
  height: var(--ui-space-1);
}

.select-disciplinas__empty {
  color: var(--ladesa-grey-color);
}
</style>

<style>
.select-disciplinas-modal.modal-layout {
  max-width: 40rem !important;
  max-height: 90vh !important;
  min-width: 530px !important;
  min-height: 600px !important;
}
</style>
