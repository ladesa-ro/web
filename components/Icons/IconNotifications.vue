<template>
	<div 
		v-html="Notificacao"
		click="$emit('click')"
		class="w-10 max-h-max flex items-center justify-center cursor-pointer"
	></div>
</template>

<script lang="ts" setup>
	import Notificacao from "@/assets/icons/Notificacao.svg?raw";
</script>
