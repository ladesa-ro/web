// # API - Calendar Types

export type APIAcademicCalendar = {
  id: string;
  name: string;
  year: number;
  campus: {
    id: string;
  };
  trainingOffer: {
    id: string;
  };
};

export type APICalendarDay = {
  id: string;
  data: string;
  holiday: boolean;
  schoolday: boolean;
  academicCalendar: {
    id: string;
  };
};

export type APIStage = {
  id: string;
  number: number;
  startDate: string;
  endDate: string;
  color: string;
  academicCalendar: {
    id: string;
  };
};

export type APIEvent = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
  academicCalendar: {
    id: string;
  };
};

// # COMPONENTS - Calendar Types

export type Day = Omit<
  APICalendarDay,
  'id' | 'holiday' | 'schoolday' | 'academicCalendar' | 'data'
> & {
  number?: number;
  color?: string;
};

export type EmptyDays = {
  before: number;
  after: number;
};
