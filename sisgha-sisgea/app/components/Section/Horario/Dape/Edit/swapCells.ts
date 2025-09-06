import type { UseRefHistoryReturn } from '@vueuse/core';
import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';
import { useSelectedCells } from '~/composables/schedule/edit/useSelectedScheduleCells';
import type { Aula, DiaEditavelEmTurnos, HorDayjs, Vago, WeekdayMeta } from '~/composables/schedule/useScheduleTypes';

export const swapCells = (
  weekSchedule: Ref<Map<WeekdayMeta, DiaEditavelEmTurnos>>,
  scheduleHistory: UseRefHistoryReturn<Map<WeekdayMeta, DiaEditavelEmTurnos>, Map<WeekdayMeta, DiaEditavelEmTurnos>>
) => {
  const ativosIndex: number[] = [];
  const colunas: Cell[][] = [];
  const metas: WeekdayMeta[] = [];
  const dias: DiaEditavelEmTurnos[] = [];
  const turnoKeys: string[] = [];

  const ativos = useSelectedCells({ action: 'getAll' });

  if (!ativos || !ativos.value || ativos.value.size < 2) return;

  ativos.value.forEach(horarioAtivoId => {
    let found = false;

    for (const [meta, dia] of weekSchedule.value.entries()) {
      const diaKeys = Object.keys(dia);
      for (const key of diaKeys) {
        const coluna = (dia as any)[key] as Cell[] | undefined;
        if (!Array.isArray(coluna)) continue;

        const findActiveIndex = coluna.findIndex((horario, horIdx) => {
          if (!horario) return false;
          return horario.id === horarioAtivoId;
        });

        if (findActiveIndex !== -1) {
          metas.push(meta);
          dias.push(dia);
          turnoKeys.push(key);
          colunas.push(coluna);
          ativosIndex.push(findActiveIndex);
          found = true;
          break;
        }
      }
      if (found) break;
    }
  });

  // precisa ter duas células encontradas
  if (
    ativosIndex[0] !== undefined &&
    ativosIndex[1] !== undefined &&
    colunas[0] &&
    colunas[1]
  ) {
    const first = colunas[0][ativosIndex[0]];
    const second = colunas[1][ativosIndex[1]];

    if (first && second) {
      // se são de turnos diferentes, troca seus turnoId
      if (turnoKeys[0] !== turnoKeys[1]) {
        [first.turnoId, second.turnoId] = [second.turnoId, first.turnoId];
      }

      // faz o swap nas arrays
      [colunas[0][ativosIndex[0]], colunas[1][ativosIndex[1]]] = [
        second,
        first,
      ];

      for (let i = 0; i < 2; i++) {
        const meta = metas[i];
        const originalDia = dias[i];
        const key = turnoKeys[i];
        const updatedColumn = colunas[i]!.filter(cell => 'diaSemana' in cell) as ((Aula | Vago) & HorDayjs)[];

        const newDia = { ...(originalDia as Record<string, any>) };
        if (key !== undefined) {
          (newDia as any)[key] = updatedColumn;
        }

        if (meta !== undefined) {
          weekSchedule.value.set(meta, newDia as DiaEditavelEmTurnos);
        }
      }

      scheduleHistory.commit();
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
