<script lang="ts" setup>
import dayjs from 'dayjs';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import type Step from '~/components/VV/Calendar/Step.vue';
import { useCampusDoUsuario } from '~/composables/useCampusDoUsuario';
import {
  calendarioLetivoFindById,
  ofertaFormacaoFindAll,
  ofertaFormacaoFindById,
} from '@ladesa-ro/web.api.client';

const calendarioLetivo = useCalendarioLetivo();

type Props = {
  calendarId?: string;
  formStage: number;
};

const props = defineProps<Props>();
const _formStage = ref<number>(0);

type FormValues = {
  calendarName?: string;
  calendarYear?: number;
  trainingOffer?: string;
  campus?: string;
};

const calendarStepAmount = ref<number>(0);
const calendarRecoveryAmount = ref<number>(0);
const stepRefs = ref<InstanceType<typeof Step>[]>([]);

async function setCalendarStepAmount() {
  try {
    if (values.trainingOffer) {
      const offerSelected = async (): Promise<string> => {
        try {
          const getTraining = await getApiClient().call(
            ofertaFormacaoFindById,
            {
              path: {
                id: values.trainingOffer!,
              },
            }
          );
          if (getTraining) return getTraining.nome;
          return '';
        } catch {
          return '';
        }
      };

      const higherOffer = async (): Promise<string> => {
        try {
          const searchOffer = await getApiClient().call(ofertaFormacaoFindAll, {
            query: {
              search: `Superior`,
            },
          });
          const catchOffer = searchOffer.data?.find((offer: any) =>
            offer.nome.includes('Superior')
          );
          if (catchOffer) return catchOffer.nome;
          return '';
        } catch {
          return '';
        }
      };

      if ((await offerSelected()) === (await higherOffer())) {
        calendarStepAmount.value = 2;
        calendarRecoveryAmount.value = 1;
      } else {
        calendarStepAmount.value = 4;
        calendarRecoveryAmount.value = 2;
      }
    }
  } catch {}
}

const createdCalendarId = ref<string>('');

const schemaCalendar = yup.object({
  calendarName: yup.string().required('Nome inválido'),
  calendarYear: yup
    .number()
    .required('Ano letivo inválido')
    .min(2000, 'Ano inválido')
    .max(2125, 'Ano inválido'),
  campus: yup.string().required('Campus inválido'),
  trainingOffer: yup.string().required('Formação inválida'),
});

const { values, validate, setFieldValue } = useForm<FormValues>({
  validationSchema: schemaCalendar,
  initialValues: {
    calendarName: '',
    calendarYear: dayjs().year(),
    trainingOffer: '',
    campus: '',
  },
});

const { campusId: campusUsuarioDefault } = useCampusDoUsuario();

const isEditMode = computed(() => !!props.calendarId);

async function loadExistingCalendar() {
  if (!props.calendarId) return;
  try {
    const cal = await getApiClient().call(calendarioLetivoFindById, {
      path: { id: props.calendarId },
    });
    if (cal) {
      setFieldValue('calendarName', cal.nome);
      setFieldValue('calendarYear', cal.ano);
      setFieldValue('campus', cal.campus?.id ?? '');
      await nextTick();
      setFieldValue('trainingOffer', cal.ofertaFormacao?.id ?? '');
      createdCalendarId.value = cal.id;
    }
  } catch (e) {
    console.error('Erro ao carregar calendário para edição:', e);
  }
}

onMounted(async () => {
  if (isEditMode.value) {
    await loadExistingCalendar();
  } else if (campusUsuarioDefault.value) {
    setFieldValue('campus', campusUsuarioDefault.value);
  }
});

watch(campusUsuarioDefault, (newCampusId) => {
  if (newCampusId && !isEditMode.value && !values.campus) {
    setFieldValue('campus', newCampusId);
  }
});

watch(
  () => values.campus,
  (_newVal, oldVal) => {
    if (oldVal) {
      setFieldValue('trainingOffer', '');
    }
  }
);

async function onSubmit(): Promise<string> {
  if (isEditMode.value && props.calendarId) {
    await calendarioLetivo.update(props.calendarId, {
      nome: values.calendarName!,
      ano: values.calendarYear!,
      campus: { id: values.campus! },
      ofertaFormacao: { id: values.trainingOffer! },
    });
    await calendarioLetivo.invalidate();
    return props.calendarId;
  }

  const created = await calendarioLetivo.create({
    nome: values.calendarName!,
    ano: values.calendarYear!,
    campus: { id: values.campus! },
    ofertaFormacao: { id: values.trainingOffer! },
  });

  await calendarioLetivo.invalidate();
  return created && typeof created === 'object' && 'id' in created ? String(created.id) : '';
}

const formValidation = async (): Promise<boolean> => {
  const { valid } = await validate();
  if (!valid) return false;
  return true;
};

const validCalendarCrud = async (): Promise<boolean> => {
  if (await formValidation()) {
    createdCalendarId.value = await onSubmit();

    for (const ref of stepRefs.value) {
      if (ref) await ref.validateStepCrud();
    }

    return true;
  }
  return false;
};

defineExpose({ validCalendarCrud, formValidation });

watch(
  () => props.formStage,
  async n => {
    _formStage.value = n;
    if (_formStage.value >= 2) await setCalendarStepAmount();
  },
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
      <template v-for="(calendarStep, index) in calendarStepAmount" :key="`step-${index}`">
        <VVCalendarStep
          ref="stepRefs"
          :text="`Etapa ${index + 1}`"
          :calendar-id="createdCalendarId!"
          :is-step="true"
        />
        <VVCalendarStep
          v-if="index < calendarRecoveryAmount"
          :text="`Recuperação ${index + 1}`"
          :calendar-id="createdCalendarId!"
          :is-step="false"
        />
      </template>
      <VVCalendarStep
        :text="`Exame`"
        :calendar-id="props.calendarId! || ''"
        :is-step="false"
      />
    </div>
  </div>
</template>
