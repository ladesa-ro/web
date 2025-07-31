<script setup lang="ts">
import ClockPermanent from '~/components/Icons/ClockPermanent.vue';
import ClockTemporary from '~/components/Icons/ClockTemporary.vue';

defineProps<{ selectedToggleItem: 'mesclado' | 'professor' | 'turma' }>();

const isModalActive = ref(false);

const onClose = () => (isModalActive.value = false);

//

const toggleItems = [
  { value: 'permanente', text: 'Permanente', icon: ClockPermanent },
  { value: 'temporario', text: 'Temporário', icon: ClockTemporary },
];

const toggleValue = ref('permanente');

//

const dayjs = useDayJs();
const initialDate = ref(dayjs().format('DD/MM/YYYY'));
const finalDate = ref(dayjs().add(1, 'week').format('DD/MM/YYYY'));
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
      <VVAutocompleteAPIOfertaFormacao name="ofertaFormacao" class="mt-1" />

      <hr class="border border-ldsa-grey" />

      <span class="font-semibold text-center text-ldsa-grey leading-2.5">
        O horário deve ser...
      </span>

      <UIToggle :items="toggleItems" v-model="toggleValue" />

      <div class="flex max-sm:flex-col gap-5">
        <!-- TODO: implementar date picker do reka-ui nesses dois textfields -->

        <UIFormTextField
          v-model="initialDate"
          label="Data de Início"
          placeholder="25/12/2025"
        />

        <UIFormTextField
          v-model="finalDate"
          label="Data de Término"
          placeholder="25/12/2025"
          :disabled="toggleValue === 'permanente'"
        />
      </div>

      <span
        v-if="toggleValue === 'permanente'"
        class="text-sm text-ldsa-grey text-center sm:mb-20"
      >
        Este horário pode ser sobreposto por um horário temporário ou
        substituído por outro horário permanente gerado no futuro.
      </span>

      <span v-else class="text-sm text-ldsa-grey text-center sm:mb-20">
        Ao passar a data de término, este horário temporário será substituído
        pelo horário permanente atualmente utilizado.
      </span>

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
