<script setup lang="ts">
import { useForm } from 'vee-validate';
import RelatorioBotoes from '~/components/Section/Relatorios/Buttons/Buttons.vue';
import RelatorioFiltrosOpcionais from '~/components/Section/Relatorios/Filters/FiltrosOpcionais.vue';
import RelatorioFiltrosPrincipais from '~/components/Section/Relatorios/Filters/FiltrosPrincipais.vue';
import RelatorioModal from '~/components/Section/Relatorios/Modal/Modal.vue';

const { values } = useForm({
  initialValues: {
    professor: { id: null as string | null },
    calendarioLetivo: { id: null as string | null },
    etapa: { id: null as string | null },
    disciplina: { id: null as string | null },
    curso: { id: null as string | null },
    turma: { id: null as string | null },
  },
});

const showModal = ref(false);

const visualizarRelatorio = () => {
  showModal.value = true;
};

const gerarPDF = () => {
  // TODO: implementar lógica para gerar PDF
};
</script>

<template>
  <UIContainer variant="tighter" class="flex justify-center">
    <div class="flex-1 flex flex-col justify-center gap-7 max-w-3xl">
      <UIBreadcrumbDapeBreadcrumb />

      <RelatorioFiltrosPrincipais />

      <RelatorioFiltrosOpcionais />

      <hr class="border-t-2 border-ldsa-grey">

      <RelatorioBotoes @visualizar="visualizarRelatorio" @gerar-pdf="gerarPDF" />

      <DialogSkeleton v-model="showModal">
        <RelatorioModal :form="values" :on-close="() => (showModal = false)" />
      </DialogSkeleton>
    </div>
  </UIContainer>
</template>
