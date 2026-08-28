<script lang="ts" setup>
import type { ExportarIcsQuery } from '~/composables/ladesa-api/useCalendarioConsultas';

const props = defineProps<{
  dateStart: string;
  dateEnd: string;
  campus?: string | null;
  turma?: string | null;
  professor?: string | null;
  tipo?: string | null;
}>();

const isActive = ref(false);
const dateStart = ref(props.dateStart);
const dateEnd = ref(props.dateEnd);
const isDownloading = ref(false);
const downloadError = ref<string | null>(null);
const linkCopied = ref(false);

const consultas = useCalendarioConsultas();
const { success: toastSuccess, error: toastError } = useToast();

function buildQuery(): ExportarIcsQuery {
  const query: ExportarIcsQuery = {
    dateStart: dateStart.value,
    dateEnd: dateEnd.value,
  };
  if (props.campus) query.campus = props.campus;
  if (props.turma) query.turma = props.turma;
  if (props.professor) query.professor = props.professor;
  if (props.tipo) query.tipo = props.tipo;
  return query;
}

function onOpen() {
  dateStart.value = props.dateStart;
  dateEnd.value = props.dateEnd;
  downloadError.value = null;
  linkCopied.value = false;
  isActive.value = true;
}

function onClose() {
  isActive.value = false;
}

async function onDownload() {
  isDownloading.value = true;
  downloadError.value = null;

  try {
    const conteudo = await consultas.exportarIcsBaixar(buildQuery());
    const blob = new Blob([conteudo], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'agenda.ics';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    toastSuccess({ title: 'Agenda exportada com sucesso' });
  } catch (err) {
    downloadError.value =
      err instanceof Error ? err.message : 'Não foi possível exportar a agenda.';
  } finally {
    isDownloading.value = false;
  }
}

async function onCopyLink() {
  const url = consultas.exportarIcsUrl(buildQuery());
  try {
    await navigator.clipboard.writeText(url);
    linkCopied.value = true;
    toastSuccess({ title: 'Link da agenda copiado' });
    setTimeout(() => (linkCopied.value = false), 3000);
  } catch {
    toastError({ title: 'Não foi possível copiar o link' });
  }
}
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <UIButtonDefault type="button" @click.stop.prevent="onOpen">
        Exportar
      </UIButtonDefault>
    </template>

    <DialogModalBaseLayout title="Exportar agenda (.ics)" :on-close="onClose">
      <div class="flex flex-col gap-5">
        <p
          v-if="downloadError"
          class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-md p-3"
        >
          {{ downloadError }}
        </p>

        <div class="flex items-end gap-2">
          <div class="flex-1">
            <UIFormTextField
              v-model="dateStart"
              type="date"
              name="exportDateStart"
              label="Período início"
            />
          </div>
          <span class="pb-2 text-ldsa-grey">—</span>
          <div class="flex-1">
            <UIFormTextField
              v-model="dateEnd"
              type="date"
              name="exportDateEnd"
              label="Período fim"
            />
          </div>
        </div>

        <p class="text-xs text-ldsa-grey">
          "Copiar link da agenda" gera uma URL que pode ser colada no Google
          Calendar ou Outlook como assinatura de agenda.
        </p>
      </div>

      <template #button-group>
        <UIButtonDefault type="button" :disabled="isDownloading" @click="onCopyLink">
          {{ linkCopied ? 'Link copiado!' : 'Copiar link da agenda' }}
        </UIButtonDefault>
        <UIButtonDefault type="button" :disabled="isDownloading" @click="onDownload">
          {{ isDownloading ? 'Baixando...' : 'Baixar .ics' }}
        </UIButtonDefault>
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>
