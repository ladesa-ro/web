<script setup lang="ts">
import Button from './ScheduleQueryButton.vue';
const editMode = defineModel<boolean>({ default: false });
</script>

<template>
  <span class="flex gap-2.5">
    <Button>
      <IconsSwap class="w-4" />
    </Button>

    <Button>
      <IconsReplace class="w-5" />
    </Button>

    <Button text="Limpar seleção">
      <IconsBroom class="w-4.5" />
    </Button>

    <Button text="Grade de grupos [ ]" />

    <Button @click="editMode = false" color="var(--ladesa-red-color)">
      <IconsIconClose class="w-4" />
    </Button>

    <Button @click="editMode = false" color="var(--ladesa-text-green-color)">
      <IconsIconConfirm class="w-5" />
    </Button>
  </span>
</template>
