<script setup lang="ts">
import type { Vinculo } from '../../FormUtils';

const props = defineProps<{ vinculo: Vinculo }>();

const { campus, query } = await useApiCampusFindOne(props.vinculo.campus.id);

await query.suspense();
</script>
<template>
  <v-expansion-panel :value="vinculo.campus.id">
    <v-expansion-panel-title expand-icon="mdi-menu-down" class="font-medium">
      {{ campus?.apelido }}
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <section class="flex gap-6 justify-between">
        <div class="text-left">
          <span class="p-1">Matutino</span>
          <v-checkbox
            v-for="i in 7"
            hide-details
            density="compact"
            color="success"
            label="Manhã"
            name="disponibilidade"
          />
        </div>
        <div class="text-left">
          <span class="p-1">Vespertino</span>
          <v-checkbox
            v-for="i in 7"
            hide-details
            density="compact"
            color="success"
            label="Manhã"
            name="disponibilidade"
          />
        </div>
        <div class="text-left">
          <span class="p-1">Noturno</span>
          <v-checkbox
            v-for="i in 7"
            hide-details
            density="compact"
            color="success"
            label="Manhã"
            name="disponibilidade"
          />
        </div>
      </section>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
