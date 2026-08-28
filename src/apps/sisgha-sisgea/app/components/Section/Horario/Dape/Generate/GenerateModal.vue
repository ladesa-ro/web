<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import {
  IconsClockGenerate,
  IconsClockPermanent,
  IconsClockTemporary,
} from '#components';
import { createIdempotencyKey } from '~/composables/ladesa-api/-helpers/idempotencyKey';

const { mode = 'green' } = defineProps<{
  selectedToggleItem?: 'mesclado' | 'professor' | 'turma';
  mode?: 'green' | 'white';
}>();

const router = useRouter();
const dayjs = useDayJs();
const { success: toastSuccess, error: toastError } = useToast();
const gerarHorario = useGerarHorario();

type Fase = 'form' | 'processando' | 'resultado' | 'erro';

const isModalActive = ref(false);
const fase = ref<Fase>('form');
const solicitacaoId = ref<string | null>(null);
const idempotencyKey = ref(createIdempotencyKey());

const solicitacaoIdRef = computed(() => solicitacaoId.value);
const { data: solicitacao } = gerarHorario.findById(solicitacaoIdRef);

watch(
  () => solicitacao.value?.status,
  status => {
    if (status === 'SUCESSO') fase.value = 'resultado';
    else if (status === 'ERRO') fase.value = 'erro';
  }
);

const toggleItems = [
  { value: 'permanente', text: 'Permanente', icon: IconsClockPermanent },
  { value: 'temporario', text: 'Temporário', icon: IconsClockTemporary },
];

useForm({
  initialValues: {
    ofertaFormacao: '',
    duracao: 'permanente',
    initialDate: dayjs().format('YYYY-MM-DD'),
    finalDate: dayjs().add(1, 'week').format('YYYY-MM-DD'),
  },
});

const { value: ofertaFormacao } = useField<string>('ofertaFormacao');
const { value: toggleValue } = useField<'permanente' | 'temporario'>(
  'duracao'
);
const { value: initialDate } = useField<string>('initialDate');
const { value: finalDate } = useField<string>('finalDate');

function resetFluxo() {
  fase.value = 'form';
  solicitacaoId.value = null;
  idempotencyKey.value = createIdempotencyKey();
}

const onClose = () => {
  isModalActive.value = false;
  resetFluxo();
};

async function handleGerar() {
  try {
    const resultado = await gerarHorario.create(
      {
        ofertaFormacaoIds: ofertaFormacao.value
          ? [ofertaFormacao.value]
          : undefined,
        dataInicio: initialDate.value,
        dataTermino:
          toggleValue.value === 'temporario' ? finalDate.value : undefined,
        duracao:
          toggleValue.value === 'temporario' ? 'TEMPORARIO' : 'PERMANENTE',
      },
      idempotencyKey.value
    );

    solicitacaoId.value = resultado.id;
    fase.value = 'processando';
  } catch {
    toastError({ title: 'Não foi possível iniciar a geração do horário' });
  }
}

async function handleAceitar() {
  if (!solicitacaoId.value) return;

  try {
    const resultado = await gerarHorario.aceitar(solicitacaoId.value);
    onClose();

    toastSuccess({
      title:
        'Grade aceita. Revise as mudanças e publique para aplicar ao calendário.',
    });

    if (resultado.sessaoEdicaoId) {
      router.push(`/sisgha/dape/horario/sessao/${resultado.sessaoEdicaoId}`);
    }
  } catch {
    toastError({ title: 'Não foi possível aceitar a grade gerada' });
  }
}

async function handleRejeitar() {
  if (!solicitacaoId.value) return;

  try {
    await gerarHorario.rejeitar(solicitacaoId.value);
    toastSuccess({ title: 'Grade rejeitada' });
    onClose();
  } catch {
    toastError({ title: 'Não foi possível rejeitar a grade gerada' });
  }
}

const respostaGeradorPreview = computed(() => {
  const resposta = solicitacao.value?.respostaGerador;
  return resposta ? JSON.stringify(resposta, null, 2) : null;
});

const erroGerador = computed(() => {
  const resposta = solicitacao.value?.respostaGerador as
    | { erro?: string; message?: string }
    | null
    | undefined;
  return resposta?.erro ?? resposta?.message ?? null;
});
</script>

