import type dayjs from 'dayjs';

// Interface and types
export type EventData = {
  id: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  color: string;
  notifyStatus: boolean;
};

export type Step = EventData & {
  number: number;
};

export type Event = EventData & {
  name: string;

  startTime?: dayjs.Dayjs;
  endTime?: dayjs.Dayjs;
  locale?: string;
};

export type Day = {
  num: number;
  day: string;
  date: dayjs.Dayjs;
  color: string;
  hoverActive: boolean;
};

// Filter types
export type BetweenDates = Omit<EventData, 'id' | 'color' | 'notifyStatus'> & {
  name: string;
};

export type Calendar = {
  id: string;
  name: string;
  year: number;
  modality: string;
  course: string;
  steps: Step[];
  events: Event[];
};
