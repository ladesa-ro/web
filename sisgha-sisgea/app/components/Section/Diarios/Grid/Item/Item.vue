<script lang="ts" setup>
import type { DiarioFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { ApiImageResource, useApiImageRoute } from '~/utils';

// Definição das props ajustadas

type Props = {
  diario: DiarioFindOneOutputDto;
};

const props = defineProps<Props>();

const { diario } = toRefs(props);

const diarios_api = useDiarios();

const professoresQuery = diarios_api.listProfessores(diario.value.id);

const diariosProfessoresList = computed(
  () => professoresQuery.data.value?.data ?? []
);

//

const disciplina = computed(() => diario.value.disciplina);

const coverImageSrc = useApiImageRoute(
  ApiImageResource.DISCIPLINA_COVER,
  disciplina
);

await professoresQuery.suspense();
</script>

<template>
  <UICard :src="coverImageSrc" :title="diario.disciplina.nome" variant="block">
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
