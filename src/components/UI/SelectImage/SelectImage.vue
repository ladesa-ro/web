<script setup lang="ts">
import { useDropzone } from 'vue3-dropzone';

const model = defineModel<File | Blob | null | undefined>();

function onDrop(acceptedFiles: any) {
  model.value = acceptedFiles[0]; //retorna mais de um arquivo
}

const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
  onDrop,
});

const imageSrc = computed(() => {
  if (model.value) {
    return URL.createObjectURL(model.value);
  }
  return null;
});
</script>
<template>
  <div>
    <div
      class="drop-area"
      :class="{ selected: imageSrc !== null }"
      v-bind="getRootProps()"
      :style="{ backgroundImage: `url(${imageSrc})` }"
    >
      <div
        class="dropzone-info flex flex-col h-full items-center justify-center"
      >
        <IconsIconFilePicker />

        <div v-if="isDragActive" class="dropzone-info-message">
          Solte sua imagem aqui.
        </div>

        <div v-else class="dropzone-info-message">
          Arraste e solte uma imagem ou escolha uma de até 500 KB .jpeg ou .png.
        </div>
      </div>

      <input v-bind="getInputProps()" accept=".jpeg, .jpg, .png" />
    </div>
  </div>
</template>

<style scoped>
.image-container {
  width: 415px;
  height: 198px;
  margin-top: -41px;
  border-radius: 8px;
}

.image-dropzone {
  border-radius: 8px;
  width: 100%;
}

.drop-area {
  background: no-repeat center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 200px;

  border: 2px solid #9ab69e;
  border-radius: 8px;

  text-align: center;
  cursor: pointer;

  overflow: hidden;
}

.drop-area input[type='file'] {
  display: none;
}

.drop-area .dropzone-info {
  width: 100%;
  padding: 0px 50px;

  color: #777777;
}

.drop-area .dropzone-info .dropzone-info-message {
  margin-top: 20px;
  font-weight: 500;
}

.drop-area.selected .dropzone-info {
  opacity: 0;
  transition: 0.15s ease-in-out;
}

.drop-area:hover .dropzone-info {
  opacity: 1;
  color: black;
  backdrop-filter: blur(4px);
  background-color: rgba(240, 240, 240, 0.9);
}

@media screen and (max-width: 600px) {
  .dropzone-info-message {
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
