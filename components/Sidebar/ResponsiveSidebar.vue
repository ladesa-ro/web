<script setup lang="ts">
import { useMonitorSize } from '~/composables/monitor-size';
import Mobile from './MobileSidebar.vue';
import Web from './WebSidebar.vue';

const sizes = useMonitorSize();

</script>

<template>
    <Mobile v-if="sizes.isMobile.value" />
    <Web v-else />
</template>
