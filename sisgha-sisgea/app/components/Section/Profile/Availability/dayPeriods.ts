export type DayPeriod = {
  Matutino: Object[];
  Vespertino: Object[];
  Noturno: Object[];
};

const dayPeriods: DayPeriod = {
  Matutino: [
    { initialHour: '7:30', endHour: '8:20' },
    { initialHour: '8:20', endHour: '9:10' },
    { initialHour: '9:10', endHour: '10:00' },
    { initialHour: '10:20', endHour: '11:10' },
    { initialHour: '11:10', endHour: '12:00' },
  ],

  Vespertino: [
    { initialHour: '13:00', endHour: '13:50' },
    { initialHour: '13:50', endHour: '14:40' },
    { initialHour: '14:40', endHour: '15:30' },
    { initialHour: '15:30', endHour: '16:40' },
    { initialHour: '16:40', endHour: '17:30' },
  ],

  Noturno: [
    { initialHour: '19:00', endHour: '19:50' },
    { initialHour: '19:50', endHour: '20:40' },
    { initialHour: '20:40', endHour: '21:30' },
    { initialHour: '21:50', endHour: '22:40' },
    { initialHour: '22:40', endHour: '23:30' },
  ],
};

export default dayPeriods;
