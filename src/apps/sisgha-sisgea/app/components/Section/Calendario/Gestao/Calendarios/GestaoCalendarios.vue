<script setup lang="ts">
import dayjs from 'dayjs';
import Card from './Card.vue';

const searchBar = ref('');
const selectedYear = ref(`${dayjs().year()}`);
</script>

<template>
  <UIContainer class="flex flex-col gap-6">
    <UIBreadcrumbDapeBreadcrumb>
      <div class="flex gap-3.5 max-md:w-full">
        <NuxtLink to="./dias-nao-letivos" class="max-md:hidden">
          <UIButtonDefaultSquare>
            <IconsCalendarX class="w-6 h-full" />
          </UIButtonDefaultSquare>
        </NuxtLink>

        <NuxtLink to="./dias-nao-letivos" class="md:hidden w-full">
          <UIButtonDefault :outline-on-clink="false" class="w-full!">
            <template #start-icon>
              <IconsCalendarX />
            </template>

            Dias não letivos
          </UIButtonDefault>
        </NuxtLink>

        <!-- add EditOrCreateModal aqui -->
        <UIButtonDefaultSquare>
          <IconsAdd class="w-6 h-full" />
        </UIButtonDefaultSquare>
      </div>
    </UIBreadcrumbDapeBreadcrumb>

    <div class="flex flex-col gap-3.5 -mt-1.5">
      <div class="flex max-lg:flex-col lg:items-center gap-3.5">
        <div class="w-full lg:w-30">
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
