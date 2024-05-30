<script setup lang="ts">
import { useFormUser, type FormUserOutput } from './FormUser';

const props = defineProps({
	//props do modal criar e editar
	editId: {
		type: String,
		required: false,
		default: null,
	},
});

const editIdRef = toRef(props, 'editId');

const $emit = defineEmits(['close']);

const { resetForm, handleSubmit } = useFormUser();

const onSubmit = handleSubmit(async (values: FormUserOutput) => {
	const editId = editIdRef.value;

	const { imagem, ...data } = values;

	resetForm();
	$emit('close');
}, console.error);
</script>

<template>
	<v-form @submit.prevent="onSubmit" class="p-5 overflow-auto">
		<div class="modal">
			<div class="form-header">
				<h1 class="main-title">
					<span v-if="editId">Editar Usuário</span>
					<span v-else>Cadastrar Usuário</span>
				</h1>
			</div>

			<v-divider class="my-4" />
			<div class="flex flex-col gap-5">
				<VVSelectImage name="imagem" />

				<VVTextField
					type="text"
					label="Nome"
					placeholder="Digite aqui"
					name="nome"
				/>

				<VVTextField
					type="text"
					label="Email"
					placeholder="Digite aqui"
					name="email"
				/>

				<SectionUsuariosFormRepeater />
			</div>
			<div class="form-footer button-group">
				<UIButtonModalCancelButton @click="$emit('close')" />

				<UIButtonModalEditButton v-if="editId" />
				<UIButtonModalSaveButton v-else />
			</div>
		</div>
		<!-- <div
			v-if="
				formValues.vinculos.some((vinculo) =>
					vinculo.cargos.includes('professor')
				)
			"
		>
			<Disponibilidade />
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
		</div> -->

		<!-- <div class="modal2">
      <h1 class="hDispo">Disponibilidade</h1>

      <div>
		2 modal
        
      </div>
    </div> -->
	</v-form>
</template>

<style scoped>
.modal {
	text-align: center;
}

.form {
	overflow: auto;
}

.modal-form {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.main-title {
	font-size: 24px;
	font-weight: 700;
}

.form {
	display: flex;
	flex-direction: column;
	text-align: center;
	padding: 32px;
}

.button-group {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	margin-top: 20px;
	gap: 20px;
}

.button {
	font-weight: 700;
	margin-top: 20px;
	cursor: pointer;
	border: none;
}

.v-btn.buttonCancelar,
.v-btn.buttonCadastro {
	padding: 6px 20px;
	border-radius: 8px;
	height: auto;
	text-transform: none;
}

@media screen and (max-width: 450px) {
	.button-group {
		flex-direction: column;
		gap: 10px;
	}

	.v-btn.buttonCancelar,
	.v-btn.buttonCadastro {
		padding: 6px 20px;
	}
}
</style>
