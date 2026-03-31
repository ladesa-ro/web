<script lang="ts" setup>
import type { DiarioFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  diario: DiarioFindOneOutputDto;
  link?: string;
  editButton?: boolean;
};

const props = defineProps<Props>();

const { diario } = toRefs(props);

const link = props.link === undefined || props.link === '' ? 'diarios' : props.link;

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
  <nuxt-link :to="`${link}/${diario.id}`">
    <UICard :src="coverImageSrc" :title="diario.disciplina.nome" variant="block">
      <template #actions>
        <LazySectionDiariosModal v-if="editButton" :edit-id="diario.id" />
        <IconsArrowAlt
          v-else
          class="w-4.5 rotate-180 mr-1.5 arrow-behaviour transition-transform"
        />
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
      />
    </UICard>
  </nuxt-link>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

a:hover .arrow-behaviour {
  @apply translate-x-1;
}
</style>
