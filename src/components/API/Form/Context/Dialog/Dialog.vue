<script setup lang="ts">
import { mergeProps } from 'vue';
import { useAPIFormContext } from '../Context';

const { editId } = useAPIFormContext();

//

type Props = {
  isBusy?: boolean;
  isLoading?: boolean;

  titleEdit: string;
  titleCreate: string;

  onClose: () => void;
  onDelete?: (id: any) => Promise<void>;
};

defineProps<Props>();

//

type Slots = {
  body(props: any): any;
};

defineSlots<Slots>();
</script>

<template>
  <div class="dialog">
    <div class="flex gap-2 items-center">
      <h1 class="dialog-title text-left flex-1">
        <span v-if="editId">{{ titleEdit }}</span>
        <span v-else>{{ titleCreate }}</span>
      </h1>

      <div class="flex items-center gap-2">
        <v-menu
          v-if="editId"
          :disabled="isLoading || isBusy"
          location="bottom end"
          :close-on-content-click="true"
        >
          <template #activator="{ props: menu }">
            <v-tooltip location="bottom">
              <template #activator="{ props: tooltip }">
                <v-btn
                  :disabled="isLoading || isBusy"
                  size="small"
                  variant="text"
                  icon="mdi-dots-vertical"
                  v-bind="mergeProps(menu, tooltip)"
                />
              </template>

              <span>Opções</span>
            </v-tooltip>
          </template>

          <v-list>
            <v-list-item
              v-if="onDelete"
              :disabled="isLoading || isBusy"
              slim
              link
              color="#e9001c"
              density="compact"
              @click.prevent="onDelete(editId)"
            >
              <template #prepend>
                <v-icon icon="mdi-delete" />
              </template>

              <v-list-item-title>Deletar</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          :disabled="isBusy"
          size="small"
          type="button"
          variant="text"
          icon="mdi-close"
          @click="onClose"
        />
      </div>
    </div>

    <v-divider class="my-4" />

    <div v-if="isLoading">
      <UILoading />
    </div>

    <div v-else class="form-body modal-form">
      <slot name="body" />
    </div>

    <v-divider />

    <div class="form-footer button-group">
      <UIButtonModalCancelButton :disabled="isBusy" @click="onClose" />

      <UIButtonModalEditButton v-if="editId" :disabled="isLoading || isBusy" />
      <UIButtonModalSaveButton v-else :disabled="isLoading || isBusy" />
    </div>
  </div>
</template>

<style scoped>
.dialog {
  display: flex;
  flex-direction: column;
  text-align: center;

  overflow: auto;

  padding: 32px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dialog-title {
  font-size: 24px;
  font-weight: 700;

  display: flex;
  align-items: center;
}

.dialog-title::before {
  content: '';
  display: block;
  width: 6px;
  height: 0.75lh;
  @apply bg-ldsa-green-1;
  margin-right: 1rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-top: 20px;
  gap: 20px;
}

.button {
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  border: none;
}

/*  */

.v-btn.buttonCancelar,
.v-btn.buttonCadastro {
  padding: 6px 20px;
  border-radius: 8px;
  height: auto;
  text-transform: none;
}

@media screen and (max-width: 450px) {
  .button-group {
    flex-direction: column;
    gap: 10px;
  }

  .v-btn.buttonCancelar,
  .v-btn.buttonCadastro {
    padding: 6px 20px;
  }
}
</style>
