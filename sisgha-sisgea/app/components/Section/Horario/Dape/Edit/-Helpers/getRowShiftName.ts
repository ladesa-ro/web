export const getRowShiftName = (rowShift: string) => {
  switch (rowShift) {
    case 'morning':
      return 'Matutino';
    case 'afternoon':
      return 'Vespertino';
    case 'night':
      return 'Noturno';
  }
};