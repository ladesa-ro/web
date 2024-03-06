<script setup></script>

<template>
  <v-app class="app" style="z-index: 1;">
    <v-layout>
      <Appbar />
      <Sidebar />

      <v-main class="" style="min-height: 300px">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-app>
</template>

