<template>
  <div class="overlay">
    <div class="modal">
      <h1>Cadastrar Novo Curso</h1>
      <div class="modal-form">
        <!-- Componentes de seleção e inputs -->
        <PagesDashboardCoursesFormsSelectCourseImage />

        <UITextFieldBase label="Nome" placeholder="Digite aqui" />
        <UITextFieldBase label="Nome Abreviado" placeholder="Digite aqui" />

        <PagesDashboardCoursesFormsSelectModality />
      </div>
      <div class="button-group">
        <button class="button Cancel" @click="($event) => $emit('close')">
          <span>Cancelar</span>
          <!-- SVG para botão Cancelar -->
        </button>
        <button class="button Cad" @click="($event) => $emit('close')">
          <span>Cadastrar</span>
          <!-- SVG para botão Cadastrar -->
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
/* Estilos básicos e responsivos para o modal */
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
  width: 90%; /* Valor padrão para largura em dispositivos pequenos */
  max-width: 600px; /* Largura máxima para evitar que o modal fique muito grande em telas grandes */
  margin-bottom: 100px;
}

.button-group {
  display: flex;
  justify-content: center; /* Centraliza os botões no modal */
  gap: 20px; /* Espaço entre os botões */
}

.button {
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.Cancel,
.Cad {
  transition: color 0.2s ease;
}

.svgCad,
.svgCancel {
  vertical-align: middle;
  margin-left: 8px;
}

.Cad:hover {
  color: #00d047;
}

.Cancel:hover {
  color: #e9001c;
}

@media (max-width: 600px) {
  .button-group {
    flex-direction: column; /* Empilha os botões verticalmente em telas pequenas */
  }

  .button {
    width: 100%; /* Faz os botões ocuparem toda a largura do modal em telas pequenas */
  }
}
</style>
