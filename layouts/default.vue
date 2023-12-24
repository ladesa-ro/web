<script setup>
import inicioIconWhite from '../assets/icons/inicioIconWhite.svg';
import turmasIconWhite from '../assets/icons/turmasIconWhite.svg';
import disciplinaIconWhite from '../assets/icons/disciplinaIconWhite.svg';
import perfilIconWhite from '../assets/icons/perfilIconWhite.svg';
import vinculoIconWhite from '../assets/icons/vinculosIconWhite.svg';
import calendarioIconWhite from '../assets/icons/calendarioIconWhite.svg';
import outrosIconWhite from '../assets/icons/outrosIconWhite.svg';
import configuracoesIconWhite from '../assets/icons/configuracoesIconWhite.svg';
import profilePicture from '../assets/icons/profilePicture.svg';

const links = [
  {
    title: 'Início',
    icon: inicioIconWhite,
    to: '/inicio',
  },
  {
    title: 'Turmas',
    icon: turmasIconWhite,
    to: '/turmas',
  },
  {
    title: 'Disciplinas',
    icon: disciplinaIconWhite,
    to: '/disciplinas',
  },
  {
    title: 'Perfil',
    icon: perfilIconWhite,
    to: '/perfil',
  },
  {
    title: 'Vínculos',
    icon: vinculoIconWhite,
    to: '/vinculos',
  },
  {
    title: 'Calendário',
    icon: calendarioIconWhite,
    to: '/calendario',
  },
  {
    title: 'Outros',
    icon: outrosIconWhite,
    to: '/outros',
  },
];
</script>

<template>
  <v-app class="app">
    <v-layout class="rounded rounded-md">
      <v-app-bar elevation="2" class="py-1">
        <div class="userInfo">
          <VImg class="ml-5" :src="profilePicture" width="52"></VImg>
          <div class="nameRole">
            <p class="name">Danilo Escudero</p>
            <p class="role">Professor</p>
          </div>
        </div>
      </v-app-bar>
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
            <v-list-item
              class="mt-3 listItem"
              v-for="link in links"
              :key="link.title"
              link
            >
              <template v-slot:prepend>
                <img :src="link.icon" width="24" class="iconBefore" alt="" />
              </template>
              <v-list-item-title class="link">
                <span> {{ link.title }}</span>
              </v-list-item-title>
            </v-list-item>
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

      <v-main
        class="d-flex align-center justify-center"
        style="min-height: 300px"
      >
        <slot></slot>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
@import '../assets/styles/fontePadrao.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

.iconBefore {
  margin-right: 20px;
}

span {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 15px;
}

.listItem:hover {
  background-color: #1bba47;
  border-radius: 10px;
}

.appBarStyle {
  background: #fff;
  box-shadow: 0px 0px 30px 0px rgba(17, 141, 59, 0.15);
}

.userInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.nameRole p {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  margin: 0;
}

.name {
  font-weight: 600;
}

.role {
  font-weight: 400;
}
</style>
