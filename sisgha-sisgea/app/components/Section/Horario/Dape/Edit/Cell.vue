<script setup lang="ts">
import {
  attachClosestEdge,
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { type HorarioPrag } from './ItemsList';

const horarioMeta = defineModel<HorarioPrag>({ default: {}, required: true });
// const props = defineProps<HorarioPrag>();

let cleanup = () => {};
const horario = useTemplateRef('horario');

//

type Status = 'nada' | 'dragging' | 'dragging-hovering';
type ClosestEdge = Edge | null;

type DropTargetState = { status: Status; closestEdge: ClosestEdge };

const dropTargState: Ref<DropTargetState> = ref({
  status: 'nada',
  closestEdge: null,
});

const horarioFather = useTemplateRef('horario-father');

//

onMounted(() => {
  if (!horario.value || !horarioFather.value) {
    return;
  }

  cleanup = combine(
    draggable({
      element: horario.value,
      getInitialData: () => ({ ...horarioMeta.value, type: 'horarioDrag' }),
      onDrag: () => {
        horario.value?.classList.add('dragging');
      },
      onDrop: () => {
        horario.value?.classList.remove('dragging');
      },
    }),
    dropTargetForElements({
      element: horario.value,
      getData: ({ input, element }) => {
        return attachClosestEdge(
          { ...horarioMeta.value, type: 'horarioDrop' },
          {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          }
        );
      },
      getIsSticky: () => true,
      onDragEnter({ self }) {
        const closestEdge = extractClosestEdge(self.data);

        dropTargState.value = { status: 'dragging-hovering', closestEdge };
      },
      onDrag({ self }) {
        const closestEdge = extractClosestEdge(self.data);

        // atualizar apenas se alguma coisa mudou
        if (
          dropTargState.value.status !== 'dragging-hovering' ||
          dropTargState.value.closestEdge !== closestEdge
        ) {
          dropTargState.value = { status: 'dragging-hovering', closestEdge };
        }
      },
      onDragLeave: () => {
        dropTargState.value.status = 'nada';
      },
      onDrop: () => {
        dropTargState.value.status = 'nada';
      },
    })
  );
});

onUnmounted(() => {
  cleanup();
});

//

const openPopover = ref(false);

//

const active = ref(false);

const toggleActive = () => {
  active.value = !active.value;
  active.value
    ? addHorarioAtivo(horarioMeta.value.id)
    : removeHorarioAtivo(horarioMeta.value.id);
};

//

const emit = defineEmits(['atividade-change']);

const changeAtividade = (atv: 'aula' | 'vago' | 'intervalo') => {
  if (horarioMeta.value.atividade !== atv) {
    horarioMeta.value.atividade = atv;

    emit('atividade-change');
  }
};
</script>

<template>
  <div
    v-if="openPopover"
    class="fixed flex gap-3 top-9 right-0 border-2 border-green-500 rounded-lg p-2.5 bg-white z-[200] shadow-xl"
  >
    <button
      class="p-2 border-2 border-gray-400 rounded-md cursor-pointer"
      @click.stop="changeAtividade('aula')"
    >
      Aula
    </button>
    <button
      class="p-2 border-2 border-gray-400 rounded-md cursor-pointer"
      @click.stop="changeAtividade('vago')"
    >
      Vago
    </button>
    <button
      class="p-2 border-2 border-gray-400 rounded-md cursor-pointer"
      @click.stop="changeAtividade('intervalo')"
    >
      Intervalo
    </button>
  </div>
  <div
    v-show="showIntervalos ? true : horarioMeta.atividade !== 'intervalo'"
    ref="horario-father"
    class="relative not-last:border-b-[0.119565rem] nth-of-type-[2n]:mb-[0.5px] border-t-solid border-t-[transparent] border-b-solid border-b-gray-500 transform-[translateZ(0)]"
    @click="toggleActive()"
    :class="{ 'bg-green-100': active }"
  >
    <SectionHorarioDapeEditDropIndicator
      v-if="
        dropTargState.status === 'dragging-hovering' &&
        dropTargState.closestEdge &&
        dropTargState.closestEdge === 'top'
      "
      class="translate-z-0 -translate-y-[0.10195rem]"
      :edge="dropTargState.closestEdge"
    />

    <div
      ref="horario"
      id="horario"
      class="relative box-border text-center h-[35px] flex justify-center items-center font-medium"
      :class="{
        'text-green-900': active,
        'bg-gray-200': horarioMeta.atividade === 'intervalo' && !active,
      }"
    >
      {{ horarioMeta.atividade }} - {{ horarioMeta.id }}

      <span class="absolute right-3 cursor-pointer">
        <IconEdit
          @click.stop="openPopover = !openPopover"
          class="inline h-3 text-black mr-2.5 hover"
          :class="{ 'inline-block!': openPopover }"
        />
        <IconExclude
          @click.stop="changeAtividade('vago')"
          class="inline h-3 text-red-500 hover"
          :class="{ 'inline-block!': openPopover }"
        />
      </span>
    </div>

    <SectionHorarioDapeEditDropIndicator
      v-if="
        dropTargState.status === 'dragging-hovering' &&
        dropTargState.closestEdge &&
        dropTargState.closestEdge === 'bottom'
      "
      class="translate-z-0"
      :edge="dropTargState.closestEdge"
    />
  </div>
</template>

<style scoped>
.dragging {
  opacity: 0.15;
}

.hover {
  display: none;
}

#horario:hover .hover {
  display: inline-block;
}
</style>
