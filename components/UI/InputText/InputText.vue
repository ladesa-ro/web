<script setup>
defineProps(["value"]);
</script>

<template v-slot:search="{ value }">
  <div>
    <div class="form">
      <form action="./">
        <label id="label" class="label" for="pesquisar">{{ value }}</label>

        <input
          type="text"
          class="input"
          id="pesquisar"
          autocomplete="off"
          placeholder="Digite aqui "
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.form {
  display: block;
  margin-bottom: 25px;
  margin-top: 25px;
  position: relative;
  width: 100%; /* Use toda a largura disponível */
  max-width: 600px; /* Defina uma largura máxima */
  align-items: center;
}

.label {
  display: inline-block;
  padding: 5px;
  width: auto;
  margin-top: -13px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid white;
  background-color: white;
  color: #9ab69e;
  position: absolute;
  margin-left: 22px;
}

input {
  width: 100%; /* Faz o input ocupar toda a largura disponível */
  height: 48px;
  padding: 16px;
  font-size: 14px;
  font-weight: 550;
  border-radius: 8px;
  border: 3px solid #9ab69e;
  transition: border-color 0.3s;
}


input::placeholder {
  padding: 4px;
  margin: 5px;
  color: #9ab69e;
}

input:focus {
  outline: none;
  border-color: #00d047;
}

.icon {
  position: absolute;
  left: 448px;
  top: 26px;
  transform: translateY(-50%);
  fill: #9ab69e;
  transition: fill 0.3s;
  cursor: pointer;
}

.form:focus-within label {
  color: #00d047;
  transition: 0.3s;
}

.form:focus-within .icon {
  fill: #00d047;
}
</style>
