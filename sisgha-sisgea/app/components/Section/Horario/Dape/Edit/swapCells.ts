import type { Ref } from 'vue';
import type { WeekScheduleEditable } from '~/composables/schedule/edit/useScheduleEditTypes';
import { useSelectedCells } from '~/composables/schedule/edit/useSelectedScheduleCells';
import type {
  Aula,
  HorDayjs,
  Vago,
  WeekEditableScheduleHistory,
  WeekScheduleHistory,
} from '~/composables/schedule/useScheduleTypes';

export const swapCells = (
  weekSchedule: Ref<WeekScheduleEditable>,
  scheduleHistory: WeekEditableScheduleHistory
) => {
  const activeCells = useSelectedCells({
    action: 'getAll',
    get: 'cells',
  });

  const activeArr = [...activeCells.value];
  if (activeArr.length !== 2) {
    console.warn(
      'Para o swap, são necessárias exatamente 2 células selecionadas.'
    );
    return;
  }

  // Garante uma ordem consistente para os turnos
  const SHIFT_ORDER: (keyof WeekScheduleEditable[number]['schedule'])[] = [
    'manha',
    'tarde',
    'noite',
  ];

  // Localiza a posição exata (dia, turno, índice) de cada célula selecionada
  const findCellLocation = (cellId: string) => {
    for (const day of weekSchedule.value) {
      for (const shiftName of SHIFT_ORDER) {
        const shift = day.schedule[shiftName] ?? [];
        const cellIndex = shift.findIndex(c => c.id === cellId);
        if (cellIndex !== -1) {
          return {
            dayObj: day,
            shiftName,
            cellIndex,
            cell: shift[cellIndex] as (Aula | Vago) & HorDayjs,
          };
        }
      }
    }
    return null;
  };

  const locA = findCellLocation(activeArr[0]!.id);
  const locB = findCellLocation(activeArr[1]!.id);

  if (!locA || !locB) {
    console.warn('locA = ', locA);
    console.warn('locB = ', locB);
    return;
  }

  if (locA.dayObj.data.data === locB.dayObj.data.data) {
    const newSchedule = { ...locA.dayObj.schedule };
    const shiftA = [...(newSchedule[locA.shiftName] || [])];

    const shiftB =
      locA.shiftName === locB.shiftName
        ? shiftA
        : [...(newSchedule[locB.shiftName] || [])];

    [shiftA[locA.cellIndex], shiftB[locB.cellIndex]] = [locB.cell, locA.cell];

    // cell infos update
    [shiftA[locA.cellIndex]!.turnoId, shiftB[locB.cellIndex]!.turnoId] = [
      locA.cell.turnoId,
      locB.cell.turnoId,
    ];

    newSchedule[locA.shiftName] = shiftA;
    newSchedule[locB.shiftName] = shiftB;

    locA.dayObj.schedule = newSchedule;
  } 
  //
  else {
    const newShiftA = [...locA.dayObj.schedule[locA.shiftName]!];
    const newShiftB = [...locB.dayObj.schedule[locB.shiftName]!];

    // swap
    [newShiftA[locA.cellIndex], newShiftB[locB.cellIndex]] = [
      locB.cell,
      locA.cell,
    ];

    // cell infos update
    [newShiftA[locA.cellIndex]!.turnoId, newShiftB[locB.cellIndex]!.turnoId] = [
      locA.cell.turnoId,
      locB.cell.turnoId,
    ];

    [
      newShiftA[locA.cellIndex]!.diaSemana,
      newShiftB[locB.cellIndex]!.diaSemana,
    ] = [locA.cell.diaSemana, locB.cell.diaSemana];

    locA.dayObj.schedule = {
      ...locA.dayObj.schedule,
      [locA.shiftName]: newShiftA,
    };

    locB.dayObj.schedule = {
      ...locB.dayObj.schedule,
      [locB.shiftName]: newShiftB,
    };
  }

  scheduleHistory.commit();
  useSelectedCells({ action: 'removeAll' });
};

export const canSwap = computed(
  () => useSelectedCells({ action: 'getAll', get: 'ids' })!.value.size === 2
);
