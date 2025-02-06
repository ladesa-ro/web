<script setup lang="ts">
import type { DiarioFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { ApiImageResource, useApiImageRoute } from '~/utils';

// Definição das props ajustadas

type Props = {
  diario: DiarioFindOneResultView;
};

const props = defineProps<Props>();

const { diario } = toRefs(props);

const {
  composables: { useListQuery: useListQueryDiariosProfessores },
} = useLadesaApiCrudDiariosProfessores();

const options = computed(() => ({ filterDiarioId: [diario.value.id] }));

const { items: diariosProfessoresList } =
  await useListQueryDiariosProfessores(options);

//

const disciplina = computed(() => diario.value.disciplina);

const coverImageSrc = useApiImageRoute(
  ApiImageResource.DISCIPLINA_COVER,
  disciplina
);
</script>

<template>
  <UICard :title="diario.disciplina.nome" variant="block" :src="coverImageSrc">
    <template #actions>
      <LazySectionDiariosModal :edit-id="diario.id" />
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

    <UICardLine
      :text="`Turmas: ${diario.turma.periodo} - ${diario.turma.curso.ofertaFormacao.nome}`"
    >
    </UICardLine>
  </UICard>
</template>
