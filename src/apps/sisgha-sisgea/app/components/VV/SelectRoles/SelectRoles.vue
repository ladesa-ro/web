<script lang="ts" setup>
import { useField } from 'vee-validate';

type Props = {
  name: string;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

//

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
    v-model:value="modelValue"
    :error-messages="errorMessage ? [errorMessage] : []"
    :name="name"
    hide-details="auto"
    persistent-placeholder
    v-bind="$attrs"
    @blur="handleBlur"
  />
</template>
