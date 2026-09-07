<script lang="ts" setup>
import { useForm } from 'vee-validate';
import type { CalendarioAgendamentoImportarIcsOutputDto } from '@ladesa-ro/web.api.client';

const emit = defineEmits<{ imported: [] }>();

const isActive = ref(false);
const step = ref<1 | 2>(1);
const isImporting = ref(false);
const importError = ref<string | null>(null);
const result = ref<CalendarioAgendamentoImportarIcsOutputDto | null>(null);

const fileName = ref<string | null>(null);
const fileContent = ref<string | null>(null);
const isDragging = ref(false);

type IImportForm = {
  campus: { id: string | null } | null;
  colecao: { id: string | null } | null;
};

const { handleSubmit, resetForm, values } = useForm<IImportForm>({
  initialValues: { campus: { id: null }, colecao: { id: null } },
});

const agendamento = useCalendarioAgendamento();

function resetState() {
  step.value = 1;
  isImporting.value = false;
  importError.value = null;
  result.value = null;
  fileName.value = null;
  fileContent.value = null;
  isDragging.value = false;
  resetForm({ values: { campus: { id: null }, colecao: { id: null } } });
}

function onOpen() {
  resetState();
  isActive.value = true;
}

function onClose() {
  isActive.value = false;
}

function readFile(file: File) {
  if (!file.name.toLowerCase().endsWith('.ics')) {
    importError.value = 'Selecione um arquivo .ics válido.';
    return;
  }

  importError.value = null;
  fileName.value = file.name;

  const reader = new FileReader();
  reader.onload = () => {
    fileContent.value = typeof reader.result === 'string' ? reader.result : null;
  };
  reader.onerror = () => {
    importError.value = 'Não foi possível ler o arquivo selecionado.';
  };
  reader.readAsText(file);
}

function onFilePicked(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) readFile(file);
}

function onDrop(event: DragEvent) {
  isDragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) readFile(file);
}

const onSubmit = handleSubmit(async () => {
  if (!fileContent.value) {
    importError.value = 'Selecione um arquivo .ics antes de continuar.';
    return;
  }

  isImporting.value = true;
  importError.value = null;

  try {
    const campusId = values.campus?.id;
    const colecaoId = values.colecao?.id;

    result.value = (await agendamento.importarIcs({
      conteudo: fileContent.value,
      ...(campusId ? { campus: { id: campusId } } : {}),
      ...(colecaoId ? { colecao: { id: colecaoId } } : {}),
    })) as CalendarioAgendamentoImportarIcsOutputDto;

    step.value = 2;
    agendamento.invalidate();
  } catch (err) {
    importError.value =
      err instanceof Error
        ? err.message
        : 'Ocorreu um erro ao importar o arquivo.';
  } finally {
    isImporting.value = false;
  }
});

