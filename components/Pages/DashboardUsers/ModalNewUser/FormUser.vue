<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import * as yup from 'yup';

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

type FormOutput = {
	imagem: Blob | null | undefined;

	nome: string;

	codigo: string;
};

type FormValues = {
	imagem: Blob | null | undefined;
	nome: string;

	email: string;
};

const initialFormValues = reactive({
	imagem: null,
	nome: '',
	codigo: '',
});

const schema = yup.object().shape({
	imagem: yup.mixed().nullable().optional(),

	nome: yup.string().required('Nome é obrigatório!'),

	email: yup.string().required('Email é obrigatório!'),
});

const {
	resetForm,
	handleSubmit,
	values: formValues,
} = useForm<FormValues, FormOutput>({
	validationSchema: schema,
	initialValues: initialFormValues,
});

const onSubmit = handleSubmit(async (values: FormOutput) => {
	const editId = editIdRef.value;

	const { imagem, ...data } = values;

	resetForm();
	$emit('close');
}, console.error);


const nome = computed({
	get: () => formValues.nome,
	set: (value) => {
		formValues.nome = value;
	},
});
const email = computed({
	get: () => formValues.email,
	set: (value) => {
		formValues.email = value;
	},
});
</script>

<template>
	<v-form @submit.prevent="onSubmit" class="p-5 overflow-auto">
		<div class="modal">
			<div class="form-header">
				<h1 class="main-title">
					<span v-if="editId">Editar Turma</span>
					<span v-else>Cadastrar Nova Turma</span>
				</h1>
			</div>

			<v-divider class="my-4" />
			<div class="flex flex-col gap-5">
				<VVSelectImage name="imagem" />

				<VVTextField
					v-model="nome"
					type="text"
					label="Nome"
					placeholder="Digite aqui"
					name="nome"
				/>

				<VVTextField
					v-model="email"
					type="text"
					label="Email"
					placeholder="Digite aqui"
					name="email"
				/>

				<div class="flex gap-5 items-center">
					<VVAutocompleteCampus name="campus" />
					<PagesDashboardUsersModalNewUserFuncao
						class="w-auto min-w-[10.65rem]"
					/>
				</div>
			</div>
			<div class="form-footer button-group">
				<UIButtonModalCancelButton @click="$emit('close')" />

				<UIButtonModalEditButton v-if="editId" />
				<UIButtonModalSaveButton v-else />
			</div>
		</div>

		<!-- <div class="modal2">
      <h1 class="hDispo">Disponibilidade</h1>

      <div>
        <PagesDashboardUsersFormsDisponibilidade />
      </div>
    </div> -->
	</v-form>
</template>

<style scoped>
h1 {
	font-size: 16px;
}

.modal {
	background-color: white;
	color: black;
	border-radius: 0.5rem;
	text-align: center;
}

.modal2 {
	background-color: white;
	color: black;
	border-radius: 0.5rem;
	text-align: center;
	box-shadow:
		0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 8px 10px -6px rgba(0, 0, 0, 0.1);
	padding: 1.5rem;
	width: 390px;
	z-index: 10000;
	margin-left: 20px;
	height: 600px;
}

.Cad,
.Cancel {
	font-weight: 700;
}

.Cancel {
	margin-right: 70px;
}

.Cad {
	margin-left: 110px;
}

.Cad:hover {
	color: #00d047;
	transition: stroke 0.3s ease;
}

.Cad:hover .svgCad {
	stroke: #00d047;
	transition: stroke 0.2s ease;
}

.svgCad,
.svgCancel {
	stroke: black;
	vertical-align: middle;
	margin-bottom: 2px;
	margin-left: 8px;
}

.Cancel:hover {
	color: #e9001c;
	transition: stroke 0.2s ease;
}

.Cancel:hover .svgCancel {
	stroke: #e9001c;
	transition: stroke 0.2s ease;
}

.hDispo {
	margin-left: 10px;
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
