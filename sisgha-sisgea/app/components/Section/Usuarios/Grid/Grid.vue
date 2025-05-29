<script lang="ts" setup>
type Props = {
  searchBarText?: string;
  itemsLink?: string;
};

const { searchBarText } = defineProps<Props>();

//

const {
  composables: { useListQuery },
} = useLadesaApiCrudUsuarios();

const queries = computed(() => ({ search: searchBarText }));

// TODO: adicionar opção para filtrar para ter apenas professores
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
      :link="itemsLink"
    />
  </div>
</template>
