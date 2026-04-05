<script lang="ts" setup>
import type { IParticipantesData } from './EventoFormBase.vue';

const props = defineProps<{
  disabled?: boolean;
  showParticipants?: boolean;
  origemProfessor?: boolean;

  nome: string;
  nomeError?: string;

  cor: string | null;
  repeticao: string | null;
  diaInteiro: boolean;

  dataInicio: string;
  dataInicioError?: string;

  dataFim: string;

  horarioInicio: string | null;
  horarioFim: string | null;

  participantes: IParticipantesData;
}>();

const emit = defineEmits<{
  'update:nome': [value: string];
  'update:cor': [value: string | null];
  'update:repeticao': [value: string | null];
  'update:diaInteiro': [value: boolean];
  'update:dataInicio': [value: string];
  'update:dataFim': [value: string];
  'update:horarioInicio': [value: string | null];
  'update:horarioFim': [value: string | null];
  'update:participantes': [value: IParticipantesData];
  'blur:nome': [];
  'blur:dataInicio': [];
  'blur:dataFim': [];
}>();

const nomeModel = computed({
  get: () => props.nome,
  set: (v: string) => emit('update:nome', v),
});

const corModel = computed({
  get: () => props.cor,
  set: (v: string | null) => emit('update:cor', v),
});

const repeticaoModel = computed({
  get: () => props.repeticao,
  set: (v: string | null) => emit('update:repeticao', v),
});

const diaInteiroModel = computed({
  get: () => props.diaInteiro,
  set: (v: boolean) => emit('update:diaInteiro', v),
});

const dataInicioModel = computed({
  get: () => props.dataInicio,
  set: (v: string) => emit('update:dataInicio', v),
});

const dataFimModel = computed({
  get: () => props.dataFim,
  set: (v: string) => emit('update:dataFim', v),
});

const horarioInicioModel = computed({
  get: () => props.horarioInicio,
  set: (v: string | null) => emit('update:horarioInicio', v),
});

const horarioFimModel = computed({
  get: () => props.horarioFim,
  set: (v: string | null) => emit('update:horarioFim', v),
});

const participantesModel = computed({
  get: () => props.participantes,
  set: (v: IParticipantesData) => emit('update:participantes', v),
});
</script>

<template>
  <UIFormTextField
    v-model="nomeModel"
    name="nome"
    label="Nome"
    :disabled="disabled"
    :error="nomeError"
    @blur="emit('blur:nome')"
  />

  <div class="flex flex-col gap-1.5">
    <span class="text-[0.813rem] font-semibold text-ldsa-grey px-1">Cor</span>
    <SectionCalendarioFormSharedEventoColorPalette
      v-model="corModel"
      :disabled="disabled"
    />
  </div>

  <SectionCalendarioFormSharedEventoRRuleEditor
    v-model="repeticaoModel"
    :disabled="disabled"
  />

  <UIFormCheckbox v-model="diaInteiroModel" label="Dura todo o dia" :disabled="disabled" />

  <div class="flex gap-4">
    <div class="flex-1">
      <UIFormTextField
        v-model="dataInicioModel"
        name="dataInicio"
        label="Data inicial"
        type="date"
        :disabled="disabled"
        :error="dataInicioError"
        @blur="emit('blur:dataInicio')"
      />
    </div>
    <div class="flex-1">
      <UIFormTextField
        v-model="dataFimModel"
        name="dataFim"
        label="Data final"
        type="date"
        :disabled="disabled"
        @blur="emit('blur:dataFim')"
      />
    </div>
  </div>

  <div v-if="!diaInteiro" class="flex gap-4">
    <div class="flex-1">
      <UIFormTimeField v-model="horarioInicioModel" label="Horário inicial" :disabled="disabled" />
    </div>
    <div class="flex-1">
      <UIFormTimeField v-model="horarioFimModel" label="Horário final" :disabled="disabled" />
    </div>
  </div>

  <template v-if="showParticipants">
    <div v-if="origemProfessor" class="flex items-start gap-2.5 p-3 rounded-lg bg-blue-50 border border-blue-200">
      <Icon name="lucide:info" class="text-blue-600 shrink-0 mt-0.5" size="18" />
      <span class="text-sm text-blue-800">
        Este evento foi criado na edição de agenda do professor e, portanto, não é possível vinculá-lo a mais nenhum professor ou turma.
      </span>
    </div>

    <SectionCalendarioFormSharedParticipantesSelector
      v-model="participantesModel"
      :disabled="disabled || origemProfessor"
    />
  </template>
</template>
