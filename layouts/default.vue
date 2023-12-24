<template>
  <v-app class="app">
    <v-layout>
      <Appbar />
      <Sidebar />

      <v-main class="" style="min-height: 300px">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup></script>
