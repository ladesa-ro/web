<script setup></script>

<template>
  <div>
    <div class="overlay">
      <div class="modal">
        <h1>Editar Curso</h1>

        <div>
          <PagesDashboardCoursesFormsSelectCourseImage />

          <UIInputText value="Nome" />
          <UIInputText value="Nome Abreviado" />

          <PagesDashboardCoursesFormsSelectModality />
        </div>
        <div class="buttons">
          <button class="Cancel" @click="($event) => $emit('close')">
            <span>Cancelar</span>
            <svg class="svgCancel" width="13" height="14" viewBox="0 0 13 14" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1.23291 11.8824L10.9209 2.11755M10.9209 11.8824L1.23291 2.11755" :stroke="svgCancelColor"
                stroke-width="2.46588" stroke-linecap="round" />
            </svg>
          </button>

          <button class="Del" @click="($event) => $emit('close')">
            <span>Deletar</span>
            <svg class="svgDel" width="20" height="18" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.8877 14.3845L2.73055 14.4771C2.77882 15.0804 3.28248 15.5454 3.8877 15.5454V14.3845ZM10.9921 14.3845V15.5454C11.5902 15.5454 12.0904 15.0909 12.1476 14.4955L10.9921 14.3845ZM13.4995 4.40126L14.6532 4.52945C14.6897 4.20128 14.5847 3.87311 14.3645 3.62707C14.1443 3.38103 13.8297 3.24042 13.4995 3.24042V4.40126ZM1.47314 4.40126V3.24042C1.14295 3.24042 0.828381 3.38103 0.608167 3.62707C0.387953 3.87311 0.282936 4.20128 0.3194 4.52945L1.47314 4.40126ZM1.93748 8.5803L0.783738 8.70849C0.849059 9.29638 1.34597 9.74114 1.93748 9.74114V8.5803ZM13.0352 8.5803V9.74114C13.6267 9.74114 14.1236 9.29638 14.1889 8.70849L13.0352 8.5803ZM9.7964 1.61523H10.9572C10.9572 0.974118 10.4375 0.45439 9.7964 0.45439V1.61523ZM5.17624 1.61523V0.45439C4.53512 0.45439 4.01539 0.974118 4.01539 1.61523L5.17624 1.61523ZM3.8877 15.5454H10.9921V13.2237H3.8877V15.5454ZM12.1476 14.4955L12.7048 8.69123L10.3937 8.46937L9.83654 14.2736L12.1476 14.4955ZM2.26622 8.67287L2.73055 14.4771L5.04485 14.292L4.58051 8.48773L2.26622 8.67287ZM0.3194 4.52945L0.783738 8.70849L3.09123 8.45211L2.62689 4.27307L0.3194 4.52945ZM1.93748 9.74114H3.42336V7.41946H1.93748V9.74114ZM11.5493 9.74114H13.0352V7.41946H11.5493V9.74114ZM14.1889 8.70849L14.6532 4.52945L12.3457 4.27307L11.8814 8.45211L14.1889 8.70849ZM5.17624 3.24042H1.47314V5.56211H5.17624V3.24042ZM13.4995 3.24042H9.7964V5.56211H13.4995V3.24042ZM9.7964 3.24042H5.17624V5.56211H9.7964V3.24042ZM10.9572 4.40126V1.61523H8.63555V4.40126H10.9572ZM9.7964 0.45439H5.17624V2.77608H9.7964V0.45439ZM4.01539 1.61523V4.40126H6.33708V1.61523H4.01539ZM3.42336 9.74114H11.5493V7.41946H3.42336V9.74114Z" />
            </svg>
          </button>

          <button class="Cad" @click="($event) => $emit('close')">
            <span>Editar</span>
            <svg class="svgCad" width="18" height="14" viewBox="0 0 18 14" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1.4082 6.63384L6.59038 11.647L15.7719 2.35291" :stroke="svgColor" stroke-width="2.8164"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
span {
  font-weight: bold;
}

h1 {
  font-size: 16px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.05);
}

.modal {
  background-color: white;
  color: black;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 430px;
  margin-right: 20px;
  z-index: 10000;
  margin-bottom: 80px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.Cancel,
.Del,
.Cad {
  display: flex;
  align-items: center;
}

.Cancel>span,
.Del>span,
.Cad>span {
  margin-right: 8px;
}

.svgCancel,
.svgCad {
  vertical-align: middle;
}

.Cancel .svgCancel,
.Del .svgDel,
.Cad .svgCad {
  margin-left: 8px;
}

.Del {
  margin-top: 20px;
}

.Cad,
.Cancel {
  margin-top: 20px;
  font-weight: 700;
}

.Cancel {
  margin-right: 15px;
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
  transition: fill 0.2s ease;
}

.Cancel:hover .svgCancel {
  stroke: #e9001c;
  transition: fill 0.2s ease;
}

.Del:hover {
  color: #e9001c;
  transition: stroke 0.2s ease;
}

.Del:hover .svgDel {
  fill: #e9001c;
  transition: fill 0.2s ease;
}

.hDispo {
  margin-left: 10px;
}
</style>
