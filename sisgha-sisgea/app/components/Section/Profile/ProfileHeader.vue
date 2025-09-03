<script lang="ts" setup>
import { IconsEducator, IconsUser } from '#components';
import { useCampusContext, useUserCargoAndCampi } from '#imports';
import type { Ladesa_ManagementService_Domain_Contracts_UsuarioFindOneOutput as UsuarioFindOneOutput } from '@ladesa-ro/management-service-client';
import { useQuery } from '@tanstack/vue-query';
import {
  ComboboxAnchor as Anchor,
  ComboboxRoot as AutocompleteRoot,
  ComboboxContent as Content,
  ComboboxInput as Input,
  ComboboxEmpty as NoResultsState,
  ComboboxPortal as Portal,
  ComboboxTrigger as Trigger,
  ComboboxViewport as Viewport,
} from 'reka-ui';
import { computed, ref } from 'vue';
import Arrow from '~/components/Icons/Arrow/Arrow.vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = { user: UsuarioFindOneOutput };
const { user } = defineProps<Props>();

const profilePictureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  user
);

const { campiList } = useUserCargoAndCampi();
const client = useApiClient();

const roleConfig = {
  professor: {
    label: 'Professor',
    border: 'border-ldsa-green-1',
    icon: IconsEducator,
  },
  dape: { label: 'DAPE', border: 'border-ldsa-green-1', icon: IconsUser },
};

const toggleCampusItems = campiList.map(c => ({
  label: c.apelido,
  value: c.id,
}));
const selectedCampusGlobalState = useCampusContext() as Ref<string>;
const selectedCampusValue = computed({
  get: () => selectedCampusGlobalState.value,
  set: val => (selectedCampusGlobalState.value = val),
});

const search = ref('');
const open = ref(false);

const filteredCampi = computed(() =>
  search.value
    ? toggleCampusItems.filter(c =>
        c.label.toLowerCase().includes(search.value.toLowerCase())
      )
    : toggleCampusItems
);

const campusAtual = computed(
  () =>
    toggleCampusItems.find(
      c => c.value === selectedCampusGlobalState.value
    ) ?? { label: 'Carregando campus...' }
);
const moreThanOneCampus = computed(() => toggleCampusItems.length > 1);

const { data: vinculosResponse } = useQuery({
  queryKey: ['usuarios', user.id, 'vinculos', selectedCampusValue],
  queryFn: () =>
    client.perfis.perfilList({
      filterUsuarioId: [user.id],
      filterAtivo: ['true'],
      filterCampusId: [selectedCampusValue.value],
    }),
});

const vinculos = computed(() =>
  (vinculosResponse.value?.data ?? []).filter(
    v => v.campus?.id === selectedCampusValue.value
  )
);

const vinculosBadges = computed(() => {
  const seen = new Set<string>();
  const badges: (typeof roleConfig)[keyof typeof roleConfig][] = [];
  for (const v of vinculos.value) {
    const key = v.cargo?.toLowerCase() ?? '';
    const badge =
      key in roleConfig
        ? roleConfig[key as keyof typeof roleConfig]
        : { label: v.cargo, border: 'border-gray-400', icon: IconsUser };
    if (!seen.has(badge.label)) {
      badges.push(badge);
      seen.add(badge.label);
    }
  }
  return badges;
});

const showEditModal = ref(false);
const closeEditModal = () => {
  showEditModal.value = false;
};
</script>

