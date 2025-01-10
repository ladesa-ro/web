<script setup lang="ts">
defineEmits(['close']);
</script>

<template>
  <div>
    <div class="overlay">
      <div class="modal">
        <h1 class="font-bold">Cadastrar Usuário</h1>
        <div>
          <VVSelectImage name="aa" />
        </div>
        <div class="flex">
          <button
            class="Cancel flex items-center"
            @click="($event) => $emit('close')"
          >
            <span class="flex">Cancelar</span>
            <svg
              class="svgCancel"
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.23291 11.8824L10.9209 2.11755M10.9209 11.8824L1.23291 2.11755"
                stroke-width="2.46588"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <button
            class="Cad flex items-center"
            @click="($event) => $emit('close')"
          >
            <span>Cadastrar</span>
            <svg
              class="svgCad"
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.4082 6.63384L6.59038 11.647L15.7719 2.35291"
                stroke-width="2.8164"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  font-size: 16px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @apply bg-ldsa-bg;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 10000;
}

.modal {
  @apply bg-ldsa-bg text-ldsa-text-default;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 430px;
  z-index: 10000;
  margin-right: 20px;
}

.modal2 {
  @apply bg-ldsa-bg text-ldsa-text-default;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 390px;
  z-index: 1000;
  margin-left: 20px;
  height: 600px;
}

.Cad,
.Cancel {
  font-weight: 700;
}

.Cancel {
  margin-right: 70px;
}

.Cad {
  margin-left: 110px;
}

.Cad:hover {
  @apply text-ldsa-green-2;
  transition: stroke 0.3s ease;
}

.Cad:hover .svgCad {
  @apply stroke-ldsa-green-2;
  transition: stroke 0.2s ease;
}

.svgCad,
.svgCancel {
  @apply stroke-ldsa-text-default;
  vertical-align: middle;
  margin-bottom: 2px;
  margin-left: 8px;
}

.Cancel:hover {
  @apply text-ldsa-red;
  transition: stroke 0.2s ease;
}

.Cancel:hover .svgCancel {
  @apply text-ldsa-red;
  transition: stroke 0.2s ease;
}

.hDispo {
  margin-left: 10px;
}
</style>
