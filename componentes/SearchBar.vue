<script setup>
const props = defineProps({
  msge: String,
})

const { msge } = props;
</script>
<template>
  <div class="search-bar">
    <fieldset class="f">
      <legend class="legenda">Pesquisar</legend>
      <p class="placeholder">{{ msge }}</p>
      <img class="ft" src="~/assets/Pesquisar.png">
    </fieldset>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleInput() {
      // Este método é chamado sempre que o usuário digita algo na barra de pesquisa.
      // Você pode adicionar lógica adicional aqui, se necessário.
    },
    search() {
      // Este método é chamado quando o botão "Buscar" é clicado.
      // Você pode realizar a lógica de pesquisa aqui, como fazer uma chamada à API.
      // Neste exemplo, apenas exibimos a consulta no console.
      console.log("Pesquisando por: " + this.searchQuery);
    },
  },
};
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
.f{
  position:absolute;
  margin-left: 200px;
  margin-top: 45px;
  border-radius: 10px;
  border: 2.5px solid #B2D2B7;
  width: 485px;
  height: 39px;
}
.f:hover{
  cursor: pointer;
}
.legenda{
  color: #9AB69E;
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 6px;
}
.placeholder{
  color: #9AB69E;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  margin-top: -2px;
  margin-left: 5px;
}
.placeholder:hover{
  cursor: pointer;
}
.ft{
  position: absolute;
  margin-left: 455px;
  margin-top: -2px;
  width: 20px;
  height: 23px;
  flex-shrink: 0;
  }

</style>

