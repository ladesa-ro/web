<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from '~/composables/useToast';

const { showToast } = useToast();

type Props = {
  editId?: string | null;
};

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

const editIdRef = toRef(props, 'editId');

//

const $emit = defineEmits(['close']);

const ofertasFormacoes = useOfertasFormacoes();
const confirmDelete = useConfirmDelete();
const campusContext = useCampusContext();

const findOneQuery = ofertasFormacoes.findOne(editIdRef);
const currentFormacao = findOneQuery.data;
await findOneQuery.suspense();

// Stepper
const step = ref(1);

// Duration options
const duracaoOptions = [
  { label: 'Mensal', value: 1 },
  { label: 'Bimestral', value: 2 },
  { label: 'Trimestral', value: 3 },
  { label: 'Quadrimestral', value: 4 },
  { label: 'Semestral', value: 6 },
  { label: 'Anual', value: 12 },
];

// Etapas/periodos state (managed outside vee-validate)
type Etapa = { nome: string; cor: string };
type Periodo = { numeroPeriodo: number; etapas: Etapa[] };

const defaultColors = [
  '#39cfed',
  '#ed393c',
  '#2f9e41',
  '#b8a003',
  '#7c3aed',
  '#f97316',
];

const buildDefaultPeriodos = (duracaoMeses: number): Periodo[] => {
  const numPeriodos = Math.floor(12 / duracaoMeses);
  return Array.from(
    { length: numPeriodos },
    (_, i): Periodo => ({
      numeroPeriodo: i + 1,
      etapas: [{ nome: 'Período letivo', cor: defaultColors[0] ?? '#39cfed' }],
    })
  );
};

const periodos = ref<Periodo[]>(
  currentFormacao.value?.periodos?.map(
    (p: {
      numeroPeriodo: number;
      etapas: Array<{ nome: string; cor: string }>;
    }): Periodo => ({
      numeroPeriodo: p.numeroPeriodo,
      etapas: p.etapas.map(
        (e: { nome: string; cor: string }): Etapa => ({
          nome: e.nome,
          cor: e.cor,
        })
      ),
    })
  ) ?? []
);

// ---- State saved outside vee-validate so steps don't lose data ----
const savedFormData = reactive({
  campusId:
    currentFormacao.value?.campus?.id ?? campusContext.value ?? (null as string | null),
  nome: currentFormacao.value?.nome ?? '',
  slug: currentFormacao.value?.slug ?? '',
  duracaoPeriodoEmMeses: currentFormacao.value?.duracaoPeriodoEmMeses ?? 6,
  modalidadeId:
    currentFormacao.value?.modalidade?.id ?? (null as string | null),
  niveisFormacoes:
    currentFormacao.value?.niveisFormacoes?.map((n: { id: string }) => n.id) ??
    ([] as string[]),
});

if (periodos.value.length === 0) {
  periodos.value = buildDefaultPeriodos(savedFormData.duracaoPeriodoEmMeses);
}

// Schema for step 1 validation
const schema = yup.object().shape({
  campus: yup.object().shape({
    id: yup.string().required('Campus é obrigatório!'),
  }),
  nome: yup.string().required('Nome é obrigatório!'),
  slug: yup.string().required('Nome abreviado é obrigatório!'),
  duracaoPeriodoEmMeses: yup
    .number()
    .required('Duração do período é obrigatória!'),
  modalidade: yup.object().shape({
    id: yup.string().required('Modalidade é obrigatória!'),
  }),
  niveisFormacoes: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Selecione ao menos um nível de formação!'),
});

const {
  resetForm,
  validate,
  values: formValues,
} = useForm({
  validationSchema: schema,
  initialValues: {
    campus: { id: savedFormData.campusId },
    nome: savedFormData.nome,
    slug: savedFormData.slug,
    duracaoPeriodoEmMeses: savedFormData.duracaoPeriodoEmMeses,
    modalidade: { id: savedFormData.modalidadeId },
    niveisFormacoes: [...savedFormData.niveisFormacoes],
  },
});

watch(
  () => formValues.duracaoPeriodoEmMeses,
  newVal => {
    if (newVal && newVal > 0) {
      periodos.value = buildDefaultPeriodos(newVal);
    }
  }
);

const numeroPeriodos = computed(() => {
  const dur = formValues.duracaoPeriodoEmMeses;
  if (!dur || dur <= 0) return 0;
  return Math.floor(12 / dur);
});

const duracaoLabel = computed(() => {
  const opt = duracaoOptions.find(
    o => o.value === formValues.duracaoPeriodoEmMeses
  );
  return opt?.label ?? '';
});

const addEtapa = (periodoIndex: number) => {
  const periodo = periodos.value[periodoIndex];
  if (!periodo) return;
  const colorIndex = periodo.etapas.length % defaultColors.length;
  periodo.etapas.push({
    nome: '',
    cor: defaultColors[colorIndex] ?? '#39cfed',
  });
};

