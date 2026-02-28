<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useApiClient } from '~/composables';
import { useToast } from '~/composables/useToast';
import EtapasFormacao from './EtapasFormacao.vue';

const { showToast } = useToast();

type Props = { editId?: string | null; duracaoPerido: number };

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

const editIdRef = toRef(props, 'editId');

const quantidadePeriodos = props.duracaoPerido / 12;

//

const $emit = defineEmits(['close']);

const apiClient = useApiClient();
const queryClient = useQueryClient();

const {
  composables: { useFindOneQuery },
} = useLadesaApiCrudOfertasFormacoes();

const { data: currentOfertaFormacao, suspense } = useFindOneQuery(editIdRef);
await suspense();
</script>

<template>
  <DialogModalBaseLayout
    :on-close="() => $emit('close')"
    :title="
      editId ? 'Editar etapas do ano letivo' : 'Cadastrar etapas do ano letivo'
    "
  >
    <EtapasFormacao
      v-for="periodo in quantidadePeriodos"
      :key="periodo"
      :period-number="periodo"
    />
    
    <template #button-group>
      <UIButtonModalGoBack />

      <UIButtonModalEdit v-if="editId" />
      <UIButtonModalSave v-else />
    </template>
  </DialogModalBaseLayout>
</template>
