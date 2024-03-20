<script lang="ts" setup>
// ## Importacoes ##
import { ref } from 'vue';
import IconAdd from '~/components/Icons/IconAdd.vue';
import bloco from '~/componentes/bloco.vue';

// ##  ##
</script>

<template>
  <div class="-container">
    <!-- ## Menu ## -->
    <div class="-container-buttons">
        <!-- Barra de Pesquisa -->
        <SearchBar value="Pesquisar"/>
        <div class="-divider-buttons" style="width: 50%;"></div>
        <IconsIconAdd/>
    </div>

    <!-- ## Cadastro de Item ## -->
    <div>
    </div>

    <!-- ## Lista de Itens ## -->
    <div class="-container-items">

        <!-- Bloco (TESTE) -->
        <!-- OBS: Transformar em componente -->
        <div class="-bloco">
            <div class="-bloco-imagem"></div>
            <ul class="-bloco-infos">
                <li>
                    <h4>Text</h4>
                </li>

                <li>
                    <p>Text</p>
                </li>
                
                <li>
                    <p>Text</p>
                </li>
            </ul>
        </div>
        <!-- <bloco/> -->
    </div>
  </div>
</template>

<style scoped>
    .-container-buttons {
        background-color: blue;
        display: flex;
        flex-direction: row;
        padding: 5%;
        /* justify-content: space-between; */
    }

    .-container-items {
        width: 100%;
        height: 100%;

        background-color: red;

        padding: 5%;
    }

    /* Bloco */
    .-bloco {
        display: flex;
        flex-direction: column;

        width: 375px;
        height: 250px;

        border-radius: 8px;
        border: 2px solid #9ab69e;

        overflow: hidden;

        background-color: #fff;
    }

    /* Bloco - Imagem */
    .-bloco-imagem {
        width: 100%;
        height: 50%;

        background-color: #9e9090;
    }

    /* Bloco - Infos */
    .-bloco-infos {
        list-style: none;

        padding: 5%;
    }

</style>