const removeEtapa = (periodoIndex: number, etapaIndex: number) => {
  const periodo = periodos.value[periodoIndex];
  if (!periodo) return;
  if (periodo.etapas.length > 1) {
    periodo.etapas.splice(etapaIndex, 1);
  }
};

// Save form state before switching steps
const saveStep1 = () => {
  savedFormData.campusId = formValues.campus?.id ?? null;
  savedFormData.nome = formValues.nome;
  savedFormData.slug = formValues.slug;
  savedFormData.duracaoPeriodoEmMeses = formValues.duracaoPeriodoEmMeses;
  savedFormData.modalidadeId = formValues.modalidade?.id ?? null;
  savedFormData.niveisFormacoes = [...(formValues.niveisFormacoes ?? [])];
};

const goToStep2 = async () => {
  const { valid } = await validate();
  if (valid) {
    saveStep1();
    step.value = 2;
  }
};

const goToStep1 = () => {
  // Restore saved data into vee-validate form
  resetForm({
    values: {
      campus: { id: savedFormData.campusId },
      nome: savedFormData.nome,
      slug: savedFormData.slug,
      duracaoPeriodoEmMeses: savedFormData.duracaoPeriodoEmMeses,
      modalidade: { id: savedFormData.modalidadeId },
      niveisFormacoes: [...savedFormData.niveisFormacoes],
    },
  });
  step.value = 1;
};

const handleDelete = async () => {
  const id = editIdRef.value;
  if (!id) return;

  const confirmacao = await confirmDelete.confirm();
  if (!confirmacao) return;

  try {
    await ofertasFormacoes.remove(id);
    await ofertasFormacoes.invalidate();
    showToast('delete', 'success');
    $emit('close');
  } catch (e) {
    showToast('delete', 'error');
  }
};

const onSubmit = async () => {
  const editId = editIdRef.value ?? null;

  // Use savedFormData (validated and saved when user clicked "Avançar")
  const requestBody = {
    nome: savedFormData.nome,
    slug: savedFormData.slug,
    duracaoPeriodoEmMeses: savedFormData.duracaoPeriodoEmMeses,
    modalidade: { id: savedFormData.modalidadeId! },
    campus: { id: savedFormData.campusId ?? '' },
    niveisFormacoes: savedFormData.niveisFormacoes.map((id: string) => ({
      id,
    })),
    periodos: periodos.value.map(p => ({
      numeroPeriodo: p.numeroPeriodo,
      etapas: p.etapas
        .filter(e => e.nome.trim() !== '')
        .map(e => ({
          nome: e.nome,
          cor: e.cor,
        })),
    })),
  };

  try {
    if (!editId) {
      await ofertasFormacoes.create(requestBody);
      showToast('cadastro', 'success');
    } else {
      await ofertasFormacoes.update(editId, requestBody);
      showToast('atualizacao', 'success');
    }

    await ofertasFormacoes.invalidate();
    resetForm();
    $emit('close');
  } catch (e) {
    showToast('cadastro', 'error');
    console.error(e);
  }
};

function onClose() {
  $emit('close');
}
</script>

