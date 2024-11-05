<script setup lang="ts">
import { type Perfil } from '../../FormUtils';

const props = defineProps<{ perfil: Perfil }>();

const { campus, query } = await useApiCampusFindOne(props.perfil.campus.id);

await query.suspense();
</script>
<template>
  <v-expansion-panel :value="perfil.campus.id">
    <v-expansion-panel-title expand-icon="mdi-menu-down" class="font-medium">
      {{ campus?.apelido }}
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <section class="flex gap-6 justify-between">
        <div class="text-left">
          <span class="p-1">Matutino</span>
          <v-checkbox
            hide-details
            density="compact"
            color="success"
            label="Manhã"
            v-for="i in 7"
            name="disponibilidade"
          />
        </div>
        <div class="text-left">
          <span class="p-1">Vespertino</span>
          <v-checkbox
            hide-details
            density="compact"
            color="success"
            label="Manhã"
            v-for="i in 7"
            name="disponibilidade"
          />
        </div>
        <div class="text-left">
          <span class="p-1">Noturno</span>
          <v-checkbox
            hide-details
            density="compact"
            color="success"
            label="Manhã"
            v-for="i in 7"
            name="disponibilidade"
          />
        </div>
      </section>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
