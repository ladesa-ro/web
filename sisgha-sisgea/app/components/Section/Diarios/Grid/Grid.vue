<script lang="ts" setup>
const $emit = defineEmits(['edit']);

//

type Props = {
  searchBarText?: string;
};

const { searchBarText } = defineProps<Props>();

const {
  composables: { useListQuery },
} = useLadesaApiCrudDiarios();

const queries = computed(() => ({ search: searchBarText }));

const {
  data: { items: diarios },
  methods: { suspend },
} = useListQuery(queries);

await suspend();
</script>

<template>
  <UIGrid :items="diarios">
    <template #item="{ item: diario }">
      <SectionDiariosGridItem :diario="diario" />
    </template>
  </UIGrid>
</template>
