<script lang="ts" setup></script>

<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel class="border-[#9AB69E] border-2 rounded-lg">
        <v-expansion-panel-title
          class="custom-panel-title border-none"
          collapse-icon=""
          expand-icon=""
        >
          <div class="flex flex-row justify-between items-center w-full">
            <p
              class="font-medium text-sm sm:text-[16px] no-underline inline-block"
            >
              Month
            </p>
            <div class="icons">
              <IconsArrowIconArrow class="text-[#118D3B] rotate-[-90deg]" />
            </div>
          </div>
        </v-expansion-panel-title>

        <!-- List -->
        <v-expansion-panel-text>
          <h1>Content</h1>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped></style>
