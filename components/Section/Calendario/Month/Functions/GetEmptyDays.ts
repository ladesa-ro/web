// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Dayjs config
dayjs.locale('pt-br');

// Functions
export async function getEmptyDays(
  year: number,
  month: number,
  daysInMonth: number,
  getDays: string
): Promise<number> {
  try {
    // Calc empty days
    const beforeDays = dayjs(`${year!}-${month + 1}-01`).day();
    const afterDays = 7 * 6 - (beforeDays + daysInMonth!);

    // Return before days
    if (getDays! === 'before') return beforeDays;
    // Return after days
    else if (getDays! === 'after') return afterDays;
    // Return any days
    else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}
