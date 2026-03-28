// # API - Calendar Types

// # COMPONENTS - Calendar Types
export type CalendarEvent = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string | null;
  locale?: string | null | undefined;
  calendar?: { id: string };
};

export type CalendarData = {
  id: string;
  name: string;
  year?: number | null;
  trainingOffer: { id: string };
  campus: { id: string };
};

export type Day = {
  date?: string;
  color?: string;
  holiday?: boolean;
  school?: boolean;
};

export type EmptyDays = {
  before: number;
  after: number;
};
