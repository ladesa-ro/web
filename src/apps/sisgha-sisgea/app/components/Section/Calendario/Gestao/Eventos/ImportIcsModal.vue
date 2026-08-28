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
      <form v-if="step === 1" class="flex flex-col gap-5" @submit.prevent="onSubmit">
        <p
          v-if="importError"
          class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-md p-3"
        >
          {{ importError }}
        </p>

        <label
          class="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-colors"
          :class="
            isDragging
              ? 'border-ldsa-green-1 bg-ldsa-green-1/10'
              : 'border-ldsa-grey/40 hover:border-ldsa-grey/70'
          "
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="onDrop"
        >
          <IconsFilePicker class="w-10 h-10 text-ldsa-grey" />
          <span v-if="fileName" class="text-sm font-medium">{{ fileName }}</span>
          <span v-else class="text-sm text-ldsa-grey">
            Arraste um arquivo .ics aqui ou clique para selecionar
          </span>
          <input
            type="file"
            accept=".ics,text/calendar"
            class="hidden"
            @change="onFilePicked"
          />
        </label>

        <VVAutocompleteAPICampus name="campus.id" label="Campus (opcional)" />
        <VVAutocompleteAPICalendarioColecao
          name="colecao.id"
          label="Coleção de destino (opcional)"
        />
      </form>

      <div v-else class="flex flex-col gap-5">
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border-2 border-ldsa-grey p-4 text-center">
            <p class="text-2xl font-semibold text-ldsa-green-1">
              {{ result?.criados ?? 0 }}
            </p>
            <p class="text-sm text-ldsa-grey">Criados</p>
          </div>
          <div class="rounded-lg border-2 border-ldsa-grey p-4 text-center">
            <p class="text-2xl font-semibold text-ldsa-grey">
              {{ result?.puladosPorUidDuplicado ?? 0 }}
            </p>
            <p class="text-sm text-ldsa-grey">Pulados (UID duplicado)</p>
          </div>
        </div>

        <div v-if="result?.rejeitados?.length" class="flex flex-col gap-2">
          <p class="text-sm font-semibold text-ldsa-red">
            {{ result.rejeitados.length }} rejeitado(s)
          </p>
          <div class="overflow-auto rounded-lg border border-ldsa-grey/40 max-h-52">
            <table class="w-full text-sm">
              <thead class="bg-ldsa-grey/10">
                <tr>
                  <th class="text-left p-2">#</th>
                  <th class="text-left p-2">UID</th>
                  <th class="text-left p-2">Motivo</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="rejeitado in result.rejeitados"
                  :key="rejeitado.index"
                  class="border-t border-ldsa-grey/20"
                >
                  <td class="p-2">{{ rejeitado.index }}</td>
                  <td class="p-2 truncate max-w-[8rem]">
                    {{ rejeitado.uid ?? '—' }}
                  </td>
                  <td class="p-2">{{ rejeitado.motivo }}</td>
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