<template>
  <form @submit.prevent="step === 2 ? onSubmit() : goToStep2()">
    <DialogModalBaseLayout
      :on-close="onClose"
      :title="
        step === 1
          ? editId
            ? 'Editar formação'
            : 'Cadastrar formação'
          : editId
            ? 'Editar etapas do ano letivo'
            : 'Cadastrar etapas do ano letivo'
      "
    >
      <!-- Step 1: Basic Info -->
      <template v-if="step === 1">
        <VVAutocompleteAPICampus name="campus.id" />

        <VVTextField
          label="Nome"
          name="nome"
          placeholder="Digite aqui"
          type="text"
        />

        <VVTextField
          label="Nome abreviado"
          name="slug"
          placeholder="Digite aqui"
          type="text"
        />

        <VVAutocompleteAPIModalidade name="modalidade.id" />

        <VVAutocompleteAPINivelFormacao name="niveisFormacoes" multiple />

        <VVTextField
          label="Duração de cada período (meses)"
          name="duracaoPeriodoEmMeses"
          placeholder="6"
          type="number"
        />

        <div v-if="duracaoLabel" class="info-box">
          <IconsInfo class="info-icon" />
          <span class="info-text">
            A duração de cada período foi definida como "{{ duracaoLabel }}" e,
            portanto, em um único ano letivo há {{ numeroPeriodos }}
            {{ numeroPeriodos === 1 ? 'período' : 'períodos' }}. Clique em
            "Avançar" para definir as etapas de cada período.
          </span>
        </div>
      </template>

      <!-- Step 2: Etapas (plain inputs, managed by periodos ref) -->
      <template v-if="step === 2">
        <div v-if="editId" class="warning-box">
          <IconsWarning class="warning-icon" />
          <span class="warning-text">
            As edições nas etapas do ano letivo não terão efeito em calendários
            já existentes vinculados a essa formação, somente em calendários
            criados posteriormente.
          </span>
        </div>

        <div
          v-for="(periodo, pIndex) in periodos"
          :key="pIndex"
          class="periodo-section"
        >
          <div class="periodo-header">
            <span class="periodo-title">
              Período {{ periodo.numeroPeriodo }}
            </span>
            <hr class="border border-ldsa-grey flex-1" />
          </div>

          <div
            v-for="(etapa, eIndex) in periodo.etapas"
            :key="eIndex"
            class="flex items-center gap-2"
          >
            <div class="etapa-color-wrapper">
              <input
                v-model="etapa.cor"
                type="color"
                class="etapa-color-input"
              />
              <div
                class="etapa-color-preview"
                :style="{ backgroundColor: etapa.cor }"
              />
            </div>

            <div class="input-base flex-1">
              <label>Nome</label>
              <input
                v-model="etapa.nome"
                type="text"
                placeholder="Nome da etapa"
                class="w-full outline-none"
              />
            </div>

            <button
              v-if="periodo.etapas.length > 1"
              type="button"
              class="shrink-0 flex justify-center text-ldsa-red h-12 w-7 hover:bg-ldsa-red/10 rounded-sm"
              @click="removeEtapa(pIndex, eIndex)"
            >
              <IconsExclude class="w-5" />
            </button>
          </div>

          <button
            type="button"
            class="flex justify-center gap-3 border-dotted border-3 rounded-lg p-4 border-ldsa-grey hover:bg-ldsa-grey/10 transition-[background-color] text-ldsa-text-default"
            @click="addEtapa(pIndex)"
          >
            Adicionar etapa
            <IconsAdd class="w-4" />
          </button>
        </div>
      </template>

      <template #button-group>
        <UIButtonModalCancel v-if="step === 1" @click="$emit('close')" />
        <UIButtonModalBaseLayout
          v-if="step === 1"
          text="Avançar"
          color="var(--ladesa-green-2-color)"
          type="submit"
        >
          <IconsArrowAlt class="rotate-180" />
        </UIButtonModalBaseLayout>

        <UIButtonModalGoBack v-if="step === 2" @click="goToStep1" />
        <UIButtonModalCancel v-if="step === 2" @click="$emit('close')" />
        <UIButtonModalDelete
          v-if="step === 2 && editId"
          @click.prevent="handleDelete"
        />
        <UIButtonModalEdit v-if="step === 2 && editId" />
        <UIButtonModalSave v-if="step === 2 && !editId" />
      </template>
    </DialogModalBaseLayout>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Você tem certeza que deseja deletar essa formação?"
    @confirm="confirmDelete.onConfirm"
    @cancel="confirmDelete.onCancel"
  />
</template>

<style scoped src="~/components/UI/Form/-Utils/style/inputStyles.css"></style>

<style scoped>
@reference "~/assets/styles/app.css";

.info-box {
  @apply flex items-center gap-3 rounded-md px-3 py-2.5;
  background-color: rgb(from var(--ladesa-blue-color) R G B / 0.1);
  border: 1px solid rgb(from var(--ladesa-blue-color) R G B / 0.15);
}

.info-icon {
  @apply w-4 h-4 shrink-0;
  color: var(--ladesa-blue-color);
}

.info-text {
  @apply text-xs leading-relaxed;
  color: var(--ladesa-blue-color);
}

.warning-box {
  @apply flex items-center gap-3 rounded-md px-3 py-2.5;
  background-color: rgb(from var(--ladesa-yellow-color) R G B / 0.1);
  border: 1px solid rgb(from var(--ladesa-yellow-color) R G B / 0.15);
}

.warning-icon {
  @apply w-5 h-5 shrink-0;
  color: var(--ladesa-yellow-color);
}

.warning-text {
  @apply text-xs leading-relaxed;
  color: var(--ladesa-yellow-color);
}

.periodo-section {
  @apply flex flex-col gap-4;
}

.periodo-header {
  @apply flex items-center gap-3;
}

.periodo-title {
  @apply text-sm font-semibold text-ldsa-text-default whitespace-nowrap;
}

.etapa-color-wrapper {
  @apply relative shrink-0 w-11 h-11 border-2 border-ldsa-grey rounded-lg overflow-hidden cursor-pointer;
}

.etapa-color-input {
  @apply absolute inset-0 w-full h-full opacity-0 cursor-pointer;
}

.etapa-color-preview {
  @apply w-full h-full rounded;
}
</style>
