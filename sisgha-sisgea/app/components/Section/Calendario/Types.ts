// # API - Calendar Types

// # COMPONENTS - Calendar Types
export type CalendarEvent = {
  name: string;
  startDate: string;
  endDate: string;
  color: string | null;
  locale?: string;
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