<template>
  <DialogSkeleton
    v-model="isModalActive"
    disable-inline-block
    class="flex justify-center"
  >
    <template #activator>
      <UIButtonDefault
        v-if="mode === 'green'"
        ref="generateButton"
        outline-on-clink
        class="fixed bottom-14 sm:bottom-16 md:bottom-18 2xl:bottom-26 z-10 w-max shadow-[0_7.5px_15px_rgba(0,0,0,0.2)] transition-[translate,filter,scale] duration-[400ms,200ms,100ms] ease-in-out will-change-[transform,filter] hover:brightness-95 active:scale-97"
        :class="{
          'translate-y-[100vh] duration-[1050ms,200ms,100ms]':
            selectedToggleItem === 'mesclado',
        }"
      >
        <template #start-icon>
          <IconsGenerate />
        </template>

        Gerar Horário
      </UIButtonDefault>

      <SectionInicioCardLink
        v-else
        class="w-full"
        :icon="IconsClockGenerate"
        title="Gerar Horário"
      />
    </template>

    <DialogModalBaseLayout title="Gerar Horário Acadêmico" :on-close="onClose">
      <template v-if="fase === 'form'">
        <VVAutocompleteAPIOfertaFormacao name="ofertaFormacao" class="mt-1" />

        <hr class="border border-ldsa-grey" />

        <UITitle text="O horário deve ser..." variant="mini" />

        <UIToggle v-model="toggleValue" :items="toggleItems" />

        <div class="flex max-sm:flex-col gap-5">
          <VVDateField
            name="initialDate"
            label="Data de Início"
          />

          <VVDateField
            v-if="toggleValue === 'temporario'"
            name="finalDate"
            label="Data de Término"
          />
        </div>

        <UIAlert
          v-if="toggleValue === 'permanente'"
          type="info"
          message="Este horário pode ser sobreposto por um horário temporário ou substituído por outro horário permanente gerado no futuro."
        />

        <UIAlert
          v-else
          type="info"
          message="Ao passar a data de término, este horário temporário será substituído pelo horário permanente atualmente utilizado."
        />

        <div class="lg:h-10" />
      </template>

      <template v-else-if="fase === 'processando'">
        <div class="flex flex-col items-center gap-4 py-10">
          <UILoading />

          <p class="text-ldsa-grey text-center">
            Gerando o horário… isso pode levar alguns instantes.
          </p>
        </div>
      </template>

      <template v-else-if="fase === 'resultado'">
        <UIAlert
          type="success"
          message="Grade gerada com sucesso. Revise o resultado antes de aceitar."
        />

        <pre
          v-if="respostaGeradorPreview"
          class="text-xs bg-ldsa-grey/10 rounded-lg p-3 overflow-auto max-h-64"
          >{{ respostaGeradorPreview }}</pre
        >
      </template>

      <template v-else-if="fase === 'erro'">
        <UIAlert
          type="error"
          :message="
            erroGerador ?? 'Não foi possível gerar o horário. Tente novamente.'
          "
        />
      </template>

      <template #button-group>
        <template v-if="fase === 'form'">
          <UIButtonModalCancel @click="onClose" />

          <UIButtonModalBaseLayout
            color="var(--ladesa-green-2-color)"
            type="button"
            text="Gerar Horário"
            class="px-3 gap-2"
            @click="handleGerar"
          >
            <IconsGenerate class="min-w-4" />
          </UIButtonModalBaseLayout>
        </template>

        <template v-else-if="fase === 'processando'">
          <UIButtonModalCancel @click="onClose" />
        </template>

        <template v-else-if="fase === 'resultado'">
          <UIButtonModalBaseLayout
            color="var(--ladesa-red-color)"
            type="button"
            text="Rejeitar"
            @click="handleRejeitar"
          >
            <IconsClose />
          </UIButtonModalBaseLayout>

          <UIButtonModalBaseLayout
            color="var(--ladesa-green-2-color)"
            type="button"
            text="Aceitar"
            @click="handleAceitar"
          >
            <IconsConfirm />
          </UIButtonModalBaseLayout>
        </template>

        <template v-else-if="fase === 'erro'">
          <UIButtonModalCancel @click="onClose" />

          <UIButtonModalBaseLayout
            color="var(--ladesa-green-2-color)"
            type="button"
            text="Tentar novamente"
            @click="resetFluxo"
          >
            <IconsGenerate class="min-w-4" />
          </UIButtonModalBaseLayout>
        </template>
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>
