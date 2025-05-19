<script lang="ts" setup>
type Props = { searchBarText?: string };

const props = defineProps<Props>();

const { searchBarText } = toRefs(props);

//

const $emit = defineEmits(['edit']);

//

const { composables: { useListQuery } } = useLadesaApiCrudUsuarios();

const queries = computed(() => ({ search: searchBarText.value }));

const {
  data: { items: usuarios },
  methods: { suspend },
} = useListQuery(queries);

await suspend();
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,_minmax(12.5rem,_1fr))] gap-6">
    <SectionUsuariosGridItem
      v-for="usuario in usuarios"
      :key="usuario.id"
      :usuario="usuario"
    />
  </div>
</template>
