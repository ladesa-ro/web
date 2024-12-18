<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRefs } from 'vue';

//

type Props = {
  name: string;
};

const props = defineProps<Props>();

//

const { name } = toRefs(props);

const {
  handleBlur,
  errorMessage,
  value: modelValue,
} = useField(name.value, undefined, {
  validateOnValueUpdate: true,
});
</script>

<template>
  <UISelectRoles
    v-bind="$attrs"
    v-model:value="modelValue"
    :name="name"
    hide-details="auto"
    persistent-placeholder
    :error-messages="errorMessage ? [errorMessage] : []"
    @blur="handleBlur"
  />
</template>
