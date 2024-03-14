<template>
  <v-list class="d-flex flex-column justify-space-between" style="height: 100%">
    <v-list-item-group class="">
      <nuxt-link
        class="link"
        v-for="link in links"
        :key="link.title"
        :to="link.to"
      >
        <v-list-item class="mt-3 listItem">
          <template v-slot:prepend>
            <img
              :src="link.icon"
              :width="link.width"
              class="iconBefore"
              alt=""
            />
          </template>
          <v-list-item-title class="link">
            <span> {{ link.title }}</span>
          </v-list-item-title>
        </v-list-item>
      </nuxt-link>
    </v-list-item-group>

    <v-list-item class="mt-3 listItem">
      <template v-slot:prepend>
        <img
          :src="configuracoesIconWhite"
          width="24"
          class="iconBefore"
          alt=""
        />
      </template>
      <v-list-item-title class="link">
        <span>Configurações</span>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import calendarioIconWhite from "../assets/icons/calendarioIconWhite.svg";
import configuracoesIconWhite from "../assets/icons/configuracoesIconWhite.svg";
import disciplinaIconWhite from "../assets/icons/disciplinaIconWhite.svg";
import inicioIconWhite from "../assets/icons/inicioIconWhite.svg";
import outrosIconWhite from "../assets/icons/outrosIconWhite.svg";
import perfilIconWhite from "../assets/icons/perfilIconWhite.svg";
import turmasIconWhite from "../assets/icons/turmasIconWhite.svg";
import vinculoIconWhite from "../assets/icons/vinculosIconWhite.svg";
import cursosIconWhite from "../assets/icons/cursoIconWhite.svg";
import usuariosIconWhite from "../assets/icons/usuariosIconWhite.svg";

const links = [
  {
    title: "Início",
    icon: inicioIconWhite,
    to: "/",
    width: "24",
  },
  {
    title: "Turmas",
    icon: turmasIconWhite,
    to: "/dashboard/turmas",
    width: "24",
  },
  {
    title: "Disciplinas",
    icon: disciplinaIconWhite,
    to: "/dashboard/disciplinas",
    width: "24",
  },
  {
    title: "Perfil",
    icon: perfilIconWhite,
    to: "/perfil",
    width: "24",
  },
  {
    title: "Vínculos",
    icon: vinculoIconWhite,
    to: "/vinculos",
    width: "24",
  },
  {
    title: "Calendário",
    icon: calendarioIconWhite,
    to: "/calendario",
    width: "24",
  },
  {
    title: "Usuários",
    icon: usuariosIconWhite,
    to: "/dashboard/usuarios",
    width: "24",
  },
  {
    title: "Cursos",
    icon: cursosIconWhite,
    to: "/dashboard/cursos",
    width: "26",
  },
];
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

.iconBefore {
  margin-right: 20px;
}

span {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 15px;
}

.listItem:hover {
  background-color: #1bba47;
  border-radius: 10px;
}

.link {
  color: #ffffff;
  text-decoration: none;
}
</style>
