const HOURS_AND_MINUTES_LENGTH = 5;

export function ensureSeconds(time: string): string {
  return time.length === HOURS_AND_MINUTES_LENGTH ? `${time}:00` : time;
}

export function stripSeconds(time: string): string {
  return time.slice(0, HOURS_AND_MINUTES_LENGTH);
}
