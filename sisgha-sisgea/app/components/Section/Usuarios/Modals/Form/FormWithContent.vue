<script lang="ts" setup>
import DialogSkeleton from '@/components/Dialog/DialogSkeleton.vue';
import { onMounted, ref, watch } from 'vue';
import ModalCadastrarMotivo from '../../Form/MotivosForm/ModalCadastrarMotivo.vue';
import ModalConsultarMotivo from '../../Form/MotivosForm/ModalConsultarMotivo.vue';
import ModalEditarMotivo from '../../Form/MotivosForm/ModalEditarMotivo.vue';
import ModalListarMotivos from '../../Form/MotivosForm/ModalListarMotivo.vue';

type Props = {
  editId?: string | null;
};
const { editId = null } = defineProps<Props>();
const $emit = defineEmits(['close']);

function onClose() {
  $emit('close');
}

const activeModal = ref<'cadastrar' | 'consultar' | 'listar' | 'editar' | null>(
  null
);

const principaisAbertos = ref(true);

type HorarioMotivo = { horario: string; motivo: string };
type MotivoSelecionado = {
  motivo: string;
  dias: string[];
  horariosPorDia: Record<string, string[]>;
} | null;

const motivoSelecionado = ref<MotivoSelecionado>(null);
const horariosSemMotivo = ref<string[]>([]);
const motivosConfirmados = ref<Record<string, HorarioMotivo[]>>({});

function abrirModal(
  tipo: 'cadastrar' | 'consultar' | 'listar' | 'editar',
  payload?: MotivoSelecionado
) {
  console.log('Abrindo modal:', tipo, payload);
  activeModal.value = tipo;
  if (tipo === 'editar' && payload) {
    motivoSelecionado.value = payload;
  }
}

function fecharTodosModais() {
  activeModal.value = null;
  motivoSelecionado.value = null;
}

function atualizarHorariosSemMotivo(novosHorarios: string[]) {
  horariosSemMotivo.value = novosHorarios;
}

function atualizarMotivos(novosMotivos: Record<string, HorarioMotivo[]>) {
  motivosConfirmados.value = novosMotivos;
}

function adicionarMotivo(horario: string, motivo: string) {
  const dia =
    motivoSelecionado.value?.dias?.[0] ||
    Object.keys(motivosConfirmados.value)[0];
  if (!dia) return;

  if (!motivosConfirmados.value[dia]) {
    motivosConfirmados.value[dia] = [];
  }

  const index = motivosConfirmados.value[dia]!.findIndex(
    m => m.horario === horario
  );

  if (index !== -1) {
    motivosConfirmados.value[dia]?.[index] &&
      (motivosConfirmados.value[dia][index].motivo = motivo);
  } else {
    motivosConfirmados.value[dia].push({ horario, motivo });
  }

  fecharTodosModais();
}

function atualizarMotivoEditadoComHorarios(payload: {
  horariosPorDia: Record<string, string[]>;
  motivo: string;
}) {
  const { horariosPorDia, motivo } = payload;

  for (const dia in horariosPorDia) {
    const horariosNovos = horariosPorDia[dia];
    if (!horariosNovos) continue;

    if (!motivosConfirmados.value[dia]) {
      motivosConfirmados.value[dia] = [];
    }

    motivosConfirmados.value[dia] = motivosConfirmados.value[dia].filter(
      (m: HorarioMotivo) => m.motivo !== motivoSelecionado.value?.motivo
    );

    for (const horario of horariosNovos) {
      motivosConfirmados.value[dia].push({ horario, motivo });
    }
  }

  fecharTodosModais();
}

function deletarMotivo(motivo: string) {
  for (const dia in motivosConfirmados.value) {
    motivosConfirmados.value[dia] = motivosConfirmados.value[dia]!.filter(
      m => m.motivo !== motivo
    );
  }

  fecharTodosModais();
}

watch(activeModal, novo => {
  if (novo !== null) {
    principaisAbertos.value = false;
  } else {
    principaisAbertos.value = true;
  }
});

</script>

<template>
  <SectionUsuariosForm v-if="principaisAbertos" :edit-id="editId">
    <SectionUsuariosFormProfile :edit-id="editId" @close="onClose" />
    <SectionUsuariosModalsFormDialogAvailability
      @abrir-modal="abrirModal"
      @atualizar-horarios-sem-motivo="atualizarHorariosSemMotivo"
      @atualizar-motivos="atualizarMotivos"
    />
  </SectionUsuariosForm>

  <DialogSkeleton
    :model-value="activeModal === 'cadastrar'"
    @update:model-value="
      val => {
        if (!val) fecharTodosModais();
      }
    "
  >
    <ModalCadastrarMotivo
      :horariosSemMotivo="horariosSemMotivo"
      @fechar="fecharTodosModais"
      @cadastrar="adicionarMotivo"
    />
  </DialogSkeleton>

  <DialogSkeleton
    :model-value="activeModal === 'consultar'"
    @update:model-value="
      val => {
        if (!val) fecharTodosModais();
      }
    "
  >
    <ModalConsultarMotivo
      :motivosConfirmados="motivosConfirmados"
      @fechar="fecharTodosModais"
    />
  </DialogSkeleton>

  <DialogSkeleton
    :model-value="activeModal === 'listar'"
    @update:model-value="
      val => {
        if (!val) fecharTodosModais();
      }
    "
  >
    <ModalListarMotivos
      :motivosConfirmados="motivosConfirmados"
      @fechar="fecharTodosModais"
      @editar="(payload: MotivoSelecionado) => abrirModal('editar', payload)"
      @deletar="deletarMotivo"
    />
  </DialogSkeleton>

  <DialogSkeleton
    :model-value="activeModal === 'editar'"
    @update:model-value="
      val => {
        if (!val) fecharTodosModais();
      }
    "
  >
    <ModalEditarMotivo
      v-if="motivoSelecionado"
      :motivoAtual="motivoSelecionado"
      @fechar="fecharTodosModais"
      @atualizarComHorarios="atualizarMotivoEditadoComHorarios"
      @deletar="deletarMotivo"
    />
  </DialogSkeleton>
</template>
