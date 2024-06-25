<script setup lang="ts">

const props = defineProps({
    searchBarText: String,
});

const $emit = defineEmits(['edit']);

const { searchBarText } = toRefs(props);
const { diarios } = await useApiDiariosFindAll(searchBarText);
</script>

<template>
    <UIGrid :items="diarios">
        <template #item="{ item: diario}">
            <SectionDiariosGridItem :diario="diario" />
        </template>
    </UIGrid>
</template>