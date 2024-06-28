import dayjs from '~/components/Section/Horario/-Helpers/dayjs';
import type { ILesson } from '../../-Helpers/ILesson';

export function verifyClassStatusByStartAndEnd(
  start: dayjs.Dayjs,
  end: dayjs.Dayjs
) {
  const now = dayjs();
  if (now >= end) return 'completed';
  else if (now >= start && now < end) return 'active';
  return;
}

export function verifyClassStatusByLesson(lesson: ILesson) {
  const start: dayjs.Dayjs = dayjs(lesson.startsAt, 'HH:mm:ss');
  const end: dayjs.Dayjs = dayjs(lesson.endsAt, 'HH:mm:ss');

  return verifyClassStatusByStartAndEnd(start, end);
}
