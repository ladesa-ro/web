<script setup lang="ts">
import { useForm } from 'vee-validate';
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

	vinculos: Array<{
		campus: { id: string };
		cargos: Array<'dape' | 'professor'>;
	}>;
};

const initialFormValues = reactive({
	imagem: null,
	nome: '',
	codigo: '',
	vinculos: [
		{
			campus: { id: null } as any,
			cargos: [null] as any,
		},
	] as any,
});

const schema = yup.object().shape({
	imagem: yup.mixed().nullable().optional(),

	nome: yup.string().required('Nome é obrigatório!'),

	email: yup.string().required('Email é obrigatório!'),

	vinculos: yup.array().of(
		yup.object({
			campus: yup.object({
				id: yup.string().required('Informe o campus deste vínculo!'),
			}),
			cargos: yup
				.array()
				.of(yup.string())
				.min(
					1,
					'O usuário deve possuir ao menos 1 cargo neste vínculo!'
				),
		})
	),
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
