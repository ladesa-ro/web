<script generic="T = any" lang="ts" setup>
import type { IGridItemSlotProps } from '../API/List/Results/Grid/Typings/IGridItemSlotProps';

type Props = {
  isLoading?: boolean;
  items?: IGridItemSlotProps['item'][] | null;
};

const props = defineProps<Props>();

type Slots = {
  item(props: IGridItemSlotProps): any;
  'item-skeleton'(): any;
  default(): any;
};

const slots = defineSlots<Slots>();

const items = toRef(props, 'items');

const isLoading = computed(() => props.isLoading ?? false);
</script>

<template>
  <div class="flex-1">
    <template v-if="items && items.length > 0">
      <v-container key="items">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            class="px-2"
            cols="12"
            lg="4"
            md="6"
            sm="12"
          >
            <slot name="item" v-bind="{ item, isLoading }" />
          </v-col>
        </v-row>
      </v-container>
    </template>

    <template v-else-if="isLoading">
      <v-container key="items-skeleton">
        <v-row>
          <v-col
            v-for="item in 10"
            :key="item"
            class="px-2"
            cols="12"
            lg="4"
            md="6"
            sm="12"
          >
            <slot name="item-skeleton" />
          </v-col>
        </v-row>
      </v-container>
    </template>

    <template v-else>
      <v-empty-state
        key="no-results"
        class="flex-1"
        icon="mdi-magnify"
        text="Tente ajustar seus termos ou filtros de pesquisa. Às vezes, termos menos específicos ou consultas mais amplas podem ajudá-lo a encontrar o que procura."
        title="Nenhum resultado encontrado."
      />
    </template>

    <slot />
  </div>
</template>
