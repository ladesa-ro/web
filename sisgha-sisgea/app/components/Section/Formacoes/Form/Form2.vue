<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useToast } from '~/composables/useToast';
import EtapasFormacao from './EtapasFormacao.vue';

const { showToast } = useToast();

type Props = { editId?: string | null; duracaoPerido: number };

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

const editIdRef = toRef(props, 'editId');

const quantidadePeriodos = 12 / props.duracaoPerido;

//

const $emit = defineEmits(['close', 'previous']);

const apiClient = useApiClient();
const queryClient = useQueryClient();

const ofertasFormacoes = useOfertasFormacoes();

const findOneQuery = ofertasFormacoes.findOne(editIdRef);
const currentOfertaFormacao = findOneQuery.data;
await findOneQuery.suspense();
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
      <UIButtonModalGoBack @click="$emit('previous')" />

      <UIButtonModalEdit @click="$emit('close')" v-if="editId" />
      <UIButtonModalSave @click="$emit('close')" v-else />
    </template>
  </DialogModalBaseLayout>
</template>
