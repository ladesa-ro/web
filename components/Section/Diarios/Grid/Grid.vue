<script setup lang="ts">
//

const $emit = defineEmits(['edit']);

//

type Props = {
  searchBarText?: string;
};

const props = defineProps<Props>();

//

const { searchBarText } = toRefs(props);
const { diarios } = await useApiDiariosFindAll(searchBarText);
</script>

<template>
  <UIGrid :items="diarios">
    <template #item="{ item: diario }">
      <SectionDiariosGridItem :diario="diario" />
    </template>
  </UIGrid>
</template>
