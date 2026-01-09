import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type {
  Cell,
  NonEditableCell,
} from '~/composables/schedule/edit/useScheduleEditTypes';
import type {
  EditableCell,
  HorDayjs,
  ShiftName,
  WeekSchedule,
} from '~/composables/schedule/useScheduleTypes';

export const dndMonitor = (
  weekSchedule: Ref<WeekSchedule>,
  commit: () => void
) =>
  monitorForElements({
    onDrop: ({ source, location }) => {
      if (!location.current.dropTargets[0]) {
        return;
      }

      // TODO: isso aqui é gambiarra. se possível, padronizar as tipagens depois
      type CellAdaptada = (EditableCell | NonEditableCell) &
        HorDayjs & {
          cellIndex?: number;
          shiftName?: string;
          dayDate?: string;
        };

      const aulaArrastada = source.data as CellAdaptada;
      const aulaAlvo = location.current.dropTargets[0].data as CellAdaptada;

      if (aulaArrastada.id === aulaAlvo.id) {
        console.warn('aula arrastada id = aula alvo id = ', aulaAlvo.id);
        return;
      }

      const arrastadoPeriodo =
        weekSchedule.value[aulaArrastada.dayDate!]!.daySchedule[
          aulaArrastada.shiftName! as ShiftName
        ].shiftSchedule ?? [];

      const alvoPeriodo =
        weekSchedule.value[aulaAlvo.dayDate!]!.daySchedule[
          aulaAlvo.shiftName! as ShiftName
        ].shiftSchedule ?? [];

      if (arrastadoPeriodo.length === 0 || alvoPeriodo.length === 0) {
        console.warn('arrastadoPeriodo = ', arrastadoPeriodo);
        console.warn('alvoPeriodo = ', alvoPeriodo);
        return;
      }

      if (
        aulaArrastada.cellIndex === undefined ||
        aulaAlvo.cellIndex === undefined
      ) {
        console.warn('aulaArrastada.cellIndex', aulaArrastada.cellIndex);
        console.warn('aulaAlvo.cellIndex', aulaAlvo.cellIndex);
        return;
      }

      [aulaArrastada.startHour, aulaAlvo.startHour] = [
        aulaAlvo.startHour,
        aulaArrastada.startHour,
      ];
      [aulaArrastada.endHour, aulaAlvo.endHour] = [
        aulaAlvo.endHour,
        aulaArrastada.endHour,
      ];
      [aulaArrastada.date, aulaAlvo.date] = [aulaAlvo.date, aulaArrastada.date];

      arrastadoPeriodo[aulaArrastada.cellIndex!] = aulaAlvo as Cell;
      alvoPeriodo[aulaAlvo.cellIndex!] = aulaArrastada as Cell;

      commit();
    },
  });
