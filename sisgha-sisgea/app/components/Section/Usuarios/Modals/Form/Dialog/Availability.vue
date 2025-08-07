<script lang="ts" setup>
import {
  checkHasAtLeastOneActiveTeacherRole,
  useFormUser,
} from '../../../Form/FormUtils';
import { computed } from 'vue';

const { values: formValues } = useFormUser();

const hasAtLeastOneActiveTeacherRole = computed(() => {
  return checkHasAtLeastOneActiveTeacherRole(formValues.vinculos);
});

const emit = defineEmits<{
  (e: 'abrir-modal', tipo: 'cadastrar' | 'consultar' | 'listar' | 'editar', payload?: any): void;
  (e: 'atualizar-horarios-sem-motivo', horarios: string[]): void;
  (e: 'atualizar-motivos', motivos: Record<string, { horario: string; motivo: string }[]>): void;
}>();
</script>

<template>
  <SectionUsuariosFormAvailabilities
    v-if="hasAtLeastOneActiveTeacherRole"
    @abrir-modal="(...args) => emit('abrir-modal', ...args)"
    @atualizar-horarios-sem-motivo="emit('atualizar-horarios-sem-motivo', $event)"
    @atualizar-motivos="emit('atualizar-motivos', $event)"
  />
</template>
