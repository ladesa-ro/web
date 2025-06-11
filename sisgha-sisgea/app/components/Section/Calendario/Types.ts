type MonthDays = {
  before: number;
  month: number;
  after: number;
}

// API - Calendar Types

type AcademicCalendar = {
    id: string;
    name: string;
    year: number;
    campus: {
        id: string;
    };
    trainingOffer: {
        id: string;
    };
}

type CalendarDay = {
    id: string;
    data: string;
    holiday: boolean;
    schoolday: boolean;
    academicCalendar: {
        id: string;
    };
}

type Stages = {
    id: string;
    number: number;
    startDate: string;
    endDate: string;
    color: string;
    academicCalendar: {
        id: string;
    };
}

type Events = {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    color: string;
    academicCalendar: {
        id: string;
    };
}