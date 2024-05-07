<script setup>
import { ref } from 'vue';
import Appbar from '~/components/Appbar/Appbar.vue';
import Sidebar from '~/components/Sidebar/Sidebar.vue';
import { useCustomTheme } from '~/composables/useCustomTheme';

const { isDark } = useCustomTheme();

const habumguerActive = ref(false);
</script>

<template>
	<v-app class="app" :theme="isDark ? 'dark' : 'light'" style="z-index: 1">
		<v-layout class="layout">
			<v-app-bar
				height="72"
				:elevation="0"
				style="box-shadow: 0px 0px 30px 0px rgba(17, 141, 59, 0.15)"
				class="sticky w-full !border-solid !border-[#dddddd] !border-b-[1px]"
			>
				<Appbar v-model="habumguerActive" />
			</v-app-bar>

			<Sidebar v-model="habumguerActive" />

			<v-main class="main">
				<slot></slot>
			</v-main>
		</v-layout>
	</v-app>
</template>

<style scoped>
.main {
	overflow: auto;
}

.layout {
	overflow: hidden;

	height: 100vh; /* fallback para caso o dispositivo não suporte dvh */

	height: 100dvh;
}
</style>
