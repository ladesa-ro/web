<script lang="ts" setup>
type Props = {
  searchBarText?: string;
  itemsLink?: string;
  editButton?: boolean;
};

const { searchBarText, editButton = true } = defineProps<Props>();

//

const usuarios_api = useUsuarios();

const queries = computed(() => ({ search: searchBarText }));

const listQuery = usuarios_api.list(queries);

const users = computed(() => listQuery.data.value?.data ?? null);

await listQuery.suspense();
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,_minmax(12.5rem,_1fr))] gap-6">
    <SectionUsuariosGridItem
      v-for="user in users"
      :key="user.id"
      :usuario="user"
      :link="itemsLink"
      :editButton="editButton"
    />
  </div>
</template>
