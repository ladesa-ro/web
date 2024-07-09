<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef } from 'vue';

type Props = {
  name: string;
};

const props = defineProps<Props>();

const name = toRef(props, 'name');

const { errorMessage, value: modelValue } = useField(unref(name), undefined, {
  validateOnValueUpdate: true,
});
</script>

<template>
  <UISelectImage v-bind="$attrs" v-model="modelValue" />

  <div v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>
