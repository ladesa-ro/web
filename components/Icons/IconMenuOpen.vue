<template>
	<div class="-icon-black cursor-pointer pl-3 w-11 -icon-menu" v-html="HamburguerOn">
	</div>
</template>

<script lang="ts" setup>
	import HamburguerOn from "@/assets/icons/Hamburguer/Hamburguer-On.svg?raw";
</script>

<style scoped>
	.-icon-menu {
		width: 45px;
	}
</style>
