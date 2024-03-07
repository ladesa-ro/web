<template>
  <v-navigation-drawer
    class="px-1"
    width="237"
    color="#39A048"
    rail-width="64"
    expand-on-hover
    rail
  >
    <v-list
      class="d-flex flex-column justify-space-between"
      style="height: 100%"
    >
      <v-list-item-group class="">
        <nuxt-link
          class="link"
          v-for="link in links"
          :key="link.title"
          :to="link.to"
        >
          <v-list-item class="mt-3 listItem">
            <template v-slot:prepend>
              <img :src="link.icon" width="24" class="iconBefore" alt="" />
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
  </v-navigation-drawer>
</template>

<script setup>
import inicioIconWhite from "../assets/icons/inicioIconWhite.svg";
import turmasIconWhite from "../assets/icons/turmasIconWhite.svg";
import disciplinaIconWhite from "../assets/icons/disciplinaIconWhite.svg";
import perfilIconWhite from "../assets/icons/perfilIconWhite.svg";
import vinculoIconWhite from "../assets/icons/vinculosIconWhite.svg";
import calendarioIconWhite from "../assets/icons/calendarioIconWhite.svg";
import outrosIconWhite from "../assets/icons/outrosIconWhite.svg";
import configuracoesIconWhite from "../assets/icons/configuracoesIconWhite.svg";

const links = [
  {
    title: "Início",
    icon: inicioIconWhite,
    to: "/inicio",
  },
  {
    title: "Turmas",
    icon: turmasIconWhite,
    to: "/turmas",
  },
  {
    title: "Disciplinas",
    icon: disciplinaIconWhite,
    to: "/disciplinas",
  },
  {
    title: "Perfil",
    icon: perfilIconWhite,
    to: "/perfil",
  },
  {
    title: "Vínculos",
    icon: vinculoIconWhite,
    to: "/vinculos",
  },
  {
    title: "Calendário",
    icon: calendarioIconWhite,
    to: "/calendario",
  },
  {
    title: "Outros",
    icon: outrosIconWhite,
    to: "/outros",
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
