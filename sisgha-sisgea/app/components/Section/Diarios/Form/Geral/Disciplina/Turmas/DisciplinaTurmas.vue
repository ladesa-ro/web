<script lang="ts" setup>
import { useContextDiariosFormGeral } from '../../Contexto';

const $emit = defineEmits(['close', 'add', 'back']);

const { disciplinaId } = useContextDiariosFormGeral();

const searchBarText = ref('');

const options = computed(() => ({
  search: unref(searchBarText),
  disciplinaId: disciplinaId.value,
}));

const {
  composables: { useListQuery },
} = useLadesaApiCrudTurmas(); // Altere se o composable for outro

const {
  data: { items: turmas },
  methods: { suspend },
} = useListQuery(options);

await suspend();

const closeForm = () => {
  $emit('close');
};

const addForm = () => {
  $emit('add');
};

const backForm = () => {
  $emit('back');
};
</script>

<template>
  <form class="min-w-[28.125rem]">
    <DialogModalBaseLayout
      :on-close="closeForm"
      title="Gerenciamento de turmas da disciplina"
      title-variant="x-small"
    >
    </DialogModalBaseLayout>
  </form>
</template>