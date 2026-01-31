<script lang="ts" setup>
import type { DiarioFindOneOutputDto } from '~/helpers/api-client';
import { ApiImageResource, useApiImageRoute } from '~/utils';

// Definição das props ajustadas

type Props = {
  diario: DiarioFindOneOutputDto;
};

const props = defineProps<Props>();

const { diario } = toRefs(props);

const {
  composables: { useListQuery: useListQueryDiariosProfessores },
} = useLadesaApiCrudDiariosProfessores();

const options = computed(() => ({ filterDiarioId: [diario.value.id] }));

const {
  data: { items: diariosProfessoresList },
  methods: { suspend },
} = useListQueryDiariosProfessores(options);

//

const disciplina = computed(() => diario.value.disciplina);

const coverImageSrc = useApiImageRoute(
  ApiImageResource.DISCIPLINA_COVER,
  disciplina
);

await suspend();
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
