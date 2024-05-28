<template>
	<SelectBase
		label="Função"
		placeholder="Selecione"
		:items="['Professor', 'DAPE']"
		multiple
		:clearable="false"
	/>
</template>

<script setup>
import SelectBase from '~/components/UI/SelectBase/SelectBase.vue';
</script>
