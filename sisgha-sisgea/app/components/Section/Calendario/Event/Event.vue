<script lang="ts" setup></script>

<template>
  <div
    class="flex flex-col border-2 border-ldsa-grey rounded-lg overflow-hidden p-5"
  >
    <!-- Head -->
    <div class="flex justify-between items-center">
      <!-- Color & Name -->
      <div class="flex gap-2 items-center">
        <!-- Color -->
        <div class="w-3 h-3 rounded-full bg-purple-600"></div>

        <!-- Name -->
        <h2 class="font-bold">Title</h2>
      </div>

      <!-- Notification Button -->
      <UIButtonNotification />
    </div>

    <!-- Content -->
    <ul>
      <!-- Start and End Date -->
      <li>
        <p>Início: <span>00/00</span> às <span>00:00</span></p>
      </li>
      <li>
        <p>Término: <span>00/00</span> às <span>00:00</span></p>
      </li>
    </ul>

    <p class="my-5">Começa em <span>0</span> dias.</p>

    <!-- Locale -->
    <SectionCalendarioEventLocale />
  </div>
</template>

<style></style>
