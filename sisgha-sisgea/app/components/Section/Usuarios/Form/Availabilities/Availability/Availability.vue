<script lang="ts" setup>
import { capitalizeFirst } from '../../../../Horario/-Helpers/CapitalizeFirst';
import type { Vinculo } from '../../FormUtils';

const { vinculo } = defineProps<{ vinculo: Vinculo }>();

const {
  composables: { useFindOneQuery },
} = useLadesaApiCrudCampi();

const { data: campus, suspense } = useFindOneQuery(vinculo.campus.id);

await suspense();

const dayShifts = [
  {
    title: 'matutino',
    times: ['07:30', '08:20', '09:10', '10:00', '10:20', '11:10'],
  },
  {
    title: 'vespertino',
    times: ['13:00', '13:50', '14:40', '15:30', '15:50', '16:40'],
  },
  {
    title: 'noturno',
    times: ['19:00', '19:50', '20:40', '21:30', '21:50', '22:40'],
  },
];

//

const selectedTimes = ref([]);
</script>

<template>
  <v-expansion-panel :value="vinculo.campus.id" class="h-full">
    <v-expansion-panel-title class="font-medium" expand-icon="mdi-menu-down">
      {{ campus?.apelido }}
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <section class="flex gap-6 justify-between">
        <div v-for="shift in dayShifts">
          <h1>{{ capitalizeFirst(shift.title) }}</h1>

          <UICheckbox :items="shift.times" v-model="selectedTimes" />
        </div>
      </section>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
