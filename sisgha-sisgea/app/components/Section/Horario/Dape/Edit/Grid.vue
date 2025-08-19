<script setup lang="ts">
import {
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useRefHistory } from '@vueuse/core';
import { onMounted, onUnmounted } from 'vue';
import { dia, type HorarioPrag } from './ItemsList';

const columnIds = [1, 2, 3];

const closestEdgeToElement: Ref<Edge | null> = ref(null);

let cleanup = () => {};

const horariosHistory = useRefHistory(dia, { deep: true, capacity: 10 });

onMounted(() => {
  cleanup = monitorForElements({
    canMonitor: ({ source }) => source.data.type === 'horarioDrag',
    onDrag: ({ location }) => {
      const dropTarget = location.current.dropTargets[0];
      if (dropTarget) {
        const closestEdge = extractClosestEdge(dropTarget.data);
        closestEdgeToElement.value = closestEdge;
      }
    },
    onDrop: args => {
      const dropTarget = args.location.current.dropTargets[0];

      if (!dropTarget) {
        return;
      }

      //

      const startColumnId = args.source.data.colunaId;
      const finishColumnId = args.location.current.dropTargets[1]?.data.id;

      // se nao tiver finish column, startColumn sera a única coluna, isto é, o drag and drop ocorreu na mesma coluna.
      const startColumn = Object.values(dia.value).filter(
        coluna =>
          coluna.findIndex(horario => horario.colunaId === startColumnId) !== -1
      )[0];

      let finishColumn;

      if (startColumnId != finishColumnId) {
        finishColumn = Object.values(dia.value).filter(
          coluna =>
            coluna.findIndex(horario => horario.colunaId === finishColumnId) !==
            -1
        )[0];
      } else {
        finishColumn = startColumn;
      }

      if (!startColumn || !finishColumn) {
        console.warn('finishColumn = ' + finishColumn);
        console.warn('startColumn = ' + JSON.stringify(startColumn));
        return;
      }

      //

      // index inicial do draggable
      const startIndex = startColumn.findIndex(
        horario => horario.id === args.source.data.id
      );

      const closestEdge = extractClosestEdge(dropTarget.data);

      if (startIndex < 0 || !closestEdge) {
        console.warn('closestEdge do drop = ' + closestEdge);
        console.warn('startIndex = ' + startIndex);
        return;
      }

      const indexOfTarget = finishColumn.findIndex(
        horario => horario.id === dropTarget.data.id
      );

      if (indexOfTarget < 0) {
        console.warn('indexOfTarget = ' + indexOfTarget);
        return;
      }

      //

      if (startColumnId != finishColumnId) {
        const startKey = Object.keys(dia.value)[(startColumnId as number) - 1];
        const finishKey = Object.keys(dia.value)[
          (finishColumnId as number) - 1
        ];

        if (!startKey || !finishKey) {
          console.warn('startKey = ', startKey);
          console.warn('finishKey = ', finishKey);
          return;
        }

        args.source.data.colunaId = finishColumnId;

        dia.value[startKey]?.splice(startIndex, 1);
        dia.value[finishKey]?.splice(
          indexOfTarget,
          0,
          args.source.data as HorarioPrag
        );

        dia.value[finishKey] = reorderWithEdge({
          list: finishColumn,
          startIndex: indexOfTarget,
          indexOfTarget,
          closestEdgeOfTarget: closestEdge,
          axis: 'vertical',
        });
      } else {
        const key = Object.keys(dia.value)[(startColumnId as number) - 1];

        if (!key) {
          console.warn('key = ' + key);
          return;
        }

        dia.value[key] = reorderWithEdge({
          list: startColumn,
          startIndex,
          indexOfTarget,
          closestEdgeOfTarget: closestEdge,
          axis: 'vertical',
        });
      }

      horariosHistory.commit();
    },
  });
});

onUnmounted(() => {
  cleanup();
});

//

// por enquanto so funciona com 2 itens

const canSwap = computed(() => getHorariosAtivos().value.size >= 2);
</script>

<template>
  <!-- <span>
    <button
      class="bg-green-600 text-white p-2 rounded-sm text-center cursor-pointer mr-5"
      @click="horariosHistory.undo()"
    >
      Desfazer
    </button>

    <button
      class="bg-green-600 text-white p-2 rounded-sm text-center cursor-pointer"
      @click="horariosHistory.redo()"
    >
      Refazer
    </button>
  </span>

  <span class="flex gap-5">
    <button
      @click="swap(ref(dia), horariosHistory)"
      :disabled="!canSwap"
      class="p-2.5 border-2 border-gray-500 text-gray-500 rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <IconSwap />
    </button>

    <button
      @click="toggleShowIntervalos"
      class="flex gap-2 p-2 border-2 border-gray-500 rounded-lg cursor-pointer"
    >
      <IconEye class="w-4" />
      Intervalos
    </button>
  </span> -->

  <div class="grid grid-cols-6 grid-rows-3 gap-3 grid-flow-col">
    <template v-for="(_, key, numberIdx) in dia">
      <SectionHorarioDapeEditList
        v-if="dia[key]"
        v-model="dia[key]"
        :id="columnIds[numberIdx] as number"
        @atividade-change="horariosHistory.commit()"
      />
    </template>
  </div>

  <!-- <pre>{{ dia }}</pre> -->
</template>
