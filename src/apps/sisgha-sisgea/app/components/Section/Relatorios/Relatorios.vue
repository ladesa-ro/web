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

const gerarPDF = () => {};
</script>

<template>
  <UIContainer variant="tighter" class="u-flex u-justify-center">
    <div
      class="relatorios__content u-flex-1 u-flex u-flex-col u-justify-center u-gap-7"
    >
      <UIBreadcrumbDapeBreadcrumb />

      <RelatorioFiltrosPrincipais />

      <RelatorioFiltrosOpcionais />

      <hr class="relatorios__divider" />

      <RelatorioBotoes
        @visualizar="visualizarRelatorio"
        @gerar-pdf="gerarPDF"
      />

      <DialogSkeleton v-model="showModal">
        <RelatorioModal :form="values" :on-close="() => (showModal = false)" />
      </DialogSkeleton>
    </div>
  </UIContainer>
</template>

<style scoped>
.relatorios__content {
  max-width: 48rem;
}

.relatorios__divider {
  border-top: 2px solid var(--ladesa-grey-color);
}
</style>
