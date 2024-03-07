<script setup></script>

<template>
  <div class="overlay">
    <div class="modal">
      <h1>Cadastrar Novo Curso</h1>

      <div>
        <PagesDashboardCoursesFormsSelectCourseImage />

        <UIInputText value="Nome" />
        <UIInputText value="Nome Abreviado" />

        <PagesDashboardCoursesFormsSelectModality />
      </div>
      <div>
        <button class="Cancel" @click="($event) => $emit('close')">
          <span>Cancelar</span>
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
              :stroke="svgCancelColor"
              stroke-width="2.46588"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <button class="Cad" @click="($event) => $emit('close')">
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
              :stroke="svgColor"
              stroke-width="2.8164"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 10000;
}

.modal {
  background-color: white;
  color: black;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 430px;
  margin-bottom: 100px;
  z-index: 10000;
  margin-right: 20px;
}

.Cad,
.Cancel {
  font-weight: 700;
  margin-top: 20px;
}

.Cancel {
  margin-right: 70px;
}

.Cad {
  margin-left: 110px;
}

.Cad:hover {
  color: #00d047;
  transition: stroke 0.3s ease;
}

.Cad:hover .svgCad {
  stroke: #00d047;
  transition: stroke 0.2s ease;
}

.svgCad,
.svgCancel {
  stroke: black;
  vertical-align: middle;
  margin-bottom: 2px;
  margin-left: 8px;
}

.Cancel:hover {
  color: #e9001c;
  transition: stroke 0.2s ease;
}

.Cancel:hover .svgCancel {
  stroke: #e9001c;
  transition: stroke 0.2s ease;
}

.hDispo {
  margin-left: 10px;
}
</style>
