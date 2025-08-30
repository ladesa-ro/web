<script setup lang="ts">
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
  <div class="campus-list">
    <button
      v-for="c in campi"
      :key="c.value"
      @click="changeCampus(c.value)"
      class="campus-option flex items-center gap-3 p-2 border rounded-md hover:bg-gray-100"
    >
      <img :src="c.fotoUrl" alt="foto campus" class="campus-img w-12 h-12 object-cover rounded" />
      <span>{{ c.label }}</span>
    </button>
  </div>
</template>
