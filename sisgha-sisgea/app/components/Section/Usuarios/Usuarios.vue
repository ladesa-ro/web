<script lang="ts" setup>
withDefaults(
  defineProps<{
    crudEnable?: boolean;
    itemsLink?: string;
    defaultStyle?: boolean;
    searchBarContainerStyle?: string;
  }>(),
  {
    crudEnable: true,
    itemsLink: undefined,
    defaultStyle: true,
  }
);

const searchBarText = ref('');
</script>

<!-- TODO: usar UIAPIList aqui -->

<template>
  <UIContainer :styled="defaultStyle ?? true">
    <div class="flex-1 h-full flex flex-col gap-10">
      <div
        :class="searchBarContainerStyle ?? 'flex justify-between gap-5'"
      >
        <UISearchBar v-model="searchBarText" />
        <SectionUsuariosModalsForm v-if="crudEnable" />
      </div>

      <SectionUsuariosGrid
        :search-bar-text="searchBarText"
        :edit-button="crudEnable"
        :items-link="itemsLink"
      />
    </div>
  </UIContainer>
</template>
