<script setup lang="ts">
import { DialogModalBaseLayout } from '#components';

type Campus = {
  label: string;
  value: string;
  fotoUrl: string;
};

const props = defineProps<{
  campi: Campus[];
  selectedCampusId: { value: string };
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'campus-alterado', id: string): void;
}>();

function changeCampus(newCampusId: string) {
  props.selectedCampusId.value = newCampusId;
  emit('campus-alterado', newCampusId);
  emit('close');
}
</script>

<template>
  <DialogModalBaseLayout
    title="Alterar Campus"
    :on-close="() => emit('close')"
    :close-button="true"
  >
    <div class="campus-list">
      <button
        v-for="c in campi"
        :key="c.value"
        @click="changeCampus(c.value)"
        class="campus-option"
      >
        <img :src="c.fotoUrl" alt="foto campus" class="campus-img" />
        {{ c.label }}
      </button>
    </div>
  </DialogModalBaseLayout>
</template>