// API - Calendar Types

type APIAcademicCalendar = {
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

type APICalendarDay = {
    id: string;
    data: string;
    holiday: boolean;
    schoolday: boolean;
    academicCalendar: {
        id: string;
    };
}

type APIStage = {
    id: string;
    number: number;
    startDate: string;
    endDate: string;
    color: string;
    academicCalendar: {
        id: string;
    };
}

type APIEvent = {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    color: string;
    academicCalendar: {
        id: string;
    };
}

// COMPONENTS - Calendar Types

type Day = Omit <APICalendarDay, 'id' | 'holiday' | 'schoolday' | 'academicCalendar'> & {
    number: number;
    color: string;
};

type MonthDays = {
  before: number;
  month: number;
  after: number;
}

