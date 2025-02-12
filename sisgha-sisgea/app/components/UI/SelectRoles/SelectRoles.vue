<script lang="ts" setup>
import SelectBase from '~/components/UI/SelectBase/SelectBase.vue';

const roles = [
  { value: 'professor', label: 'Professor' },
  { value: 'dape', label: 'DAPE' },
];
</script>

<template>
  <SelectBase
    :clearable="false"
    :items="roles"
    item-title="label"
    item-value="value"
    label="Função"
    multiple
    placeholder="Selecione"
  />
</template>
