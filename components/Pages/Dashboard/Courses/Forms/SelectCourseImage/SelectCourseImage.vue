<script setup>
import { useDropzone } from "vue3-dropzone";

const model = defineModel(

);

function onDrop(acceptFiles, rejectReasons) {
  console.log(acceptFiles);
  console.log(rejectReasons);
  model.value = acceptFiles[0];//retorna mais de um arquivo
}

const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop });

const imageSrc = computed(()=>{
  if(model.value){
    return URL.createObjectURL(model.value)
  }
 return null
});

</script>
<template>
  <div>

    <div @click.prevent="open" id="drop-area" v-bind="getRootProps()">
      <svg class="newImage" width="50" height="50" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.66025 34.0272H30.3669C32.3884 34.0272 34.0272 32.3884 34.0272 30.3669V5.66025C34.0272 3.63875 32.3884 2 30.3669 2H5.66025C3.63875 2 2 3.63875 2 5.66025V30.3669C2 32.3884 3.63875 34.0272 5.66025 34.0272Z"
          stroke="#ADADAD" stroke-width="2.17143" />
        <path
          d="M5.72878 32.9291L5.68316 33.4257C5.49826 35.4388 6.98026 37.2205 8.99328 37.4054L33.5964 39.6652C35.6094 39.8501 37.3912 38.3681 37.5761 36.3551L39.8358 11.752C40.0207 9.73895 38.5387 7.95718 36.5257 7.77229L35.1586 7.64672"
          stroke="#ADADAD" stroke-width="2.17143" stroke-linecap="round" stroke-dasharray="3.66 3.66" />
        <path
          d="M17.4645 25.6543L11.0929 20.5868C10.2942 19.9516 9.13013 20.0924 8.50588 20.8998L2 29.3146V30.3669C2 32.3884 3.63875 34.0272 5.66025 34.0272H30.3669C32.3884 34.0272 34.0272 32.3884 34.0272 30.3669V23.4582L27.0054 15.428C26.2102 14.5186 24.7678 14.6154 24.1013 15.6228L17.4645 25.6543Z"
          fill="#ADADAD" />
        <path
          d="M15.7717 12.6605C15.1147 12.0035 14.0495 12.0035 13.3925 12.6605C12.7355 13.3175 12.7355 14.3826 13.3925 15.0396C14.0495 15.6966 15.1147 15.6966 15.7717 15.0396C16.4287 14.3826 16.4287 13.3175 15.7717 12.6605Z"
          fill="#ADADAD" />
      </svg>
      <div class="ctt" v-if="isDragActive">
        Solte sua imagem aqui.
      </div>

      <div v-if="imageSrc" class="image-container">
      <img :src="imageSrc" alt="Imagem carregada" class="image-dropzone"/>
    </div>

      <div class="ctt" v-else>
        Arraste e solte uma imagem ou escolha uma de até 500 KB .jpeg ou .png.
      </div>
      <input type="file" ref="fileInput" v-bind="getInputProps()" accept=".jpeg, .jpg, .png" />
    </div>
  </div>
</template>



<style scoped>
.image-container {
  position: relative;
  border: dashed 1px red;
}

.image-dropzone{
  display: block;
  width: 100%;
  height: 100%; /* Garantindo que a imagem preencha completamente o contêiner */
  object-fit: cover; /* Mantém a proporção da imagem e preenche o contêiner */
  border-radius: 8px; /* Adicionando borda arredondada */
}
#drop-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 50px;
  width: 100%;
  height: 200px;  
  border: 2px solid #9ab69e;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}

#drop-area input[type="file"] {
  display: none;
}

#drop-area img {
  max-width: 100%;
  max-height: 100%;
}

.newImage {
  margin-top: 40px;
  margin-left: 20px;

}

.ctt {
  margin-top: 20px;
  font-weight: 500;
  color: #adadad;
}

@media screen and (max-width: 600px) {
  #drop-area {
    padding: 0px 20px;
  }

  .newImage {
    margin-top: 20px;
    margin-left: 10px;
  }

  .ctt {
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
