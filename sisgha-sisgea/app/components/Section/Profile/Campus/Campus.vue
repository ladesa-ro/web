<script setup lang="ts">
import { useCampusContext, useUserCargoAndCampi } from '#imports';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import * as yup from 'yup';

import fotoCampus from '~/assets/imgs/Foto-Campus.png';
import IconLocale from '~/components/Icons/IconLocale.vue';

const { userId } = defineProps<{ userId: string }>();
const selectedCampusGlobalState = useCampusContext();
const { campiList } = useUserCargoAndCampi();

const toggleCampusItems = campiList.map(campus => ({
  label: campus.apelido,
  value: campus.id,
  fotoUrl: fotoCampus,
}));

const campusAtual = computed(() => {
  return (
    toggleCampusItems.find(
      c => c.value === selectedCampusGlobalState.value
    ) ?? {
      label: 'Carregando campus...',
      fotoUrl: '',
    }
  );
});

const showAlterarModal = ref(false);

type FormValues = { novoCampus: string | null };
const schema = yup.object({
  novoCampus: yup.string().required('Selecione um campus'),
});

const { handleSubmit, values: formValues } = useForm<FormValues>({
  validationSchema: schema,
  initialValues: { novoCampus: selectedCampusGlobalState.value },
});

const onSubmit = handleSubmit(values => {
  selectedCampusGlobalState.value = values.novoCampus!;
  showAlterarModal.value = false;
});

function fecharModal() {
  showAlterarModal.value = false;
}
</script>

<template>
  <SectionProfileSectionsLayout :icon="IconLocale" title="Campus atual">
    <div class="campus-card border-2 border-ldsa-grey rounded-xl">
      <img
        v-if="campusAtual.fotoUrl"
        :src="campusAtual.fotoUrl"
        alt="Foto do campus"
        class="campus-img rounded-t-xl w-full h-32 object-cover"
      />
      <p class="text-center my-3 font-semibold">{{ campusAtual.label }}</p>
    </div>

    <DialogSkeleton
      v-model="showAlterarModal"
      class="flex justify-center w-full"
    >
      <template #activator>
        <UIButtonDefault class="w-full mt-4"> Alterar </UIButtonDefault>
      </template>

      <form @submit.prevent="onSubmit">
        <DialogModalBaseLayout
          title="Alterar Campus"
          :on-close="fecharModal"
          :close-button="true"
        >
          <VVTextField
            :value="campusAtual.label"
            name="campusAtual"
            label="Campus atual"
            type="text"
            disabled
            class="mt-2"
          />

          <VVAutocomplete
            v-model="formValues.novoCampus"
            :items="toggleCampusItems"
            label="Selecionar  campus"
            name="novoCampus"
            placeholder="Selecione um campus"
          />

          <template #button-group>
            <UIButtonModalCancel @click="showAlterarModal = false" />
            <UIButtonModalSave type="submit" text="Alterar"/>
          </template>
        </DialogModalBaseLayout>
      </form>
    </DialogSkeleton>
  </SectionProfileSectionsLayout>
</template>
