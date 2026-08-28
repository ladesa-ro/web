<script lang="ts" setup>
import { useField } from 'vee-validate';
import { Cargo } from '~/utils/constants';

const { value: vinculos } = useField<any[]>('vinculos');

// Vínculos como vieram do servidor (com id real de cada perfil) — o schema
// do formulário não carrega o id, então a carga horária é lida/gravada
// direto contra o perfil existente, fora do fluxo de "Salvar" em lote.
const originalVinculos = inject<Ref<{ vinculos: any[] } | undefined>>(
  'FORM_USER_ORIGINAL_VINCULOS'
);

const perfil = usePerfil();
const { error: toastError } = useToast();
const cargaMaximaSemanal = reactive<Record<number, number | null>>({});

function findPerfilId(index: number): string | null {
  const v = vinculos.value[index];
  if (!v?.campus?.id || !v?.cargo) return null;
  const match = originalVinculos?.value?.vinculos?.find(
    (o: any) => o.campus?.id === v.campus.id && o.cargo === v.cargo
  );
  return match?.id ?? null;
}

watch(
  () => originalVinculos?.value?.vinculos,
  original => {
    if (!original) return;
    original.forEach((v: any, i: number) => {
      cargaMaximaSemanal[i] = v.cargaMaximaSemanal ?? null;
    });
  },
  { immediate: true }
);

async function handleCargaMaximaSemanalBlur(index: number) {
  const perfilId = findPerfilId(index);
  if (!perfilId) return;

  try {
    await perfil.update(perfilId, {
      cargaMaximaSemanal: cargaMaximaSemanal[index] ?? null,
    });
  } catch {
    toastError({ title: 'Não foi possível salvar a carga horária máxima' });
  }
}

const campi = useCampi();
const campiList = campi.list();
const totalCampi = computed(() => campiList.data.value?.data?.length ?? 0);

const maxVinculos = computed(
  () => totalCampi.value * Object.keys(Cargo).length
);

const usedCombinations = computed(() => {
  return new Set(
    vinculos.value
      .filter((v: any) => v.campus?.id && v.cargo)
      .map((v: any) => `${v.campus.id}::${v.cargo}`)
  );
});

const isDuplicate = (index: number) => {
  const v = vinculos.value[index];
  if (!v?.campus?.id || !v?.cargo) return false;
  const key = `${v.campus.id}::${v.cargo}`;
  return vinculos.value.some(
    (other: any, i: number) =>
      i < index &&
      other.campus?.id &&
      other.cargo &&
      `${other.campus.id}::${other.cargo}` === key
  );
};

const canAddMore = computed(() => {
  const filled = vinculos.value.filter(
    (v: any) => v.campus?.id && v.cargo
  ).length;
  return filled < maxVinculos.value;
});

const addField = () => {
  vinculos.value = [...vinculos.value, { campus: { id: null }, cargo: null }];
};

const removeField = (targetIndex: number) => {
  if (targetIndex > 0) {
    vinculos.value = vinculos.value.filter(
      (_: any, idx: number) => idx !== targetIndex
    );
  }
};
</script>

<template>
  <hr class="border border-ldsa-grey my-1" />

  <div v-for="(vinculo, index) in vinculos" :key="index">
    <div class="flex gap-4 items-start">
      <VVAutocompleteAPICampus :name="`vinculos[${index}].campus.id`" />

      <VVSelectRoles
        :name="`vinculos[${index}].cargo`"
        class="w-full max-w-[10.65rem]"
      />

      <button
        v-if="index > 0"
        class="shrink-0 flex justify-center text-ldsa-red h-12 w-7 hover:bg-ldsa-red/10 rounded-sm"
        aria-label="Remover vínculo"
        type="button"
        @click="removeField(index)"
      >
        <IconsExclude class="w-5" />
      </button>
    </div>

    <p v-if="isDuplicate(index)" class="text-ldsa-red text-xs font-semibold">
      Este vínculo já existe!
    </p>

    <div
      v-if="vinculo.cargo === Cargo.PROFESSOR && findPerfilId(index)"
      class="max-w-[16rem] mt-2"
    >
      <UIFormTextField
        :name="`vinculos[${index}].cargaMaximaSemanal`"
        :model-value="cargaMaximaSemanal[index] ?? undefined"
        type="number"
        label="Carga horária máxima semanal (h)"
        placeholder="Sem limite"
        @update:model-value="
          value => (cargaMaximaSemanal[index] = value ? Number(value) : null)
        "
        @blur="handleCargaMaximaSemanalBlur(index)"
      />
    </div>
  </div>

  <button
    v-if="canAddMore"
    class="flex justify-center gap-3 border-dotted border-3 rounded-lg p-4 border-ldsa-grey hover:bg-ldsa-grey/10 transition-[background-color] text-ldsa-text-default"
    type="button"
    @click="addField"
  >
    Novo Vínculo
    <IconsAdd class="w-4" />
  </button>

  <hr class="border border-ldsa-grey my-1" />
</template>
