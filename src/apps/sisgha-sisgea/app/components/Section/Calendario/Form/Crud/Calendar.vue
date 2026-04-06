<script lang="ts" setup>
import type {
  CalendarioLetivoEtapaInputDto,
  CalendarioLetivoEtapaOutputDto,
} from '@ladesa-ro/web.api.client';
import dayjs from 'dayjs';
import { useForm } from 'vee-validate';
import type Step from '~/components/VV/Calendar/Step.vue';
import { useCampusDoUsuario } from '~/composables/useCampusDoUsuario';
import { calendarSchema, type ICalendarFormValues } from './-Helpers/calendarSchema';

const calendarioLetivo = useCalendarioLetivo();
const ofertasFormacoes = useOfertasFormacoes();

type Props = {
  calendarId?: string;
  formStage: number;
};

const props = defineProps<Props>();
const _formStage = ref<number>(0);

const stepRefs = ref<InstanceType<typeof Step>[]>([]);
const loadedEtapas = ref<CalendarioLetivoEtapaOutputDto[]>([]);

const loadedEtapaMap = computed(() => {
  const map: Record<string, CalendarioLetivoEtapaOutputDto> = {};
  for (const etapa of loadedEtapas.value) {
    map[etapa.ofertaFormacaoPeriodoEtapaId] = etapa;
  }
  return map;
});

const createdCalendarId = ref<string>('');

const { values, validate, setFieldValue } = useForm<ICalendarFormValues>({
  validationSchema: calendarSchema,
  initialValues: calendarSchema.getDefault(),
});

const { campusId: campusUsuarioDefault } = useCampusDoUsuario();

const isEditMode = computed(() => !!props.calendarId);

// Query reativa: carrega calendário existente para edição
const calendarQuery = calendarioLetivo.findOne(
  computed(() => props.calendarId ?? null),
);

watch(
  () => calendarQuery.data.value,
  (cal) => {
    if (!cal) return;
    setFieldValue('calendarName', cal.nome);
    setFieldValue('calendarYear', cal.ano);
    setFieldValue('campus', cal.campus?.id ?? '');
    nextTick(() => setFieldValue('trainingOffer', cal.ofertaFormacao?.id ?? ''));
    createdCalendarId.value = cal.id;
    loadedEtapas.value = cal.etapas ?? [];
  },
  { immediate: true },
);

// Query reativa: carrega períodos da formação selecionada
const formacaoQuery = ofertasFormacoes.findOne(
  computed(() => values.trainingOffer || null),
);

const formacaoPeriodos = computed(
  () => formacaoQuery.data.value?.periodos ?? [],
);

// Campus default para criação
watch(campusUsuarioDefault, newCampusId => {
  if (newCampusId && !isEditMode.value && !values.campus) {
    setFieldValue('campus', newCampusId);
  }
}, { immediate: true });

watch(
  () => values.campus,
  (_newVal, oldVal) => {
    if (oldVal) {
      setFieldValue('trainingOffer', '');
    }
  }
);

async function collectEtapas(): Promise<CalendarioLetivoEtapaInputDto[]> {
  const etapas: CalendarioLetivoEtapaInputDto[] = [];

  for (const stepRef of stepRefs.value) {
    if (!stepRef) continue;

    const valid = await stepRef.validateStep();
    if (!valid) throw new Error('Etapa com dados inválidos');

    etapas.push(stepRef.getValues());
  }

  return etapas;
}

async function onSubmit(): Promise<string> {
  const etapas = await collectEtapas();

  if (isEditMode.value && props.calendarId) {
    await calendarioLetivo.update(props.calendarId, {
      nome: values.calendarName ?? '',
      ano: values.calendarYear ?? dayjs().year(),
      campus: { id: values.campus ?? '' },
      ofertaFormacao: { id: values.trainingOffer ?? '' },
      etapas,
    });
    await calendarioLetivo.invalidate();
    return props.calendarId;
  }

  const created = await calendarioLetivo.create({
    nome: values.calendarName ?? '',
    ano: values.calendarYear ?? dayjs().year(),
    campus: { id: values.campus ?? '' },
    ofertaFormacao: { id: values.trainingOffer ?? '' },
    etapas,
  });

  await calendarioLetivo.invalidate();
  return created && typeof created === 'object' && 'id' in created
    ? String(created.id)
    : '';
}

const formValidation = async (): Promise<boolean> => {
  const { valid } = await validate();
  if (!valid) return false;
  return true;
};

const validCalendarCrud = async (): Promise<boolean> => {
  if (await formValidation()) {
    try {
      createdCalendarId.value = await onSubmit();
      return true;
    } catch (e) {
      console.error('Erro ao salvar calendário com etapas:', e);
      return false;
    }
  }
  return false;
};

defineExpose({ validCalendarCrud, formValidation });

watch(
  () => props.formStage,
  n => { _formStage.value = n; },
  { immediate: true }
);
</script>

<template>
  <div>
    <div v-show="_formStage === 1" class="flex flex-col gap-4 overflow-visible">
      <VVTextField
        name="calendarName"
        type="text"
        label="Nome"
        placeholder="Digite aqui"
      />

      <VVTextField
        name="calendarYear"
        type="number"
        label="Ano Letivo"
        placeholder="Digite aqui"
      />

      <VVAutocompleteAPICampus name="campus" label="Campus" />

      <VVAutocompleteAPIOfertaFormacao
        name="trainingOffer"
        label="Formação"
        :disabled="!values.campus"
        :campus-id="values.campus"
      />
    </div>

    <div v-show="_formStage === 2" class="flex flex-col gap-4 pr-2">
      <template v-for="periodo in formacaoPeriodos" :key="periodo.id">
        <h3 class="font-bold text-lg mt-2">
          Período {{ periodo.numeroPeriodo }}
        </h3>
        <VVCalendarStep
          v-for="etapa in periodo.etapas"
          :key="etapa.id"
          ref="stepRefs"
          :oferta-formacao-periodo-etapa-id="etapa.id"
          :etapa-nome="etapa.nome"
          :etapa-cor="loadedEtapaMap[etapa.id]?.cor ?? etapa.cor"
          :data-inicio="loadedEtapaMap[etapa.id]?.dataInicio"
          :data-termino="loadedEtapaMap[etapa.id]?.dataTermino"
          :text="etapa.nome"
        />
      </template>
    </div>
  </div>
</template>
