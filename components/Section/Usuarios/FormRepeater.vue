<script setup lang="ts">
import { useField } from 'vee-validate';

const { value: vinculos } = useField<any[]>('vinculos');

const addField = () => {
	// spread operator
	// rest operator
	vinculos.value = [...vinculos.value, { campus: { id: null }, cargos: [] }];
};

const removeField = (targetIndex: number) => {
	if (targetIndex > 0) {
		vinculos.value = vinculos.value.filter((_, idx) => idx !== targetIndex);
	}
};
</script>

<template>
	<div v-for="(_, index) in vinculos" :key="index">
		<div class="flex gap-5 items-start">
			<VVAutocompleteCampus :name="`vinculos[${index}].campus.id`" />

			<VVSelectRoles
				class="w-full max-w-[10.65rem]"
				:name="`vinculos[${index}].cargos`"
			/>

			<v-btn
				v-if="index > 0"
				class="my-[0.625rem]"
				variant="flat"
				icon="mdi-delete"
				density="compact"
				@click="removeField(index)"
			/>
		</div>
	</div>

	<button
		type="button"
		@click="addField"
		class="border-dotted border-1 pa-4 border-black"
	>
		Novo Vínculo
	</button>
</template>

<!-- <script>
export default {
	data() {
		return {
			fields: [{ value: '' }], // Initialize with an empty field
		};
	},
	methods: {
		addField() {
			this.fields.push({ value: '' });
		},
		removeField() {
			if (this.fields.length > 1) {
				this.fields.pop();
			}
		},
	},
};
</script> -->
