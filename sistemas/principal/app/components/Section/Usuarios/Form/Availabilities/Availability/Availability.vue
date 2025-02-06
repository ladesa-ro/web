<script setup lang="ts">
import type { Vinculo } from '../../FormUtils';

const props = defineProps<{ vinculo: Vinculo }>();

const {
  composables: { useFindOneQuery },
} = useLadesaApiCrudCampi();

const { data: campus } = await useFindOneQuery(props.vinculo.campus.id);

const horarios = {
  matutino: ['07:30', '08:20', '09:10', '10:00', '10:20', '11:10'],
  vespertino: ['13:00', '13:50', '14:40', '15:30', '15:50', '16:40'],
  noturno: ['19:00', '19:50', '20:40', '21:30', '21:50', '22:40'],
};

const selecionados = ref<string[]>([]);
</script>

<template>
  <v-expansion-panel :value="vinculo.campus.id" class="h-full">
    <v-expansion-panel-title expand-icon="mdi-menu-down" class="font-medium">
      {{ campus?.apelido }}
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <section class="flex gap-6 justify-between">
        <!-- TODO: substituir por componente -->

        <!-- Matutino -->
        <div class="text-left">
          <span class="p-1 font-semibold">Matutino</span>
          <v-checkbox
            v-for="(horario, index) in horarios.matutino"
            :key="`matutino-${index}`"
            hide-details
            density="compact"
            color="success"
            :label="horario"
            :value="horario"
            v-model="selecionados"
            name="disponibilidade"
          />
        </div>

        <!-- Vespertino -->
        <div class="text-left">
          <span class="p-1 font-semibold">Vespertino</span>
          <v-checkbox
            v-for="(horario, index) in horarios.vespertino"
            :key="`vespertino-${index}`"
            hide-details
            density="compact"
            color="success"
            :label="horario"
            :value="horario"
            v-model="selecionados"
            name="disponibilidade"
          />
        </div>

        <!-- Noturno -->
        <div class="text-left">
          <span class="p-1 font-semibold">Noturno</span>
          <v-checkbox
            v-for="(horario, index) in horarios.noturno"
            :key="`noturno-${index}`"
            hide-details
            density="compact"
            color="success"
            :label="horario"
            :value="horario"
            v-model="selecionados"
            name="disponibilidade"
          />
        </div>
      </section>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style scoped></style>
