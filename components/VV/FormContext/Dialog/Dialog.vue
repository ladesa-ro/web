<script setup lang="ts">
import { mergeProps } from 'vue';
import { useFormContext } from '../-Context/Context';

//

const { editId } = useFormContext();

//

type Props = {
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

const slots = defineSlots<Slots>();

//
</script>

<template>
  <div class="dialog">
    <div class="grid grid-cols-1 items-center">
      <h1
        class="dialog-title justify-self-center row-start-1 col-start-1 col-span-1"
      >
        <span v-if="editId">{{ titleEdit }}</span>
        <span v-else>{{ titleCreate }}</span>
      </h1>

      <div
        class="row-start-1 self-end justify-self-end col-start-1 col-span-1 flex items-center gap-2"
      >
        <v-menu
          v-if="editId"
          location="bottom end"
          :close-on-content-click="true"
        >
          <template v-slot:activator="{ props: menu }">
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                  size="small"
                  variant="text"
                  icon="mdi-dots-vertical"
                  v-bind="mergeProps(menu, tooltip)"
                >
                </v-btn>
              </template>

              <span>Opções</span>
            </v-tooltip>
          </template>

          <v-list>
            <v-list-item
              v-if="onDelete"
              slim
              link
              color="#e9001c"
              density="compact"
              @click.prevent="onDelete(editId)"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-delete"></v-icon>
              </template>

              <v-list-item-title>Deletar</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          size="small"
          type="button"
          variant="text"
          icon="mdi-close"
          @click="onClose"
        />
      </div>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <slot name="body"></slot>
    </div>

    <v-divider />

    <div class="form-footer button-group">
      <UIButtonModalCancelButton @click="onClose" />

      <UIButtonModalEditButton v-if="editId" />
      <UIButtonModalSaveButton v-else />
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
