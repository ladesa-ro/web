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
  data: { items: users },
  methods: { suspend },
} = useListQuery(queries);

await suspend();

const usersAlphabeticalOrder = computed(() => {
  if (users.value) {
    return users.value?.toSorted((a, b) => a.nome.localeCompare(b.nome));
  }
});
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,_minmax(12.5rem,_1fr))] gap-6">
    <SectionUsuariosGridItem
      v-for="user in usersAlphabeticalOrder"
      :key="user.id"
      :usuario="user"
      :link="itemsLink"
    />
  </div>
</template>
