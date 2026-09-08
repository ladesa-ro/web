<script lang="ts" setup>
const periodos = useInjectCursoPeriodos();
const disciplinasById = periodos.disciplinasById;
</script>

<template>
  <DialogModalBaseLayout
    :on-close="() => {}"
    :close-button="false"
    title="Disciplinas de cada período"
  >
    <div
      v-if="periodos.periodosVisiveis.value.length === 0"
      class="u-text-sm u-text-center u-py-8 form-disciplinas__empty"
    >
      Defina a quantidade de períodos no formulário ao lado.
    </div>

    <div
      v-for="periodo in periodos.periodosVisiveis.value"
      :key="periodo.numeroPeriodo"
      class="u-flex u-flex-col"
    >
      <div class="u-flex u-items-center u-gap-2-5">
        <h1 class="u-font-medium">Período {{ periodo.numeroPeriodo }}</h1>
        <div class="u-flex-1 form-disciplinas__divider" />
        <button
          type="button"
          class="u-shrink-0 u-flex u-items-center u-justify-center u-rounded-md form-disciplinas__edit-button"
          @click="periodos.openSelectDisciplinas(periodo.numeroPeriodo)"
        >
          <IconsEdit class="form-disciplinas__edit-icon" />
        </button>
      </div>

      <div
        v-if="
          periodo.disciplinas.length === 0 &&
          periodo.removedDisciplinaIds.length === 0
        "
        class="u-py-3 u-px-1"
      >
        <span class="u-text-sm form-disciplinas__empty-label">
          Nenhuma disciplina vinculada
        </span>
      </div>

      <div
        v-for="disc in periodo.disciplinas"
        :key="disc.disciplinaId"
        class="u-flex u-items-center u-justify-between u-px-1 u-py-3-5 form-disciplinas__row"
      >
        <span class="u-text-sm u-font-medium form-disciplinas__row-nome">
          {{ disciplinasById.get(disc.disciplinaId)?.nome ?? '...' }}
          <span
            v-if="
              periodos.isDisciplinaNova(
                periodo.numeroPeriodo,
                disc.disciplinaId
              )
            "
            class="u-text-xs u-font-semibold u-ml-1 form-disciplinas__nova-tag"
          >
            Nova
          </span>
        </span>
        <span class="u-text-xs u-font-medium form-disciplinas__row-carga">
          Carga Horária:
          {{
            disc.cargaHoraria ??
            disciplinasById.get(disc.disciplinaId)?.cargaHoraria ??
            '—'
          }}h
        </span>
      </div>

      <div
        v-for="removedId in periodo.removedDisciplinaIds"
        :key="removedId"
        class="u-flex u-items-center u-justify-between u-px-1 u-py-3-5 form-disciplinas__row form-disciplinas__row--removed"
      >
        <span
          class="u-text-sm u-font-medium form-disciplinas__row-nome form-disciplinas__row-nome--removed"
        >
          {{ disciplinasById.get(removedId)?.nome ?? '...' }}
          <span
            class="u-text-xs u-font-semibold u-ml-1 form-disciplinas__removida-tag"
          >
            Removida
          </span>
        </span>
        <span
          class="u-text-xs u-font-medium form-disciplinas__row-carga form-disciplinas__row-carga--removed"
        >
          Carga Horária:
          {{ disciplinasById.get(removedId)?.cargaHoraria ?? '—' }}h
        </span>
      </div>
    </div>
  </DialogModalBaseLayout>
</template>

<style scoped>
.form-disciplinas__empty {
  color: var(--ladesa-grey-color);
}

.form-disciplinas__divider {
  height: 2.5px;
  background-color: var(--ladesa-grey-color);
}

.form-disciplinas__edit-button {
  width: var(--ui-space-7);
  height: var(--ui-space-7);
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
  transition: background-color var(--ui-duration-base) var(--ui-easing-standard);
}

.form-disciplinas__edit-button:hover {
  background-color: var(--ladesa-green-2-color);
}

.form-disciplinas__edit-icon {
  width: var(--ui-space-3);
}

.form-disciplinas__empty-label {
  color: var(--ladesa-grey-color);
}

.form-disciplinas__row {
  border-bottom: 1px solid var(--ladesa-grey-color);
  overflow: clip;
}

.form-disciplinas__row--removed {
  border-bottom-color: rgb(from var(--ladesa-grey-color) R G B / 50%);
  opacity: 0.5;
}

.form-disciplinas__row-nome {
  color: var(--ladesa-text-default-color);
}

.form-disciplinas__row-nome--removed {
  text-decoration: line-through;
}

.form-disciplinas__nova-tag {
  color: var(--ladesa-green-1-color);
}

.form-disciplinas__row-carga {
  color: var(--ladesa-grey-color);
}

.form-disciplinas__row-carga--removed {
  text-decoration: line-through;
}

.form-disciplinas__removida-tag {
  color: var(--ladesa-red-color);
  text-decoration: none;
  display: inline-block;
}
</style>
