<!-- TODO: mover para UI/Form -->

<script lang="ts" setup>
import { useDropzone } from 'vue3-dropzone';

const model = defineModel<File | Blob | null | undefined>();

function onDrop(acceptedFiles: any) {
  model.value = acceptedFiles[0]; //retorna mais de um arquivo
}

const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
  onDrop,
  accept: '.jpeg, .jpg, .png',
});

const imageSrc = computed(() => {
  if (model.value) {
    return URL.createObjectURL(model.value);
  }
  return null;
});
</script>
<template>
  <div
    :class="{ selected: imageSrc !== null }"
    :style="{ backgroundImage: `url(${imageSrc})` }"
    class="drop-area flex"
    v-bind="getRootProps()"
  >
    <div
      class="dropzone-info flex-1 flex flex-col items-center justify-center gap-3"
    >
      <IconsFilePicker />

      <span v-if="isDragActive" class="dropzone-info-message">
        Solte sua imagem aqui.
      </span>

      <span v-else class="dropzone-info-message">
        Arraste e solte uma imagem ou escolha uma de até 500 KB .jpeg ou .png.
      </span>
    </div>

    <input v-bind="getInputProps()" />
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.drop-area {
  background: no-repeat center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  font-size: 14px;

  width: 100%;
  @apply min-h-42;

  @apply border-2 border-ldsa-grey rounded-lg;

  cursor: pointer;
  text-align: center;
  @apply text-ldsa-grey;
}

.drop-area input[type='file'] {
  display: none;
}

.drop-area .dropzone-info {
  width: 100%;
  padding: 0px 50px;
}

.drop-area .dropzone-info .dropzone-info-message {
  font-weight: 500;
}

.drop-area.selected .dropzone-info {
  opacity: 0;
  transition: 0.15s ease-in-out;
}

.drop-area:hover .dropzone-info {
  opacity: 1;
  backdrop-filter: blur(4px);
  @apply bg-ldsa-grey/10;
}

@media screen and (max-width: 800px) {
  .dropzone-info-message {
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
