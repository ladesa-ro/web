<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import * as yup from 'yup';
import {
	useApiClient,
	useApiCursosFindOne,
	useApiTurmasFindOne,
} from '~/composables';
import { type ModalidadeFindOneResultDto } from '~/infrastructure/api/generated';

//

const props = defineProps({//props do modal criar e editar
	editId: {
		type: String,
		required: false,
		default: null,
	},
});

const editIdRef = toRef(props, 'editId');

const $emit = defineEmits(['close']);

const apiClient = useApiClient();
const queryClient = useQueryClient();

const { turma: currentTurma } = await useApiTurmasFindOne(editIdRef);

type FormValues = {
	imagem: Blob | null | undefined;

	curso: {
		id: string | null;
	};
	ambientePadraoAula: {
		id: string | null;
	};

	periodo: string;
};

type FormOutput = {
	imagem: Blob | null | undefined;

	curso: {
		id: string;
	};

	ambientePadraoAula: {
		id: string;
	} | null;

	periodo: string;
};

const initialFormValues = reactive({
	imagem: null,
	curso: {
		id: currentTurma.value?.curso?.id ?? null,
	},
	ambientePadraoAula: {
		id: currentTurma.value?.ambientePadraoAula?.id ?? null,
	},
	periodo: currentTurma.value?.periodo ?? '',
});

const handleDelete = async () => {
	const resposta = window.confirm(
		'Você tem certeza de que deseja deletar esta turma?'
	);

	if (resposta) {
		await apiClient.turmas.turmaDelete({ id: editIdRef.value });
		await queryClient.invalidateQueries({ queryKey: ['turmas'] });
		$emit('close');
	}
};

const schema = yup.object().shape({
	imagem: yup.mixed().nullable().optional(),

	curso: yup.object().shape({
		id: yup.string().required('Curso é obrigatório!'),
	}),

	ambientePadraoAula: yup.object().shape({
		id: yup.string().uuid().nullable().optional(),
	}),

	periodo: yup.string().required('Período é obrigatório!'),

	// serie: yup.string().required('Série é obrigatório!'),
	// letra: yup.string().required('Letra é obrigatório!'),
});

const {
	resetForm,
	handleSubmit,
	setFieldValue,
	values: formValues,
} = useForm<FormValues, FormOutput>({
	validationSchema: schema,
	initialValues: initialFormValues,
});

const onSubmit = handleSubmit(async (values: FormOutput) => {

	const editId = editIdRef.value;

	const { imagem, ...data } = values;

	let id;

	if (editId === null) {
		const turmaCriada = await apiClient.turmas.turmaCreate({ requestBody: { ...data } });
		id = turmaCriada.id;
	}
	else {
		await apiClient.turmas.turmaUpdate({
			id: editId,

			requestBody: {
				id: editId,
				...values,
			},
		});

		id = editId;
	}

	if (imagem) {
		await apiClient.turmas.turmaSetImagemCapa({ id: id, formData: { file: imagem } });
	}

	await queryClient.invalidateQueries({
		queryKey: ['turmas'],
	});

	resetForm();
	$emit('close');
}, console.error);

const verificarModalidade = (
	modalidade: ModalidadeFindOneResultDto
): 'serie-turma' | 'periodo' | 'nao-implementado' => {
	switch (modalidade.id) {
		case '1f08fe79-8f99-493b-ade1-fe082b4761e1':
		case 'aab71668-9dfc-46ae-8593-99dcb616a88d': {
			return 'serie-turma';
		}

		case '3ec92df1-1c11-4990-8664-f17fbbd3ca41':
		case '2fcfc6cb-8f79-44ff-9c06-96a6a955005b':
		case 'c6079567-5975-4247-b8bc-892eeeeb1451': {
			return 'periodo';
		}

		default: {
			return 'nao-implementado';
		}
	}
};

const { curso: cursoSelecionado } = await useApiCursosFindOne(
	computed(() => formValues?.curso?.id)
);

const estrategiaModalidade = computed(() => {
	return (
		cursoSelecionado.value &&
		verificarModalidade(cursoSelecionado.value.modalidade)
	);
});

const serie = computed({
	get: () => formValues.periodo,
	set: (value) => {
		formValues.periodo = value;
	},
});

const letra = computed({
	get: () => formValues.periodo,
	set: (value) => {
		formValues.periodo = value;
	},
});
</script>

<template>
	<v-form @submit.prevent="onSubmit" class="form">
		<div class="form-header">
			<h1 class="main-title">
				<span v-if="editId">Editar Turma</span>
				<span v-else>Cadastrar Nova Turma</span>
			</h1>
		</div>

		<v-divider class="my-4" />

		<div class="form-body modal-form">
			<UISelectImage :modelValue="formValues.imagem" @update:modelValue="($e) => setFieldValue('imagem', $e, true)" />

			<VVAutocompleteCurso name="curso.id" />

			<VVAutocompleteAmbiente name="ambientePadraoAula.id" label="Sala de Aula" />

			<template v-if="cursoSelecionado">
				<div v-if="estrategiaModalidade === 'serie-turma'" class="grid grid-cols-[2fr,1fr] gap-4">
					<VVTextField type="text" name="serie" label="Série" v-model="serie" placeholder="1°, 2°, 3°..." />

					<VVTextField type="text" name="letra" label="Letra" v-model="letra" placeholder="A, B, C..." />
				</div>

				<template v-else-if="estrategiaModalidade === 'periodo'">
					<VVTextField type="text" name="periodo" label="Período" v-model="formValues.periodo"
						placeholder="1° Período, 2° Período, 3° Período..." />
				</template>

				<template v-else>
					<v-alert type="warning">
						O sistema ainda não suporta o cadastro de turmas para a
						modalidade
						{{ cursoSelecionado.modalidade.nome }}.
					</v-alert>
				</template>
			</template>
		</div>

		<v-divider />

		<div class="form-footer button-group">
			<UIButtonModalCancelButton @click="$emit('close')" />

			<UIButtonModalDeleteButton @click.prevent="handleDelete" v-if="editId" />

			<UIButtonModalEditButton v-if="editId" />
			<UIButtonModalSaveButton v-else />
		</div>
	</v-form>
</template>

<style scoped>
/* .form {
	overflow: hidden;
}

.form-body {
	overflow: auto;
} */

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