<template>
  <section class="banner">
    <div class="profile-card">
      <UIImg
        :src="profilePictureUrl"
        alt="Foto de perfil do usuário."
        class="shrink-0 w-18 h-18 sm:w-24 sm:h-24 lg:w-29.5 lg:h-29.5 border-2 border-ldsa-grey rounded-lg"
      >
        <template #fallbackIcon>
          <IconsUser class="w-1/2 text-ldsa-grey" />
        </template>
      </UIImg>

      <section
        class="profile-metadata text-xs font-medium max-[400px]:text-center"
      >
        <span>
          <h1 class="font-semibold text-sm lg:text-base text-wrap">
            {{ user.nome }}
          </h1>
          <p class="text-ldsa-grey text-wrap break-words">{{ user.email }}</p>
        </span>

        <div>
          <template v-if="moreThanOneCampus">
            <div class="w-auto">
              <AutocompleteRoot
                v-model="selectedCampusValue"
                v-model:open="open"
              >
                <Anchor
                  class="input"
                >
                  <IconsIconLocale class="w-3 h-3 text-ldsa-green-1" />
                  <Input
                    v-model="search"
                    placeholder="Selecione um campus"
                    @focus="open = true"
                    class="text-center w-auto h-full text-[0.6rem] shrink max-w-fit"
                    :display-value="
                      value =>
                        filteredCampi.find(i => i.value === value)?.label || ''
                    "
                  />

                  <Trigger>
                    <Arrow
                      class="!w-2.5 !h-2.5"
                      :class="[
                        'text-ldsa-green-1 transition-transform duration-200',
                        open ? 'rotate-[90deg]' : 'rotate-[270deg]',
                      ]"
                    />
                  </Trigger>
                </Anchor>

                <Portal>
                  <Content
                    class="input-base-content w-(--reka-combobox-trigger-width) z-[10000] bg-ldsa-bg rounded-lg shadow-lg"
                    position="popper"
                    side="bottom"
                    align="start"
                  >
                    <Viewport>
                      <NoResultsState
                        class="text-ldsa-grey font-normal px-3 py-2 min-h-[2.25rem] flex items-start"
                      >
                        Nenhum resultado encontrado
                      </NoResultsState>
                      <AutocompleteItem
                        v-for="item in filteredCampi"
                        :key="item.value"
                        :item="item"
                        mode="autocomplete"
                      />
                    </Viewport>
                  </Content>
                </Portal>
              </AutocompleteRoot>
            </div>
          </template>
          <template v-else>{{ campusAtual.label }}</template>
        </div>

        <span class="leading-5">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(v, index) in vinculosBadges"
              :key="index"
              :class="[
                'flex items-center gap-1 px-3 py-2 rounded-xl border-2 font-semibold text-sm',
                v.border,
                'text-ldsa-text-green',
              ]"
            >
              {{ v.label }}
              <component :is="v.icon" class="w-4 h-4" />
            </span>
          </div>
        </span>
      </section>

      <div class="">
        <SectionUsuariosModalsForm :edit-id="user.id" @close="closeEditModal" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.banner {
  @apply flex justify-center sm:justify-start items-end;
  @apply h-50 rounded-lg;
  @apply bg-[url('@/assets/imgs/Usuario.jpg')] bg-cover;
}

.profile-card {
  @apply flex max-[400px]:flex-col max-[400px]:items-center max-[400px]:gap-2 gap-4 overflow-visible max-[400px]:max-w-56 max-w-9/10;
  @apply ml-0 sm:ml-6 lg:ml-8 p-2.5 sm:p-3 lg:p-4 xl:p-5 lg:min-w-[22.5rem] h-max rounded-t-[0.625rem] bg-ldsa-bg;
}

.profile-metadata {
  @apply flex flex-col justify-center max-[400px]:items-center gap-2 md:ml-2 lg:ml-4;
}

.input {
  @apply relative flex justify-between border-2 rounded-lg;
  @apply h-7 min-h-0 px-2 max-w-39 text-sm font-medium text-center text-ldsa-text-default data-[placeholder]:text-ldsa-grey/90;
  @apply focus-within:border-ldsa-green-2 focus-visible:outline-none disabled:cursor-not-allowed;
}

.input {
  @apply border-ldsa-grey;
}

.input:is([data-open], [data-state='open'], :focus-within) {
  @apply border-ldsa-green-2;
}

.input ::placeholder {
  @apply font-medium text-ldsa-grey;
}
.input:has(input[disabled]) {
  @apply opacity-60;
}
</style>
