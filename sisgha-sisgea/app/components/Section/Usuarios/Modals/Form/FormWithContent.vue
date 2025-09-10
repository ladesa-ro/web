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

const activeModal = ref<'cadastrar' | 'consultar' | 'listar' | 'editar' | null>(
  null
);

const isProfileOpen = ref(true);
const isAvailabilityOpen = ref(true);

function fecharTodosModais() {
  activeModal.value = null;
  motivoSelecionado.value = null;
}

watch(activeModal, newVal => {
  if (newVal !== null) {
    isProfileOpen.value = false;
    isAvailabilityOpen.value = false;
  } else {
    isProfileOpen.value = true;
    isAvailabilityOpen.value = true;
  }
});

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
  tipo: 'cadastrar' | 'consultar' | 'listar' | 'editar',
  payload?: MotivoSelecionado
) {
  activeModal.value = tipo;
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
      v-show="isProfileOpen"
      :edit-id="editId"
      @close="onClose"
      class="w-full md:w-1/2 max-h-[90vh] h-auto overflow-x-hidden overflow-y-auto"
    />
    <SectionUsuariosModalsFormDialogAvailability
      v-show="isAvailabilityOpen"
      :selected-day-week="diaSelecionado"
      :motivos-confirmados="motivosConfirmados"
      @abrir-modal="abrirModal"
      @atualizar-horarios-sem-motivo="atualizarHorariosSemMotivo"
      @atualizar-motivos="atualizarMotivos"
      @atualizar-dia-selecionado="setDiaSelecionado"
      class="w-full md:w-1/2 max-h-[90vh] h-auto overflow-x-hidden overflow-y-auto"
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
      :selected-day-week="diaSelecionado"
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
      :selected-day-week="diaSelecionado"
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
      :selected-day-week="diaSelecionado"
      @fechar="fecharTodosModais"
      @atualizarComHorarios="atualizarMotivoEditadoComHorarios"
      @deletar="deletarMotivo"
    />
  </DialogSkeleton>
</template>
