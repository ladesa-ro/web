<script setup lang="ts">
import type { DiarioFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { defineProps, toRefs } from 'vue';
import { ApiImageResource, useApiImageRoute } from '~/integrations';

// Definição das props ajustadas

type Props = {
  diario: DiarioFindOneResultView;
};

const props = defineProps<Props>();

//

const { diario } = toRefs(props);

// Realizei a chamada da ROTA useApiDiariosProfessoresFindAllByDiarioId
const { diariosProfessoresList } = await useApiDiariosProfessoresFindAllByDiarioId({
  diario: diario.value,
});

//

const disciplina = computed(() => diario.value.disciplina);

const coverImageSrc = useApiImageRoute(
  ApiImageResource.DISCIPLINA_COVER,
  disciplina
);
</script>

<template>
  <UICard variant="block" :src="coverImageSrc">
    <template #title>
      {{ diario.disciplina.nome }}
    </template>

    <template #actions>
      <LazySectionDiariosModal :editId="diario.id" />
    </template>

    <UICardLine>
      <span>
        Professores:
        <template
          v-for="diarioProfessor in diariosProfessoresList"
          :key="diarioProfessor.id"
        >
          {{ diarioProfessor.perfil.usuario.nome }}
        </template>
      </span>
    </UICardLine>

    <UICardLine>
      <span>
        Turmas:
        {{ diario.turma.periodo }} - {{ diario.turma.curso.ofertaFormacao.nome }}
      </span>
    </UICardLine>
  </UICard>
</template>
