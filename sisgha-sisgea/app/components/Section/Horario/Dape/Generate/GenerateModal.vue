<script setup lang="ts">
defineProps<{ selectedToggleItem: 'mesclado' | 'professor' | 'turma' }>();

const isModalActive = ref(false);

const onClose = () => (isModalActive.value = false);
</script>

<template>
  <DialogSkeleton
    disable-inline-block
    class="flex justify-center"
    v-model="isModalActive"
  >
    <template #activator>
      <UIButtonDefault
        outlineOnClink
        ref="generateButton"
        class="fixed bottom-14 sm:bottom-16 md:bottom-18 2xl:bottom-26 z-10 w-max shadow-[0_7.5px_15px_rgba(0,0,0,0.2)] transition-[translate,filter,scale] duration-[400ms,200ms,100ms] ease-in-out will-change-[transform,filter] hover:brightness-95 active:scale-97"
        :class="{
          'translate-y-[100vh] duration-[1050ms,200ms,100ms]':
            selectedToggleItem === 'mesclado',
        }"
      >
        <template #start-icon>
          <IconsGenerate />
        </template>

        Gerar Horário
      </UIButtonDefault>
    </template>

    <DialogModalBaseLayout title="Gerar Horário Acadêmico" :onClose="onClose">
      <!-- TODO: adicionar conteúdo do modal -->

      <template #button-group>
        <UIButtonModalCancel @click="onClose" />

        <UIButtonModalBaseLayout
          color="var(--ladesa-green-2-color)"
          type="submit"
          text="Gerar Horário"
          class="px-3 gap-2"
        >
          <IconsGenerate class="min-w-4" />
        </UIButtonModalBaseLayout>
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>
