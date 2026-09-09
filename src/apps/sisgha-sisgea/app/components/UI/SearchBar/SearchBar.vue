<script lang="ts" setup>
import { FormSearchBar } from '@ladesa-ro/web.ui';

const value = defineModel<string>({ required: false, default: '' });
</script>

<template>
  <FormSearchBar v-model="value" />
</template>
