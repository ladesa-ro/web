<script setup lang="ts">
import {
  IconsCalendarCompleteCalendar,
  IconsCalendarPartialCalendar,
} from '#components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import {
  calendarioLetivoDiaFindAll,
  calendarioLetivoDiaUpdate,
} from '@ladesa-ro/web.api.client';
import type { CalendarioLetivoDiaFindOneOutputDto } from '@ladesa-ro/web.api.client';
import type { CalendarEvent } from '~/components/Section/Calendario/Types';
import { useForm } from 'vee-validate';
import { diaEditSchema } from './-Helpers/schema';

dayjs.locale('pt-br');

const toggleItems = [
  {
    text: 'Dias não letivos do mês',
    value: 'mes',
    icon: IconsCalendarPartialCalendar,
  },
  {
    text: 'Dias não letivos do ano',
    value: 'ano',
    icon: IconsCalendarCompleteCalendar,
  },
];

const toggleView = ref('mes');
const selectedCalendarioId = ref<string | null>(null);
const currentMonth = ref(dayjs().month() + 1);
const searchQuery = ref('');

const dias = ref<CalendarioLetivoDiaFindOneOutputDto[]>([]);
const isLoadingDias = ref(false);

// Edit dialog — editingDia uses Partial because creation stubs lack server-only fields
type EditableDia = Pick<CalendarioLetivoDiaFindOneOutputDto, 'id' | 'data'>;
const editDialogOpen = ref(false);
const editingDia = ref<EditableDia | null>(null);

const { handleSubmit: handleEditSubmit, resetForm: resetEditForm } = useForm({
  validationSchema: diaEditSchema,
  initialValues: diaEditSchema.getDefault(),
});

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const api = useApiClient();

watch(selectedCalendarioId, () => {
  if (selectedCalendarioId.value) loadDias();
});

async function loadDias() {
  if (!selectedCalendarioId.value) return;
  isLoadingDias.value = true;
  try {
    const result = await api.call(calendarioLetivoDiaFindAll, {
      path: { calendarioLetivoId: selectedCalendarioId.value },
      query: { limit: 400 },
    });
    dias.value = result.data ?? [];
  } catch (e) {
    console.error('Erro ao carregar dias:', e);
  } finally {
    isLoadingDias.value = false;
  }
}

const diasNaoLetivos = computed(() => dias.value.filter(d => !d.diaLetivo));

const diasDoMes = computed(() =>
  diasNaoLetivos.value.filter(d => {
    const month = dayjs(d.data).month() + 1;
    return month === currentMonth.value;
  })
);

const diasPorMes = computed(() => {
  const grouped = new Map<number, CalendarioLetivoDiaFindOneOutputDto[]>();
  for (const dia of diasNaoLetivos.value) {
    const month = dayjs(dia.data).month() + 1;
    if (!grouped.has(month)) grouped.set(month, []);
    grouped.get(month)?.push(dia);
  }
  return grouped;
});

const filteredDiasDoMes = computed(() => {
  if (!searchQuery.value.trim()) return diasDoMes.value;
  const q = searchQuery.value.toLowerCase();
  return diasDoMes.value.filter(d =>
    (d.feriado ?? '').toLowerCase().includes(q)
  );
});

// TODO: remove Record cast after SDK regeneration includes 'cor' field in CalendarioLetivoDiaFindOneOutputDto
function getDotColor(dia: CalendarioLetivoDiaFindOneOutputDto): string {
  return ((dia as Record<string, unknown>).cor as string) ?? '#6b7280';
}

function getDiaLabel(dia: CalendarioLetivoDiaFindOneOutputDto): string {
  if (dia.feriado) return dia.feriado;
  return 'Dia não letivo';
}

function formatDate(data: string): string {
  return dayjs(data).format('DD/MM/YYYY');
}

function formatDateShort(data: string): string {
  return dayjs(data).format('ddd, D MMM');
}

