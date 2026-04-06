<script lang="ts" setup>
import { useField } from 'vee-validate';

type Props = {
  name: string;
  disabled?: boolean;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

//

const fieldDisabled = useFieldDisabled(() => props.disabled);

const {
  handleBlur,
  errorMessage,
  value: modelValue,
} = useField<string | null>(name.value, undefined, {
  validateOnValueUpdate: true,
});
</script>

<template>
  <UISelectRoles
    v-model:value="modelValue"
    :disabled="fieldDisabled"
    :error-messages="errorMessage ? [errorMessage] : []"
    :name="name"
    hide-details="auto"
    persistent-placeholder
    v-bind="$attrs"
    @blur="handleBlur"
  />
</template>
