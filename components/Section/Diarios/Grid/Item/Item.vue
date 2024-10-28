<script setup lang="ts">
import type { DiarioFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { defineProps, toRefs } from 'vue';
import { ApiImageResource, useApiImageRoute } from '~/integrations';

// Definição das props ajustadas

type Props = {
  diario: DiarioFindOneResultDto;
};

const props = defineProps<Props>();

//

const { diario } = toRefs(props);

// Realizei a chamada da ROTA useApiDiariosProfessorFindAllByDiarioId
const { diariosProfessorList } = await useApiDiariosProfessorFindAllByDiarioId({
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
          v-for="diarioProfessor in diariosProfessorList"
          :key="diarioProfessor.id"
        >
          {{ diarioProfessor.vinculo.usuario.nome }}
        </template>
      </span>
    </UICardLine>

    <UICardLine>
      <span>
        Turmas:
        {{ diario.turma.periodo }} - {{ diario.turma.curso.modalidade.nome }}
      </span>
    </UICardLine>
  </UICard>
</template>
