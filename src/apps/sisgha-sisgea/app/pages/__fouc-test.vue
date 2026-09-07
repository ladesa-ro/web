<script setup lang="ts">
import { Button, IconHome, IconSettings } from '@ladesa-ro/web.ui';

definePageMeta({ auth: false });

const { changeTheme, isDark } = useCustomTheme();
</script>

<template>
  <div style="padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem">
    <button type="button" @click="changeTheme">
      Alternar tema (atual: {{ isDark ? 'dark' : 'light' }})
    </button>

    <div style="display: flex; gap: 1rem; align-items: center">
      <IconHome style="width: 2rem" />
      <IconSettings style="width: 2rem" />
      <Button>
        <template #start-icon>
          <IconHome />
        </template>
        Ação
      </Button>
    </div>
  </div>
</template>
