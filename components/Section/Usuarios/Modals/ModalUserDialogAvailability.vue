<script setup lang="ts">
import { useFormUser } from '../Form/FormUser';
import FormUserAvailability from '../Form/FormUserAvailability.vue';

const { values: formValues } = useFormUser();

const possuiCargoDeProfessor = computed(() => {
	return formValues.vinculos.some((vinculo) =>
		vinculo.cargos.includes('professor')
	);
});
</script>

<template>
	<v-card
		v-if="possuiCargoDeProfessor"
		class="dialog-style overflow-auto max-w-[500px]"
	>
		<FormUserAvailability close="isActive.value = false" />
	</v-card>
</template>