function onFinish() {
  emit('imported');
  onClose();
}
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <UIButtonDefault type="button" @click.stop.prevent="onOpen">
        Importar
      </UIButtonDefault>
    </template>

    <DialogModalBaseLayout
      :title="step === 1 ? 'Importar agenda (.ics)' : 'Resultado da importação'"
      :on-close="onClose"
    >
      <form v-if="step === 1" class="u-flex u-flex-col u-gap-5" @submit.prevent="onSubmit">
        <p
          v-if="importError"
          class="import-ics__error u-text-sm u-rounded-md u-p-3"
        >
          {{ importError }}
        </p>

        <label
          class="import-ics__dropzone u-flex u-flex-col u-items-center u-justify-center u-gap-2 u-rounded-lg u-p-8 u-text-center"
          :class="
            isDragging
              ? 'import-ics__dropzone--active'
              : 'import-ics__dropzone--inactive'
          "
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="onDrop"
        >
          <IconsFilePicker class="import-ics__dropzone-icon" />
          <span v-if="fileName" class="u-text-sm u-font-medium">{{ fileName }}</span>
          <span v-else class="import-ics__dropzone-hint u-text-sm">
            Arraste um arquivo .ics aqui ou clique para selecionar
          </span>
          <input
            type="file"
            accept=".ics,text/calendar"
            class="u-hidden"
            @change="onFilePicked"
          />
        </label>

        <VVAutocompleteAPICampus name="campus.id" label="Campus (opcional)" />
        <VVAutocompleteAPICalendarioColecao
          name="colecao.id"
          label="Coleção de destino (opcional)"
        />
      </form>

      <div v-else class="u-flex u-flex-col u-gap-5">
        <div class="import-ics__stats-grid u-grid u-gap-3">
          <div class="import-ics__stat-box u-rounded-lg u-p-4 u-text-center">
            <p class="import-ics__stat-number import-ics__stat-number--success">
              {{ result?.criados ?? 0 }}
            </p>
            <p class="import-ics__stat-label u-text-sm">Criados</p>
          </div>
          <div class="import-ics__stat-box u-rounded-lg u-p-4 u-text-center">
            <p class="import-ics__stat-number import-ics__stat-number--neutral">
              {{ result?.puladosPorUidDuplicado ?? 0 }}
            </p>
            <p class="import-ics__stat-label u-text-sm">Pulados (UID duplicado)</p>
          </div>
        </div>

        <div v-if="result?.rejeitados?.length" class="u-flex u-flex-col u-gap-2">
          <p class="import-ics__rejected-title u-text-sm u-font-semibold">
            {{ result.rejeitados.length }} rejeitado(s)
          </p>
          <div class="import-ics__rejected-table-wrap u-overflow-auto u-rounded-lg">
            <table class="u-w-full u-text-sm">
              <thead class="import-ics__table-head">
                <tr>
                  <th class="u-text-left u-p-2">#</th>
                  <th class="u-text-left u-p-2">UID</th>
                  <th class="u-text-left u-p-2">Motivo</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="rejeitado in result.rejeitados"
                  :key="rejeitado.index"
                  class="import-ics__table-row"
                >
                  <td class="u-p-2">{{ rejeitado.index }}</td>
                  <td class="import-ics__table-uid u-p-2 u-truncate">
                    {{ rejeitado.uid ?? '—' }}
                  </td>
                  <td class="u-p-2">{{ rejeitado.motivo }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <template #button-group>
        <template v-if="step === 1">
          <UIButtonModalCancel @click="onClose" />
          <UIButtonModalBaseLayout
            :text="isImporting ? 'Importando...' : 'Importar'"
            color="var(--ladesa-green-2-color)"
            type="button"
            :disabled="isImporting"
            @click="onSubmit"
          >
            <IconsConfirm />
          </UIButtonModalBaseLayout>
        </template>
        <template v-else>
          <UIButtonModalFinish @click="onFinish" />
        </template>
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>

<style scoped>
.import-ics__error {
  color: var(--ladesa-red-color);
  background-color: rgb(from var(--ladesa-red-color) R G B / 10%);
}

.import-ics__dropzone {
  border: 2px dashed transparent;
  cursor: pointer;
  transition: border-color var(--ui-duration-base) var(--ui-easing-standard);
}

.import-ics__dropzone--active {
  border-color: var(--ladesa-green-1-color);
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 10%);
}

.import-ics__dropzone--inactive {
  border-color: rgb(from var(--ladesa-grey-color) R G B / 40%);
}

.import-ics__dropzone--inactive:hover {
  border-color: rgb(from var(--ladesa-grey-color) R G B / 70%);
}

.import-ics__dropzone-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--ladesa-grey-color);
}

.import-ics__dropzone-hint {
  color: var(--ladesa-grey-color);
}

.import-ics__stats-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.import-ics__stat-box {
  border: 2px solid var(--ladesa-grey-color);
}

.import-ics__stat-number {
  font-size: 1.5rem;
  font-weight: var(--ui-font-weight-semibold);
}

.import-ics__stat-number--success {
  color: var(--ladesa-green-1-color);
}

.import-ics__stat-number--neutral {
  color: var(--ladesa-grey-color);
}

.import-ics__stat-label {
  color: var(--ladesa-grey-color);
}

.import-ics__rejected-title {
  color: var(--ladesa-red-color);
}

.import-ics__rejected-table-wrap {
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 40%);
  max-height: 13rem;
}

.import-ics__table-head {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.import-ics__table-row {
  border-top: 1px solid rgb(from var(--ladesa-grey-color) R G B / 20%);
}

.import-ics__table-uid {
  max-width: 8rem;
}
</style>
