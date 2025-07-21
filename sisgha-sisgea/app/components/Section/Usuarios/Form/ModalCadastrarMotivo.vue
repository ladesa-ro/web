<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
  horariosSemMotivo: string[];
}>();

const emit = defineEmits(['fechar', 'cadastrar']);

const horarioSelecionado = ref(props.horariosSemMotivo[0] || '');
const motivoText = ref('');

watch(
  () => props.horariosSemMotivo,
  (val) => {
    if (val.length > 0 && val[0] !== undefined) {
      horarioSelecionado.value = val[0];
    } else {
      horarioSelecionado.value = '';
    }
  }
);

function onSubmit() {
  if (!horarioSelecionado.value) return alert('Selecione um horário');
  if (!motivoText.value.trim()) return alert('Informe o motivo');

  emit('cadastrar', horarioSelecionado.value, motivoText.value.trim());
}
</script>