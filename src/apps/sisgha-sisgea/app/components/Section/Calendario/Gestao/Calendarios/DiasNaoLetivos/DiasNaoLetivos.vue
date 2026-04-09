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
        <div class="lg:w-[340px] shrink-0">
          <SectionCalendarioMonth
            :year="calendarYear"
            :events="calendarEvents"
            :toggle-month="true"
            :calendar-id="selectedCalendarioId ?? ''"
            :month-num="currentMonth"
          />
        </div>

        <div class="flex-1 flex flex-col gap-3">
          <UISearchBar v-model="searchQuery" placeholder="Pesquisar dia..." />

          <div
            v-if="filteredDiasDoMes.length === 0"
            class="text-center text-ldsa-grey py-4"
          >
            Nenhum dia não letivo neste mês.
          </div>

          <div class="flex flex-col">
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
              <div class="lg:w-[300px] shrink-0">
                <SectionCalendarioMonth
                  :year="calendarYear"
                  :events="calendarEvents"
                  :toggle-month="false"
                  :calendar-id="selectedCalendarioId ?? ''"
                  :month-num="month"
                />
              </div>

              <div class="flex-1 flex flex-col">
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

    <!-- Edit Dialog -->
    <DiaEditDialog
      ref="editDialogRef"
      v-model="editDialogOpen"
      :calendario-id="selectedCalendarioId"
      :dia="editingDia"
      @saved="onDialogSaved"
    />
  </UIContainer>
</template>
