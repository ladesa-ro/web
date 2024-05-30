<script lang="ts" setup>
import { ref } from 'vue';
import Disponibilidade from './Disponibilidade.vue';
import FormUser from './FormUser.vue';
import Teste from './Teste.vue';

import formValues from './FormUser.vue';

const props = defineProps({
	editId: {
		type: String,
		default: null,
		required: false,
	},
});

const editId = toRef(props, 'editId');

const isActive = ref(false);

</script>

<template>
	<v-dialog v-model="isActive">
		<template v-slot:activator="{ props: activatorProps }">
			<UIButtonAdd v-if="editId === null" v-bind="activatorProps" />
		</template>

		<template v-slot:="{ isActive }">
			<div
				class="flex flex-row justify-center gap-[16px] overflow-hidden"
			>
				<v-card class="dialog-style overflow-auto max-w-[400px]">
					<FormUser
						@close="isActive.value = false"
					/>
				</v-card>

				<v-card class="dialog-style overflow-auto max-w-[400px]">
					<Disponibilidade close="isActive.value = false" />
				</v-card>
				<!-- <div
					v-if="
						formValues.vinculos.some((teste) =>
							teste.cargos.includes('professor')
						)
					"
				>
					<Disponibilidade />
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div> -->
			</div>
		</template>
	</v-dialog>
</template>
<style scoped>
.dialog-style {
	border-radius: 14px !important;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border: solid 2px #9ab69e;
}

.detail {
	cursor: pointer;
	z-index: 10;
	margin-right: 16px;
}
</style>
