<template v-slot:search>
  <div>
    <div class="-search-bar">
      <form action="./" class="-search-bar-form">
        <label id="label" class="-label" for="pesquisar">Pesquisar</label>
        <IconSearch class="-input-icon" />
        <input
          class="-search-input"
          type="text"
          id="pesquisar"
          placeholder="Digite aqui"
          autocomplete="off"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import IconSearch from '~/components/Icons/IconSearch.vue';

const searchTerm = ref('');
const filteredItems = ref([]);

const filterItems = () => {
  filteredItems.value = items.value.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
};
</script>
<style scoped>
/* ## Search Bar - Settings ## */

/* Search bar presets */
.-search-bar {
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
}

.-search-bar-form {
  width: 100%;
}

.-search-input {
  display: flex;
  align-items: stretch;
  width: 100% !important;
  height: 48px;

  font-weight: 550;
  font-size: 0.8rem !important;
  font-size: 14px;

  border-radius: 8px;
  border: 2px solid #9ab69e;

  padding: 16px;

  transition: border-color 0.3s;

  flex: 1;
}

/* Text presets */
.-label {
  display: inline-block;
  position: absolute;

  width: auto;
  margin-top: -0.8rem;
  margin-left: 1.6rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  font-size: 0.8rem !important;
  font-weight: 600;

  border: 1px solid white;

  color: #9ab69e;
  margin: 5px;
  padding: 4px;

  color: #9ab69e;
}

/* ## Hover ## */
.-search-input:focus {
  outline: none;
  border-color: #00d047;
}

.-input-icon {
  width: 20px;
  height: 20px;

  position: absolute;
  left: auto;
  right: 15px !important;
  top: 50%;
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
