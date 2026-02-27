<script setup lang="ts">
import dayjs from 'dayjs';
import Card from './Card.vue';

const searchBar = ref('');
const selectedYear = ref(`${dayjs().year()}`);
</script>

<template>
  <UIContainer class="flex flex-col gap-6">
    <nav class="flex justify-between items-center">
      <UITitleWithGoBack to="../" text="Gestão de Calendários Acadêmicos" />

      <div class="flex gap-3.5">
        <NuxtLink to="./dias-nao-letivos">
          <UIButtonDefaultSquare>
            <IconsCalendarX class="w-6 h-full" />
          </UIButtonDefaultSquare>
        </NuxtLink>

        <!-- add EditOrCreateModal aqui -->
        <UIButtonDefaultSquare>
          <IconsAdd class="w-6 h-full" />
        </UIButtonDefaultSquare>
      </div>
    </nav>

    <div class="flex flex-col gap-3.5 -mt-1.5">
      <div class="flex items-center gap-3.5">
        <div class="w-30">
          <VVTextField
            v-model="selectedYear"
            name="calendarYear"
            type="number"
            min="2020"
            :max="dayjs().year()"
            label="Ano Letivo"
            :placeholder="'Ex: ' + dayjs().year()"
          />
        </div>

        <VVAutocompleteAPIOfertaFormacao
          class="flex-1"
          name="trainingOffer"
          label="Formação"
        />

        <UIFormOptionFieldsAutocomplete
          class="flex-1"
          label="Situação"
          placeholder="Selecione uma situação"
          :items="[
            { label: 'Agendado', value: 'agendado' },
            { label: 'Em andamento', value: 'andamento' },
            { label: 'Concluído', value: 'concluido' },
          ]"
        />
      </div>

      <UISearchBar v-model="searchBar" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 grid-flow-row">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </UIContainer>
</template>
