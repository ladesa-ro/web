<script lang="ts" setup>
import { computed } from 'vue';
import { useDropzone } from 'vue3-dropzone';
import IconFilePicker from '../icons/FilePicker.vue';

const model = defineModel<File | Blob | null | undefined>();

const props = defineProps<{
  existingSrc?: string | null;
  disabled?: boolean;
}>();

function onDrop(acceptedFiles: any) {
  if (props.disabled) return;
  model.value = acceptedFiles[0];
}

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept: '.jpeg, .jpg, .png',
});

const imageSrc = computed(() => {
  if (model.value) {
    return URL.createObjectURL(model.value);
  }
  if (props.existingSrc) {
    return props.existingSrc;
  }
  return null;
});
</script>

<template>
  <div
    class="ui-select-image"
    :class="{
      'ui-select-image--selected': imageSrc !== null,
      'ui-select-image--disabled': disabled,
    }"
    :style="{ backgroundImage: imageSrc ? `url(${imageSrc})` : undefined }"
    v-bind="getRootProps()"
  >
    <div class="ui-select-image__info">
      <IconFilePicker />

      <span v-if="isDragActive" class="ui-select-image__info-message">
        Solte sua imagem aqui.
      </span>

      <span v-else class="ui-select-image__info-message">
        Arraste e solte uma imagem ou escolha uma de até 500 KB .jpeg ou .png.
      </span>
    </div>

    <input v-bind="getInputProps()" />
  </div>
</template>
