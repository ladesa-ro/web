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
      // Usar o primeiro vinculo ativo como perfilId
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
          <div
            class="u-flex u-items-center u-gap-3 u-rounded-lg professores-tab__item"
            :class="{ 'professores-tab__item--selected': selected }"
            @click.stop="invertItem(item)"
          >
            <div
              class="u-flex u-items-center u-justify-center u-shrink-0 u-overflow-hidden u-rounded-md professores-tab__avatar"
            >
              <img
                v-if="professorOf(item).imageUrl"
                :src="professorOf(item).imageUrl ?? ''"
                class="u-w-full u-h-full professores-tab__avatar-image"
              />
              <IconsUser v-else class="professores-tab__avatar-icon" />
            </div>
            <div class="u-flex u-flex-col u-flex-1 professores-tab__info">
              <p class="u-font-semibold u-text-sm professores-tab__name">
                {{ item.label }}
              </p>
              <p
                v-if="professorOf(item).cargo"
                class="u-text-xs professores-tab__cargo"
              >
                {{ professorOf(item).cargo }}
              </p>
            </div>
            <UICheckboxSquare :item="item" :active="selected" @click.stop />
          </div>
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

.professores-tab__item {
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 100%);
  padding-right: var(--ui-space-3);
  margin-bottom: var(--ui-space-1);
  cursor: pointer;
  transition:
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    border-color var(--ui-duration-base) var(--ui-easing-standard);
}

.professores-tab__item--selected {
  border-color: var(--ladesa-green-1-color);
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 10%);
}

.professores-tab__avatar {
  width: 3rem;
  height: 3rem;
  background-color: rgb(from var(--ladesa-grey-color) R G B / 20%);
}

.professores-tab__avatar-image {
  object-fit: cover;
}

.professores-tab__avatar-icon {
  width: var(--ui-space-6);
  height: var(--ui-space-6);
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
}

.professores-tab__info {
  padding-block: var(--ui-space-2);
}

.professores-tab__name {
  color: var(--ladesa-text-default-color);
}

.professores-tab__cargo {
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
}
</style>