function openEdit(dia: CalendarioLetivoDiaFindOneOutputDto) {
  editingDia.value = {
    id: dia.id,
    data: dia.data,
  };
  // TODO: remove Record cast after SDK regeneration includes 'cor' field
  resetEditForm({
    values: {
      feriado: dia.feriado ?? '',
      cor: ((dia as Record<string, unknown>).cor as string) ?? null,
      diaLetivo: dia.diaLetivo,
      diaPresencial: dia.diaPresencial,
      extraCurricular: dia.extraCurricular,
    } as Record<string, unknown>,
  });
  editDialogOpen.value = true;
}

function openCreateDialog() {
  if (!selectedCalendarioId.value) return;
  editingDia.value = {
    id: '',
    data: dayjs().format('YYYY-MM-DD'),
  };
  resetEditForm({
    values: diaEditSchema.getDefault(),
  });
  editDialogOpen.value = true;
}

const saveEdit = handleEditSubmit(async formValues => {
  if (!editingDia.value || !selectedCalendarioId.value) return;
  try {
    await api.call(calendarioLetivoDiaUpdate, {
      path: {
        calendarioLetivoId: selectedCalendarioId.value,
        data: editingDia.value.data,
      },
      body: {
        diaLetivo: formValues.diaLetivo,
        feriado: formValues.feriado ?? '',
        diaPresencial: formValues.diaPresencial,
        extraCurricular: formValues.extraCurricular,
      },
    });
    editDialogOpen.value = false;
    await loadDias();
  } catch (e) {
    console.error('Erro ao salvar dia:', e);
  }
});

// Year for the mini calendars (derived from the loaded data or current year)
const calendarYear = computed(() => {
  if (dias.value.length > 0) {
    const firstDia = dias.value[0];
    return firstDia ? dayjs(firstDia.data).year() : dayjs().year();
  }
  return dayjs().year();
});

// Convert dias to CalendarEvent format for mini calendars
const calendarEvents = computed((): CalendarEvent[] => {
  return dias.value.map(d => ({
    id: d.id,
    name: getDiaLabel(d),
    color: getDotColor(d),
    startDate: d.data,
    endDate: d.data,
    type: 'agendamento',
  }));
});
</script>

