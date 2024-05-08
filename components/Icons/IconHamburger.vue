<template>
	<div class="-icon-black cursor-pointer pl-3 -icon-menu" v-html="HamburguerOff">
	</div>
</template>

<script lang="ts" setup>
	import HamburguerOff from "@/assets/icons/Hamburguer/Hamburguer-Off.svg?raw";
</script>

<style scoped>
	.-icon-menu {
		width: 45px;
	}
</style>
