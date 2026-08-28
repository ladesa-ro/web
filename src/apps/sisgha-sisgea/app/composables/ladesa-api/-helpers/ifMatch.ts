export function buildIfMatchHeaders(version: number): {
  'if-match': string;
} {
  return { 'if-match': String(version) };
}
