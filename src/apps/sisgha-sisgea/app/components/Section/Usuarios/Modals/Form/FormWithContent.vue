<script lang="ts" setup>
import ModalCadastrarMotivo from '../../Form/MotivosForm/ModalCadastrarMotivo.vue';
import ModalConsultarMotivo from '../../Form/MotivosForm/ModalConsultarMotivo.vue';
import ModalEditarMotivo from '../../Form/MotivosForm/ModalEditarMotivo.vue';
import ModalListarMotivos from '../../Form/MotivosForm/ModalListarMotivo.vue';

type Props = {
  editId?: string | null;
};
const { editId = null } = defineProps<Props>();
const $emit = defineEmits(['close']);

type UsuarioModal = 'cadastrar' | 'consultar' | 'listar' | 'editar';
const modals = useModalManager<UsuarioModal>();

const isMainContentVisible = computed(() => !modals.hasActiveModal.value);

function fecharTodosModais() {
  modals.closeAll();
  motivoSelecionado.value = null;
}

function onClose() {
  $emit('close');
}

const diaSelecionado = ref<string>('segunda');

type HorarioMotivo = { horario: string; motivo: string };
type MotivoSelecionado = {
  motivo: string;
  dias: string[];
  horariosPorDia: Record<string, string[]>;
} | null;

const motivoSelecionado = ref<MotivoSelecionado>(null);
const motivosConfirmados = ref<Record<string, HorarioMotivo[]>>({});

const horariosSemMotivo = ref<string[]>([]);

function abrirModal(
  tipo: UsuarioModal,
  payload?: MotivoSelecionado
) {
  modals.open(tipo);
  if (tipo === 'editar' && payload) {
    motivoSelecionado.value = payload;
  }
}

function atualizarHorariosSemMotivo(novosHorarios: string[]) {
  horariosSemMotivo.value = novosHorarios;
}

function atualizarMotivos(novosMotivos: Record<string, HorarioMotivo[]>) {
  motivosConfirmados.value = { ...novosMotivos };
}

function adicionarMotivo(dia: string, horario: string, motivo: string) {
  if (!motivosConfirmados.value[dia]) {
    motivosConfirmados.value[dia] = [];
  }

  const index = motivosConfirmados.value[dia].findIndex(
    m => m.horario === horario
  );

  if (index !== -1) {
    motivosConfirmados.value[dia]?.[index] &&
      (motivosConfirmados.value[dia][index].motivo = motivo);
  } else {
    motivosConfirmados.value[dia].push({ horario, motivo });
  }
  motivosConfirmados.value = { ...motivosConfirmados.value };
  fecharTodosModais();
}

function atualizarMotivoEditadoComHorarios(payload: {
  horariosPorDia: Record<string, string[]>;
  motivo: string;
}) {
  const { horariosPorDia, motivo } = payload;

  for (const dia in motivosConfirmados.value) {
    motivosConfirmados.value[dia] = (
      motivosConfirmados.value[dia] || []
    ).filter(m => m.motivo !== motivoSelecionado.value?.motivo);
  }

  for (const dia in horariosPorDia) {
    const horariosNovos = horariosPorDia[dia];
    if (!horariosNovos) continue;

    if (!motivosConfirmados.value[dia]) {
      motivosConfirmados.value[dia] = [];
    }

    horariosNovos.forEach(horario => {
      motivosConfirmados.value[dia]!.push({ horario, motivo });
    });
  }

  motivosConfirmados.value = { ...motivosConfirmados.value };

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

function setDiaSelecionado(dia: string) {
  diaSelecionado.value = dia;
}
</script>

<template>
  <SectionUsuariosForm
    v-if="true"
    :edit-id="editId"
    class="w-full flex flex-col md:flex-row gap-4 h-[90vh]"
  >
    <SectionUsuariosFormProfile
      v-show="isMainContentVisible"
      :edit-id="editId"
      class="w-full flex-1 max-h-[90vh] h-auto overflow-x-hidden overflow-y-auto"
      @close="onClose"
    />
    <SectionUsuariosModalsFormDialogAvailability
      v-show="isMainContentVisible"
      :selected-day-week="diaSelecionado"
      :motivos-confirmados="motivosConfirmados"
      class="w-full flex-1 max-h-[90vh] h-auto overflow-x-hidden overflow-y-auto"
      @abrir-modal="abrirModal"
      @atualizar-horarios-sem-motivo="atualizarHorariosSemMotivo"
      @atualizar-motivos="atualizarMotivos"
      @atualizar-dia-selecionado="setDiaSelecionado"
    />
  </SectionUsuariosForm>

  <DialogManagedDialog name="cadastrar" :manager="modals" backdrop-action="close-all">
    <ModalCadastrarMotivo
      :horarios-sem-motivo="horariosSemMotivo"
      @fechar="fecharTodosModais"
      @cadastrar="adicionarMotivo"
    />
  </DialogManagedDialog>

  <DialogManagedDialog name="consultar" :manager="modals" backdrop-action="close-all">
    <ModalConsultarMotivo
      :motivos-confirmados="motivosConfirmados"
      :selected-day-week="diaSelecionado"
      @fechar="fecharTodosModais"
    />
  </DialogManagedDialog>

  <DialogManagedDialog name="listar" :manager="modals" backdrop-action="close-all">
    <ModalListarMotivos
      :motivos-confirmados="motivosConfirmados"
      :selected-day-week="diaSelecionado"
      @fechar="fecharTodosModais"
      @editar="(payload: MotivoSelecionado) => abrirModal('editar', payload)"
      @deletar="deletarMotivo"
    />
  </DialogManagedDialog>

  <DialogManagedDialog name="editar" :manager="modals" backdrop-action="close-all">
    <ModalEditarMotivo
      v-if="motivoSelecionado"
      :motivo-atual="motivoSelecionado"
      :selected-day-week="diaSelecionado"
      @fechar="fecharTodosModais"
      @atualizar-com-horarios="atualizarMotivoEditadoComHorarios"
      @deletar="deletarMotivo"
    />
  </DialogManagedDialog>
</template>
