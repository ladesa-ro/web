<script lang="ts" setup>
//

type Props = {
  searchBarText?: string;
};

const props = defineProps<Props>();

//

const $emit = defineEmits(['edit']);

const { searchBarText } = toRefs(props);

const {
  composables: { useListQuery },
} = useLadesaApiCrudUsuarios();

const queries = computed(() => ({ search: searchBarText.value }));

const { items: usuarios } = await useListQuery(queries);
</script>

<template>
  <v-container>
    <section class="m-0 p-0">
      <div
        class="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-[36.59px]"
      >
        <SectionUsuariosGridItem
          v-for="usuario in usuarios"
          :key="usuario.id"
          :usuario="usuario"
        />
      </div>
    </section>
  </v-container>
</template>

<style>
.detail {
  cursor: pointer;
  z-index: 1000;
  margin-right: 10px;
}
</style>
