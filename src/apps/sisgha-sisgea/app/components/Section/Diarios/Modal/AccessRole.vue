<script lang="ts" setup>
const emit = defineEmits(['selectRole']);

const activeButton = ref<string>('DAPE');

const selectProfessor = () => {
  activeButton.value = 'Professor';
  emit('selectRole', 'Professor');
};

const selectAgrupamento = () => {
  activeButton.value = 'AGRUPAMENTO';
  emit('selectRole', 'AGRUPAMENTO');
};
</script>

<template>
  <div class="u-flex u-flex-col u-justify-between u-items-center access-role">
    <section class="u-flex u-flex-row u-justify-between u-w-full u-gap-4">
      <!-- ===================== AGRUPAMENTO ===================== -->
      <div
        :class="{
          'toggle-option--active': activeButton === 'AGRUPAMENTO',
          'toggle-option--inactive': activeButton !== 'AGRUPAMENTO',
        }"
        class="toggle-option"
        @click="selectAgrupamento"
      >
        <IconsGroup height="40" width="42" />
        <p class="toggle-option__label">Aulas por dia</p>
      </div>
      <!-- =============================================== -->

      <!-- ================== PROFESSOR ================== -->
      <div
        :class="{
          'toggle-option--active': activeButton === 'Professor',
          'toggle-option--inactive': activeButton !== 'Professor',
        }"
        class="toggle-option"
        @click="selectProfessor"
      >
        <IconsEducator height="49" width="36" />
        <p class="toggle-option__label">Professores</p>
      </div>
      <!-- =============================================== -->
    </section>
  </div>
</template>

<style scoped>
.access-role {
  background-color: var(--ladesa-background-color);
}

.toggle-option {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--ui-space-2);
  width: 14rem;
  height: 10rem;
  border: 2px solid transparent;
  border-radius: var(--ui-radius-lg);
  text-align: center;
  cursor: pointer;
}

.toggle-option__label {
  font-weight: 600;
}

.toggle-option--inactive {
  border-color: rgb(from var(--ladesa-grey-color) R G B / 100%);
}

.toggle-option--active {
  background-color: var(--ladesa-green-1-color);
  border-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
}
</style>
