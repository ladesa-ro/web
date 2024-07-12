<script setup lang="ts" generic="T extends { id: string | number }">
type Props = {
  isLoading?: boolean;
  items?: T[];
};

type Slots = {
  item(props: { item: T }): any;

  'item-skeleton'(props: any): any;
};

const props = defineProps<Props>();

const items = toRef(props, 'items');

const slots = defineSlots<Slots>();
</script>

<template>
  <div class="flex-1">
    <template v-if="items && items.length > 0">
      <v-container key="items">
        <v-row>
          <v-col
            sm="12"
            md="6"
            lg="4"
            cols="12"
            class="px-2"
            :key="item.id"
            v-for="item in items"
          >
            <slot name="item" v-bind="{ item }"></slot>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <template v-else-if="isLoading">
      <v-container key="items-skeleton">
        <v-row>
          <v-col
            sm="12"
            md="6"
            lg="4"
            cols="12"
            class="px-2"
            v-for="item in 10"
            :key="item"
          >
            <slot name="item-skeleton"></slot>
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
      ></v-empty-state>
    </template>
  </div>
</template>
