<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import IconEyeOff from '../icons/Eye/EyeOff.vue';
import IconEyeOn from '../icons/Eye/EyeOn.vue';

export type LoginTextFieldProps = {
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  modelValue?: string;
  inputProps?: object;
  disableTogglePasswordVisibility?: boolean;
};
const props = defineProps<LoginTextFieldProps>();

const emit = defineEmits(['update:modelValue']);

const showPassword = ref(false);

const type = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }

  return props.type ?? 'text';
});

const isTogglePasswordEnabled = computed(
  () => props.type === 'password' && !props.disableTogglePasswordVisibility
);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const inputRef = ref<HTMLInputElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);

const inputAttributes = computed(() => {
  return {
    ...props.inputProps,
  };
});

const handleContainerClick = () => {
  const input = unref(inputRef);

  if (input) {
    input.focus();
  }
};
</script>

<template>
  <div
    ref="containerRef"
    class="ui-login-text-field"
    role="textbox"
    @click="handleContainerClick"
  >
    <input
      ref="inputRef"
      v-model="value"
      :disabled="disabled"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      v-bind="inputAttributes"
    />

    <div v-if="isTogglePasswordEnabled" class="ui-login-text-field__toggle">
      <button
        :disabled="disabled"
        title="Alterar visibilidade deste campo."
        type="button"
        @click="togglePasswordVisibility"
      >
        <IconEyeOff
          v-if="showPassword"
          class="ui-login-text-field__icon u-flex u-items-center"
        />
        <IconEyeOn
          v-if="!showPassword"
          class="ui-login-text-field__icon u-flex u-items-center"
        />
      </button>
    </div>
  </div>
</template>

