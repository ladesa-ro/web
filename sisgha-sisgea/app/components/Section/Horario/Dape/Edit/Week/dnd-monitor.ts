import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { NonEditableCell } from '~/composables/schedule/edit/useScheduleEditTypes';
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
      if (!location.current.dropTargets[0]) return;

      type CellAdaptada = (EditableCell | NonEditableCell) &
        HorDayjs & {
          cellIndex?: number;
          shiftName?: string;
          dayDate?: string;
        };

      const aulaArrastada = source.data as CellAdaptada;
      const aulaAlvo = location.current.dropTargets[0].data as CellAdaptada;

      if (aulaArrastada.id === aulaAlvo.id) return;

      if (
        !aulaArrastada.dayDate ||
        !aulaAlvo.dayDate ||
        !aulaArrastada.shiftName ||
        !aulaAlvo.shiftName ||
        aulaArrastada.cellIndex === undefined ||
        aulaAlvo.cellIndex === undefined
      ) {
        return;
      }

      const scheduleCopy = JSON.parse(JSON.stringify(weekSchedule.value));

      const celulaArrastada =
        scheduleCopy[aulaArrastada.dayDate]?.daySchedule?.[
          aulaArrastada.shiftName as ShiftName
        ]?.shiftSchedule?.[aulaArrastada.cellIndex];

      const celulaAlvo =
        scheduleCopy[aulaAlvo.dayDate]?.daySchedule?.[
          aulaAlvo.shiftName as ShiftName
        ]?.shiftSchedule?.[aulaAlvo.cellIndex];

      if (!celulaArrastada || !celulaAlvo) {
        return;
      }

      const tempConteudo = { ...celulaArrastada };

      Object.keys(celulaAlvo).forEach(key => {
        if (key !== 'startHour' && key !== 'endHour' && key !== 'date') {
          celulaArrastada[key] = celulaAlvo[key];
        }
      });

      Object.keys(tempConteudo).forEach(key => {
        if (key !== 'startHour' && key !== 'endHour' && key !== 'date') {
          celulaAlvo[key] = tempConteudo[key];
        }
      });

      celulaArrastada.date = aulaArrastada.dayDate;
      celulaAlvo.date = aulaAlvo.dayDate;

      weekSchedule.value = scheduleCopy;

      commit();
    },
  });