<template>
  <UIContainer class="flex flex-col gap-6">
    <UIBreadcrumbDapeBreadcrumb>
      <UIButtonDefaultSquare
        :disabled="!selectedCalendarioId"
        @click="openCreateDialog"
      >
        <IconsAdd class="w-6 h-full" />
      </UIButtonDefaultSquare>
    </UIBreadcrumbDapeBreadcrumb>

    <!-- Calendar selector -->
    <div class="flex flex-wrap gap-3 items-end">
      <div class="w-full sm:flex-1">
        <VVAutocompleteAPICalendarioLetivo
          v-model="selectedCalendarioId"
          name="filterCalendario"
          label="Calendário"
        />
      </div>
    </div>

    <UIToggle v-model="toggleView" :items="toggleItems" class="w-full" />

    <!-- No calendar selected -->
    <div v-if="!selectedCalendarioId" class="text-center text-ldsa-grey py-8">
      Selecione um calendário para visualizar os dias.
    </div>

    <!-- Loading -->
    <div v-else-if="isLoadingDias" class="text-center text-ldsa-grey py-8">
      Carregando dias...
    </div>

    <!-- Month view -->
    <template v-else-if="toggleView === 'mes'">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Mini calendar with navigation -->
        <div class="lg:w-[340px] shrink-0">
          <SectionCalendarioMonth
            :year="calendarYear"
            :events="calendarEvents"
            :toggle-month="true"
            :calendar-id="selectedCalendarioId ?? ''"
            :month-num="currentMonth"
          />
        </div>

        <!-- List of dias nao letivos -->
        <div class="flex-1 flex flex-col gap-3">
          <UISearchBar v-model="searchQuery" placeholder="Pesquisar dia..." />

          <div
            v-if="filteredDiasDoMes.length === 0"
            class="text-center text-ldsa-grey py-4"
          >
            Nenhum dia não letivo neste mês.
          </div>

          <div class="flex flex-col">
            <div
              v-for="dia in filteredDiasDoMes"
              :key="dia.id"
              class="flex items-center justify-between border-b border-ldsa-grey/20 py-2.5 px-2 hover:bg-ldsa-grey/5"
            >
              <div class="flex items-center gap-2">
                <span
                  class="inline-block size-2.5 rounded-full"
                  :style="{ backgroundColor: getDotColor(dia) }"
                />
                <span class="text-sm font-medium text-ldsa-text-default">{{
                  getDiaLabel(dia)
                }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-ldsa-grey">{{
                  formatDateShort(dia.data)
                }}</span>
                <button
                  class="p-1 rounded hover:bg-ldsa-grey/10 text-ldsa-grey hover:text-ldsa-green-1 transition-colors"
                  title="Editar"
                  @click="openEdit(dia)"
                >
                  <IconsEdit class="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Year view -->
    <template v-else>
      <UISearchBar v-model="searchQuery" placeholder="Pesquisar dia..." />

      <div class="flex flex-col gap-8">
        <div v-for="month in 12" :key="month">
          <template v-if="(diasPorMes.get(month) ?? []).length > 0">
            <div
              class="flex h-[13px] items-center border-l-3 border-ldsa-green-1 pl-1 mb-4"
            >
              <span
                class="text-[13px] font-semibold tracking-wide text-ldsa-text-default"
              >
                {{ MONTH_NAMES[month - 1] }}
              </span>
            </div>

            <div class="flex flex-col lg:flex-row gap-4">
              <!-- Mini calendar without navigation -->
              <div class="lg:w-[300px] shrink-0">
                <SectionCalendarioMonth
                  :year="calendarYear"
                  :events="calendarEvents"
                  :toggle-month="false"
                  :calendar-id="selectedCalendarioId ?? ''"
                  :month-num="month"
                />
              </div>

              <!-- List of dias nao letivos for this month -->
              <div class="flex-1 flex flex-col">
                <div
                  v-for="dia in diasPorMes.get(month) ?? []"
                  :key="dia.id"
                  class="flex items-center justify-between border-b border-ldsa-grey/20 py-2.5 px-2 hover:bg-ldsa-grey/5"
                >
                  <div class="flex items-center gap-2">
                    <span
                      class="inline-block size-2.5 rounded-full"
                      :style="{ backgroundColor: getDotColor(dia) }"
                    />
                    <span class="text-sm font-medium text-ldsa-text-default">{{
                      getDiaLabel(dia)
                    }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-ldsa-grey">{{
                      formatDateShort(dia.data)
                    }}</span>
                    <button
                      class="p-1 rounded hover:bg-ldsa-grey/10 text-ldsa-grey hover:text-ldsa-green-1 transition-colors"
                      title="Editar"
                      @click="openEdit(dia)"
                    >
                      <IconsEdit class="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>

    <!-- Edit Dialog -->
    <DialogSkeleton v-model="editDialogOpen">
      <DialogModalBaseLayout
        v-if="editingDia"
        title="Editar dia"
        :close-button="true"
        :on-close="
          () => {
            editDialogOpen = false;
          }
        "
      >
        <form class="flex flex-col gap-4" @submit.prevent="saveEdit">
          <VVTextField name="feriado" label="Nome" placeholder="Nome do dia" />

          <div class="flex flex-col gap-1.5">
            <span class="text-[0.813rem] font-semibold text-ldsa-grey px-1"
              >Cor</span
            >
            <VVColorPalette name="cor" />
          </div>

          <div class="text-sm text-ldsa-grey">
            Data: <strong>{{ formatDate(editingDia.data) }}</strong>
          </div>

          <VVCheckboxField name="diaLetivo" label="É dia letivo" />
          <VVCheckboxField name="diaPresencial" label="É presencial" />
          <VVCheckboxField name="extraCurricular" label="É extracurricular" />
        </form>

        <template #button-group>
          <button
            type="button"
            class="flex-1 rounded-lg border border-ldsa-grey/30 px-4 py-2 text-sm font-medium"
            @click="editDialogOpen = false"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="flex-1 rounded-lg bg-ldsa-green-1 px-4 py-2 text-sm font-medium text-white"
            @click="saveEdit"
          >
            Salvar
          </button>
        </template>
      </DialogModalBaseLayout>
    </DialogSkeleton>
  </UIContainer>
</template>
