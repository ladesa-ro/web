<script lang="ts" setup>
import { FormMode } from '~/utils/constants';

const api = useApiClient();

function getDisciplinaCoverUrl(disc: { id: string; imagemCapa?: { id: string } | null }) {
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
  { immediate: true },
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
  props.mode === FormMode.MANAGE ? 'Editar' : 'Definir',
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

    <div class="flex-1 flex flex-col gap-2.5 overflow-y-auto min-h-0">
      <div
        v-for="disc in filteredDisciplinas"
        :key="disc.id"
        class="flex items-center gap-4 border-[1.5px] border-ldsa-grey rounded-md overflow-clip cursor-pointer hover:bg-ldsa-grey/5"
        @click="toggleDisciplina(disc.id)"
      >
        <div
          class="shrink-0 w-16 bg-ldsa-grey/20 flex items-center justify-center self-stretch"
        >
          <img
            v-if="disc.imagemCapa"
            :src="getDisciplinaCoverUrl(disc) ?? undefined"
            class="w-full h-full object-cover"
            alt=""
          >
          <IconsImage v-else class="w-6 text-ldsa-grey" />
        </div>

        <div class="flex-1 flex flex-col py-3">
          <span class="text-ldsa-text-default text-sm font-semibold">
            {{ disc.nome }}
          </span>
          <span class="text-ldsa-grey text-xs font-medium">
            Carga horária: {{ disc.cargaHoraria }} horas
          </span>
        </div>

        <div class="shrink-0 pr-5">
          <div
            class="size-5 rounded-sm border-[1.5px] flex items-center justify-center transition-colors"
            :class="
              selectedIds.has(disc.id)
                ? 'bg-ldsa-green-1 border-ldsa-green-1'
                : 'border-ldsa-grey bg-transparent'
            "
          >
            <IconsConfirm
              v-if="selectedIds.has(disc.id)"
              class="w-2.5 text-white"
            />
          </div>
        </div>
      </div>

      <!-- Trigger para scroll infinito -->
      <div ref="scrollTrigger" class="h-1 shrink-0" />

      <UILoading v-if="disciplinasInfiniteQuery.isFetching.value" />

      <div
        v-if="
          filteredDisciplinas.length === 0 &&
          !disciplinasInfiniteQuery.isLoading.value
        "
        class="text-ldsa-grey text-sm text-center py-4"
      >
        Nenhuma disciplina encontrada.
      </div>
    </div>

    <template #button-group>
      <UIButtonModalGoBack class="flex-1" @click="closeModal" />
      <UIButtonModalBaseLayout
        class="flex-1"
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

<style>
.select-disciplinas-modal.modal-layout {
  max-width: 40rem !important;
  max-height: 90vh !important;
  min-width: 530px !important;
  min-height: 600px !important;
}
</style>
