<script lang="ts" setup>
type Calendario = {
  cor: string;
  inicio: string; // trocar para Date dps!
  fim: string; // trocar para Date dps!
};

const calendario = ref<Calendario>({
  cor: '#000000',
  inicio: '',
  fim: '',
});

// const backform = () => {
//   $emit('back'); // Emitir o evento de próximo
// };

const closeForm = () => {
  $emit('close');
};

const nextForm = () => {
  $emit('next');
};

const $emit = defineEmits(['close', 'next', 'back']);
</script>

<template>
  <!-- <form> -->
  <DialogModalBaseLayout title="Cadastrar Calendário" :on-close="closeForm">
    <!-- TODO: transformar cada evento em componente -->
    <div class="flex items-center mr-3">
      <span class="font-bold mr-2">Recuperação 1</span>
      <hr class="divider flex-grow" />
    </div>

    <div class="form-body modal-form">
      <VVTextField
        v-model="calendario.cor"
        type="color"
        label="Cor"
        placeholder="Selecione a cor"
        name="nome"
        class="color-picker-square"
      />

      <div class="date-fields">
        <VVTextField
          v-model="calendario.inicio"
          type="date"
          label="Início"
          placeholder="Selecione a data de início"
          name="inicio"
        />
        <VVTextField
          v-model="calendario.fim"
          type="date"
          label="Término"
          placeholder="Selecione a data de término"
          name="fim"
        />
      </div>

      <div class="lineup flex items-center mt-2">
        <span class="font-bold mr-2">Recuperação 2</span>
        <hr class="divider flex-grow m-0" />
      </div>

      <VVTextField
        v-model="calendario.cor"
        type="color"
        label="Cor"
        placeholder="Selecione a cor"
        name="nome"
        class="color-picker-square"
      />

      <div class="date-fields">
        <VVTextField
          v-model="calendario.inicio"
          type="date"
          label="Início"
          placeholder="Selecione a data de início"
          name="inicio"
        />
        <VVTextField
          v-model="calendario.fim"
          type="date"
          label="Término"
          placeholder="Selecione a data de término"
          name="fim"
        />
      </div>

      <div class="lineup flex items-center mt-2">
        <span class="font-bold mr-2">Exame</span>
        <hr class="divider flex-grow m-0" />
      </div>

      <VVTextField
        v-model="calendario.cor"
        type="color"
        label="Cor"
        placeholder="Selecione a cor"
        name="nome"
        class="color-picker-square"
      />

      <div class="date-fields">
        <VVTextField
          v-model="calendario.inicio"
          type="date"
          label="Início"
          placeholder="Selecione a data de início"
          name="inicio"
        />
        <VVTextField
          v-model="calendario.fim"
          type="date"
          label="Término"
          placeholder="Selecione a data de término"
          name="fim"
        />
      </div>
    </div>

    <template #button-group>
      <UIButtonModalCancelButton @click="closeForm" />
      <!-- <UIButtonModalBackButton @click="backform" /> -->
      <UIButtonModalAdvancedButton @click="nextForm" />
    </template>
  </DialogModalBaseLayout>
  <!-- </form> -->
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.divider {
  @apply border-solid border-[1px] border-ldsa-grey;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  @apply mr-3;
}

.color-picker-square input[type='color']::-webkit-color-swatch {
  width: 50px;
  height: 50px;
  border: none;
  background: none;
}

.color-picker-square input[type='color'] {
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  cursor: pointer;
}

.date-fields {
  display: flex;
  gap: 20px;
}

.date-fields .v-text-field {
  flex: 1;
}

.lineup {
  margin-bottom: -18px;
}
</style>
