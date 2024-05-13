<script setup lang="ts">
import * as yup from 'yup';

const $emit = defineEmits(['close']);

const schema = yup.object().shape({
	email: yup
		.string()
		.required('Email é obrigatório.')
		.email('Por favor, digite um e-mail válido!'),
});

const formData = {
	email: '',
};

const emailErrors = ref([]);

const submitForm = () => {
	schema
		.validate(formData, { abortEarly: false })
		.then(() => {
			console.log('Formulário válido, pronto para enviar!');
		})
		.catch((errors) => {
			emailErrors.value = errors.errors;
			console.error('Erro de validação:', errors);
		});
};
</script>

<template>
	<v-form @submit.prevent="submitForm" class="form">
		<div class="form-header">
			<h1 class="main-title text-center">
				<span>Redefinir Senha</span>
			</h1>
		</div>

		<v-divider class="my-4" />

		<div class="form-body modal-form">
			<VVTextField
				type="email"
				name="email"
				label="E-mail"
				placeholder="Digite aqui seu email"
				:error-messages="emailErrors"
			/>

			<!-- <span class="text-center">
								Um email de redefinição será enviado para você
								caso a conta exista
							</span> -->

			<v-alert
				class="text-sm"
				variant="flat"
				density="compact"
				text="Um email de redefinição será enviado para você caso a conta exista"
				type="info"
			></v-alert>
		</div>

		<v-divider />

		<div class="form-footer button-group">
			<UIButtonModalCancelButton
				class="buttonCancelar"
				@click="$emit('close')"
			>
				Cancelar
			</UIButtonModalCancelButton>
			<UIButtonModalResetButton class="buttonCadastro">
				Redefinir
			</UIButtonModalResetButton>
		</div>
	</v-form>
</template>

<style scoped>
.main-title {
	font-size: 24px;
	font-weight: 700;
}

.form {
	display: flex;
	flex-direction: column;
	padding: 32px;
}

.modal-form {
	display: flex;
	flex-direction: column;
	gap: 20px;
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
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: center;
		align-items: center;
	}

	.v-btn.buttonCancelar,
	.v-btn.buttonCadastro {
		padding: 6px 20px;
	}
}
</style>
