<script lang="ts" setup>
import { getActivesTeacherRole, useFormUser } from '../../../Form/FormUtils';

const { values: formValues } = useFormUser();

const hasAtLeastOneActiveTeacherRole = computed(() => {
  return getActivesTeacherRole(formValues.vinculos).length > 0;
});

const emit = defineEmits<{
  (
    e: 'abrir-modal',
    tipo: 'cadastrar' | 'consultar' | 'listar' | 'editar',
    payload?: any
  ): void;
  (e: 'atualizar-horarios-sem-motivo', horarios: string[]): void;
  (
    e: 'atualizar-motivos',
    motivos: Record<string, { horario: string; motivo: string }[]>
  ): void;
  (e: 'update:has-teacher-role', value: boolean): void;
}>();

watch(hasAtLeastOneActiveTeacherRole, val => emit('update:has-teacher-role', val), { immediate: true });
</script>

<template>
  <SectionUsuariosFormAvailabilities
    v-if="hasAtLeastOneActiveTeacherRole"
    class="h-full"
    @abrir-modal="(...args) => emit('abrir-modal', ...args)"
    @atualizar-horarios-sem-motivo="
      emit('atualizar-horarios-sem-motivo', $event)
    "
    @atualizar-motivos="emit('atualizar-motivos', $event)"
  />
</template>
