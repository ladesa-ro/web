<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import * as RadixDialog from "radix-vue";

type Props = {
  editId?: string | null;
};

const { editId = null } = defineProps<Props>();

type Intervalos = {
  inicio: string;
  termino: string;
};

const intrvalo = ref<Intervalos>({
  inicio: "",
  termino: "",
});

const $emit = defineEmits(["close", "next", "back"]);

const closeForm = () => $emit("close");
const nextForm = () => $emit("next");
</script>

<template>
  <DialogModalBaseLayout :on-close="closeForm" title="Cadastrar Intervalo">
    <div class="flex items-center mr-3">
      <span class="font-semibold mr-2">Início</span>
      <hr class="divider flex-grow" />
    </div>
  </DialogModalBaseLayout>
</template>