<script setup lang="ts">
import {
  IconsCalendarCompleteCalendar,
  IconsCalendarPartialCalendar,
} from '#components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { calendarioLetivoDiaFindAll } from '@ladesa-ro/web.api.client';
import type { CalendarioLetivoDiaFindOneOutputDto } from '@ladesa-ro/web.api.client';
import type { CalendarEvent } from '~/components/Section/Calendario/Types';
import DiaListItem from './DiaListItem.vue';
import DiaEditDialog from './DiaEditDialog.vue';

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

type EditableDia = Pick<CalendarioLetivoDiaFindOneOutputDto, 'id' | 'data'>;
const editDialogOpen = ref(false);
const editingDia = ref<EditableDia | null>(null);
const editDialogRef = ref<InstanceType<typeof DiaEditDialog> | null>(null);

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

const calendarYear = computed(() => {
  if (dias.value.length > 0) {
    const firstDia = dias.value[0];
    return firstDia ? dayjs(firstDia.data).year() : dayjs().year();
  }
  return dayjs().year();
});

const calendarEvents = computed((): CalendarEvent[] => {
  return dias.value.map(d => ({
    id: d.id,
    name: d.feriado || 'Dia não letivo',
    color: ((d as Record<string, unknown>).cor as string) ?? '#6b7280',
    startDate: d.data,
    endDate: d.data,
    type: 'agendamento',
  }));
});

function openEdit(dia: CalendarioLetivoDiaFindOneOutputDto) {
  editingDia.value = { id: dia.id, data: dia.data };
  editDialogRef.value?.resetForEdit(dia);
  editDialogOpen.value = true;
}

function openCreateDialog() {
  if (!selectedCalendarioId.value) return;
  editingDia.value = { id: '', data: dayjs().format('YYYY-MM-DD') };
  editDialogRef.value?.resetForCreate();
  editDialogOpen.value = true;
}

async function onDialogSaved() {
  await loadDias();
}
</script>

<template>
  <UIContainer class="u-flex u-flex-col u-gap-6">
    <UIBreadcrumbDapeBreadcrumb>
      <UIButtonDefaultSquare
        :disabled="!selectedCalendarioId"
        @click="openCreateDialog"
      >
        <IconsAdd class="dias-nao-letivos__add-icon u-h-full" />
      </UIButtonDefaultSquare>
    </UIBreadcrumbDapeBreadcrumb>

    <div class="u-flex u-flex-wrap u-gap-3 u-items-end">
      <div class="dias-nao-letivos__calendar-field u-w-full">
        <VVAutocompleteAPICalendarioLetivo
          v-model="selectedCalendarioId"
          name="filterCalendario"
          label="Calendário"
        />
      </div>
    </div>

    <UIToggle v-model="toggleView" :items="toggleItems" class="u-w-full" />

    <div
      v-if="!selectedCalendarioId"
      class="dias-nao-letivos__message u-text-center u-py-8"
    >
      Selecione um calendário para visualizar os dias.
    </div>

    <div
      v-else-if="isLoadingDias"
      class="dias-nao-letivos__message u-text-center u-py-8"
    >
      Carregando dias...
    </div>

    <template v-else-if="toggleView === 'mes'">
      <div class="dias-nao-letivos__responsive-row u-flex u-flex-col u-gap-6">
        <div class="dias-nao-letivos__month-col u-shrink-0">
          <SectionCalendarioMonth
            :year="calendarYear"
            :events="calendarEvents"
            :toggle-month="true"
            :calendar-id="selectedCalendarioId ?? ''"
            :month-num="currentMonth"
          />
        </div>

        <div class="u-flex-1 u-flex u-flex-col u-gap-3">
          <UISearchBar v-model="searchQuery" placeholder="Pesquisar dia..." />

          <div
            v-if="filteredDiasDoMes.length === 0"
            class="dias-nao-letivos__message u-text-center u-py-4"
          >
            Nenhum dia não letivo neste mês.
          </div>

          <div class="u-flex u-flex-col">
            <DiaListItem
              v-for="dia in filteredDiasDoMes"
              :key="dia.id"
              :dia="dia"
              @edit="openEdit"
            />
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <UISearchBar v-model="searchQuery" placeholder="Pesquisar dia..." />

      <div class="u-flex u-flex-col u-gap-8">
        <div v-for="month in 12" :key="month">
          <template v-if="(diasPorMes.get(month) ?? []).length > 0">
            <div
              class="dias-nao-letivos__month-header u-flex u-items-center u-pl-1 u-mb-4"
            >
              <span class="dias-nao-letivos__month-header-text u-font-semibold">
                {{ MONTH_NAMES[month - 1] }}
              </span>
            </div>

            <div
              class="dias-nao-letivos__responsive-row u-flex u-flex-col u-gap-4"
            >
              <div class="dias-nao-letivos__month-col-year u-shrink-0">
                <SectionCalendarioMonth
                  :year="calendarYear"
                  :events="calendarEvents"
                  :toggle-month="false"
                  :calendar-id="selectedCalendarioId ?? ''"
                  :month-num="month"
                />
              </div>

              <div class="u-flex-1 u-flex u-flex-col">
                <DiaListItem
                  v-for="dia in diasPorMes.get(month) ?? []"
                  :key="dia.id"
                  :dia="dia"
                  @edit="openEdit"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>

    <DiaEditDialog
      ref="editDialogRef"
      v-model="editDialogOpen"
      :calendario-id="selectedCalendarioId"
      :dia="editingDia"
      @saved="onDialogSaved"
    />
  </UIContainer>
</template>

<style scoped>
.dias-nao-letivos__add-icon {
  width: 1.5rem;
}

@media (min-width: 640px) {
  .dias-nao-letivos__calendar-field {
    width: auto;
    flex: 1 1 0%;
  }
}

.dias-nao-letivos__message {
  color: var(--ladesa-grey-color);
}

.dias-nao-letivos__month-col {
  flex-shrink: 0;
}

.dias-nao-letivos__month-col-year {
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .dias-nao-letivos__responsive-row {
    flex-direction: row;
  }

  .dias-nao-letivos__month-col {
    width: 340px;
  }

  .dias-nao-letivos__month-col-year {
    width: 300px;
  }
}

.dias-nao-letivos__month-header {
  height: 13px;
  border-left: 3px solid var(--ladesa-green-1-color);
}

.dias-nao-letivos__month-header-text {
  font-size: 13px;
  letter-spacing: 0.025em;
  color: var(--ladesa-text-default-color);
}
</style>
