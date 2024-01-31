<template v-slot:search="{ value }">
  <div>
    <div class="form">
      <form action="./">
        <label id="label" class="label" for="pesquisar">{{ value }}</label>

        <input
          class="input"
          type="text"
          id="pesquisar"
          placeholder="Digite aqui "
          autocomplete="off"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
defineProps(["value"]);
</script>

<style scoped>
.form {
  display: flex;
  margin-bottom: 25px;
  margin-top: 25px;
  position: relative;
  width: 490px;
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
  height: 48px;
  width: 380px;
  font-weight: 550;
  font-size: 0.75rem;
  border-radius: 8px;
  border: 3px solid #9ab69e;
  transition: border-color 0.3s;
  padding: 16px;
  font-size: 14px;
  flex: 1;
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
