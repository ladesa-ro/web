<script lang="ts" setup>
const props = defineProps<{
  motivosConfirmados: Record<string, { horario: string; motivo: string }[]>;
  selectedDayWeek: string | null;
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
}>();

const diasDaSemana = [
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sábado',
];

const motivosDoDia = computed(() => {
  return props.selectedDayWeek
    ? props.motivosConfirmados[props.selectedDayWeek] || []
    : [];
});

function normalizarChave(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function formatarDia(dia: string): string {
  const diasComFeira = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'];
  return diasComFeira.includes(dia.toLowerCase()) ? `${dia}-feira` : dia;
}

const motivosFormatadosPorDia = computed(() => {
  const chavesNormalizadas = Object.keys(props.motivosConfirmados).reduce(
    (acc, chaveOriginal) => {
      const chaveNormalizada = normalizarChave(chaveOriginal);
      acc[chaveNormalizada] = props.motivosConfirmados[chaveOriginal] ?? [];
      return acc;
    },
    {} as Record<string, { horario: string; motivo: string }[]>
  );

  return diasDaSemana.map(diaOriginal => {
    const chaveNormalizada = normalizarChave(diaOriginal);
    const motivos = chavesNormalizadas[chaveNormalizada] ?? [];
    return {
      dia: diaOriginal,
      motivos,
    };
  });
});

const onClose = () => emit('fechar');
</script>

<template>
  <DialogModalBaseLayout
    :close-button="false"
    :on-close="onClose"
    title="Consultar motivos de indisponibilidade"
  >
    <div class="overflow-y-auto pr-2">
      <div v-for="item in motivosFormatadosPorDia" :key="item.dia" class="mb-8">
        <h3
          class="main-title font-semibold text-[12px] mb-2 capitalize text-ldsa-text-default"
        >
          {{ formatarDia(item.dia) }}
        </h3>

        <div
          v-if="item.motivos.length === 0"
          class="text-[12px] text-ldsa-grey"
        >
          Não há indisponibilidade neste dia
        </div>

        <ul v-else class="space-y-1 text-sm">
          <li
            v-for="motivo in item.motivos"
            :key="motivo.horario + motivo.motivo"
            class="flex justify-between items-center border-b border-ldsa-grey py-2"
          >
            <span class="font-semibold text-[12px] text-ldsa-text-default">{{
              motivo.motivo
            }}</span>
            <span class="text-[12px] text-ldsa-grey">{{ motivo.horario }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="pt-6">
      <UIButtonModalGoBack @click="emit('fechar')" />
    </div>
  </DialogModalBaseLayout>
</template>

<style scoped>
.main-title::before {
  content: '';
  border: 2px solid var(--ladesa-green-1-color);
  margin-right: 0.5rem;
  height: auto;
}
</style>
