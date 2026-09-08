<script setup lang="ts">
import type { UsuarioFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { CargoLabels, type CargoType } from '~/utils/constants';
import { useContextDiariosFormGeral } from '../../../Contexto';

const props = defineProps<{
  index: number;
}>();

const contexto = useContextDiariosFormGeral();

const dcRef = computed(() => contexto.disciplinasConfig.value[props.index]);

const professorSearch = ref('');

const usuariosComposable = useUsuarios();
const searchQuery = computed(() => ({
  search: professorSearch.value || undefined,
}));
const listQuery = usuariosComposable.list(searchQuery);

const api = useApiClient();

function getCargoLabel(usuario: UsuarioFindOneOutputDto): string {
  const vinculos = usuario.vinculos ?? [];
  const labels = [
    ...new Set(
      vinculos.map(
        (v: Record<string, unknown>) =>
          CargoLabels[v.cargo as CargoType] ?? v.cargo
      )
    ),
  ];
  return labels.join(', ');
}

function getProfileImageUrl(usuario: UsuarioFindOneOutputDto): string | null {
  const imagemPerfil = usuario.imagemPerfil;
  if (imagemPerfil) {
    return `${api.baseUrl}/usuarios/${usuario.id}/imagem/perfil?imgCapa=${imagemPerfil.id}`;
  }
  return null;
}

const professores = computed(() => {
  const items = listQuery.data.value?.data;
  if (!items) return [];
  return items
    .flatMap((u: UsuarioFindOneOutputDto) => {
      const vinculos = u.vinculos ?? [];
      if (vinculos.length === 0) return [];

      const vinculo = vinculos.find(v => v.ativo) ?? vinculos[0];
      if (!vinculo) return [];
      return [
        {
          value: vinculo.id,
          label: u.nome ?? '',
          imageUrl: getProfileImageUrl(u),
          cargo: getCargoLabel(u),
        },
      ];
    })
    .toSorted((a, b) => a.label.localeCompare(b.label));
});

type ProfessorItem = {
  value: string;
  label: string;
  imageUrl: string | null;
  cargo: string;
};

const professorOf = (item: unknown) => item as ProfessorItem;

const professoresSelecionados = computed({
  get: () => dcRef.value?.professoresSelecionados ?? [],
  set: (val: string[]) => {
    const dc = dcRef.value;
    if (dc) dc.professoresSelecionados = val;
  },
});
</script>

<template>
  <div class="u-flex u-flex-col u-gap-3">
    <div
      v-if="listQuery.isLoading.value"
      class="u-flex u-items-center u-justify-center professores-tab__loading"
    >
      <span class="u-text-sm professores-tab__loading-text"
        >Carregando professores...</span
      >
    </div>

    <template v-else>
      <UIFormTextField
        :model-value="professorSearch"
        label="Pesquisar"
        placeholder="Digite aqui."
        name="professor-search"
        @update:model-value="professorSearch = String($event ?? '')"
      />

      <div
        class="u-flex u-flex-col u-gap-2 u-overflow-auto professores-tab__list"
      >
        <UICheckbox
          v-slot="{ item, selected, invertItem }"
          v-model="professoresSelecionados"
          :items="professores"
        >
          <SectionDiariosFormGeralDisciplinasAccordionProfessoresItem
            :label="item.label"
            :image-url="professorOf(item).imageUrl"
            :cargo="professorOf(item).cargo"
            :selected="selected"
            @toggle="invertItem(item)"
          >
            <UICheckboxSquare :item="item" :active="selected" @click.stop />
          </SectionDiariosFormGeralDisciplinasAccordionProfessoresItem>
        </UICheckbox>
      </div>
    </template>
  </div>
</template>

<style scoped>
.professores-tab__loading {
  padding-block: var(--ui-space-6);
}

.professores-tab__loading-text {
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
  animation: professores-tab-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes professores-tab-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.professores-tab__list {
  max-height: 15.625rem;
}
</style>
