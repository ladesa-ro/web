import { useNow } from '@vueuse/core';
import type { Dayjs } from 'dayjs';
import type { ILesson } from '../../../-Helpers/ILesson';

export function verifyClassStatusByStartAndEnd(
  start: MaybeRef<Dayjs>,
  end: MaybeRef<Dayjs>
) {
  const now = useNow();

  return computed(() => {
    const nowAsDate = now.value;

    const endAsDate = unref(end).toDate();
    const startAsDate = unref(start).toDate();

    if (nowAsDate >= endAsDate) {
      return 'completed';
    } else if (nowAsDate >= startAsDate && nowAsDate < endAsDate) {
      return 'active';
    }

    return null;
  });
}

export function verifyClassStatusByLesson(lesson: MaybeRef<ILesson>) {
  const dayjs = useDayJs();

  const start = computed(() => dayjs(unref(lesson).startsAt, 'HH:mm:ss'));
  const end = computed(() => dayjs(unref(lesson).endsAt, 'HH:mm:ss'));

  return verifyClassStatusByStartAndEnd(start, end);
}
