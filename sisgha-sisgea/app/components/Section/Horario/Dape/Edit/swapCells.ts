import type { UseRefHistoryReturn } from '@vueuse/core';
import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';
import { useSelectedCells } from '~/composables/schedule/edit/useSelectedScheduleCells';
import type { DiaEditavelEmTurnos } from '~/composables/schedule/useScheduleTypes';

export const swapCells = (
  dia: Ref<DiaEditavelEmTurnos>,
  horariosHistory: UseRefHistoryReturn<DiaEditavelEmTurnos, DiaEditavelEmTurnos>
) => {
  const ativosIndex: number[] = [];
  const colunasIdx: number[] = [];
  const colunas: Cell[][] = [];

  //

  const ativos = useSelectedCells({ action: 'getAll' });

  if (!ativos || !ativos.value || ativos.value.size < 2) {
    return;
  }

  ativos.value.forEach(horarioAtivoId => {
    let ativoIndex;

    const coluna = Object.values(dia.value).find(coluna => {
      const findActiveIndex = coluna.findIndex((horario, horIdx) => {
        if (horario.id === horarioAtivoId) {
          colunasIdx.push(Number(horario.turnoId ?? '0') - 1);
          ativoIndex = horIdx;
          return true;
        }
      });

      if (findActiveIndex !== -1) {
        return true;
      }
    });
    if (coluna && ativoIndex !== undefined) {
      ativosIndex.push(ativoIndex);
      colunas.push(coluna);
    }
  });

  if (
    ativosIndex[0] !== undefined &&
    ativosIndex[1] !== undefined &&
    colunas[0] &&
    colunas[1]
  ) {
    const first = colunas[0][ativosIndex[0]];
    const second = colunas[1][ativosIndex[1]];

    if (first && second) {
      if (colunasIdx[0] !== colunasIdx[1]) {
        [first.turnoId, second.turnoId] = [second.turnoId, first.turnoId];
      }

      [colunas[0][ativosIndex[0]], colunas[1][ativosIndex[1]]] = [
        second,
        first,
      ];

      const diaKeys = Object.keys(dia.value);

      diaKeys.forEach((key, index) => {
        if (index === colunasIdx[0]) {
          // Ensure all items have 'diaSemana' before assignment
          dia.value[key] = colunas[0]!.filter(
            cell => 'diaSemana' in cell
          ) as (typeof dia.value)[typeof key];
        }
        if (index === colunasIdx[1] && colunasIdx[0] !== colunasIdx[1]) {
          dia.value[key] = colunas[1]!.filter(
            cell => 'diaSemana' in cell
          ) as (typeof dia.value)[typeof key];
        }
      });

      horariosHistory.commit();
      useSelectedCells({ action: 'removeAll' });
    } else {
      console.warn('first = ', first);
      console.warn('second = ', second);
      return;
    }
  }
};

export const canSwap = computed(
  () => useSelectedCells({ action: 'getAll' })!.value.size === 2
);
