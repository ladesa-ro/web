<script lang="ts" setup>
type Props = {
  type?: string;

  placeholder?: string;
  required?: boolean;
  disabled?: boolean;

  modelValue?: string;

  inputProps?: any;

  disableTogglePasswordVisibility?: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

//

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
    class="ui-text-field"
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

    <div v-if="isTogglePasswordEnabled" class="toggle-password-visibility">
      <button
        :disabled="disabled"
        title="Alterar visibilidade deste campo."
        type="button"
        @click="togglePasswordVisibility"
      >
        <IconsEyesEyeOff
          v-if="showPassword"
          class="visibility-icon flex items-center"
        />
        <IconsEyesEyeOn
          v-if="!showPassword"
          class="visibility-icon flex items-center"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.ui-text-field {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  padding: 0 1.125rem;

  @apply border-2 border-ldsa-grey/60 rounded-[0.5625rem];

  cursor: text;

  transition:
    box-shadow 0.05s ease-in-out,
    border 0.085s ease-in-out;
}

.ui-text-field input {
  min-width: auto;
  width: 100%;

  padding: 0.875rem 0;
}

.ui-text-field input:focus {
  outline: none;
}

.ui-text-field input::placeholder {
  @apply text-ldsa-grey;
}

.ui-text-field:focus-within {
  @apply border-ldsa-green-1;
  box-shadow: 0 0 0.5px 5px rgb(from var(--ladesa-green-1-color) R G B / 20%);
}

.toggle-password-visibility {
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password-visibility button {
  width: 100%;
  height: 100%;

  padding: 0.25rem;
}

.toggle-password-visibility button:focus {
  outline: 1px dotted;
}

.toggle-password-visibility button:disabled {
  opacity: 0.5;
}

.visibility-icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
