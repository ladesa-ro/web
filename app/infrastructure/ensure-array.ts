export const ensureArray = <T>(raw: MaybeArray<T>): T[] =>
  Array.isArray(raw) ? raw : [raw];

export type MaybeArray<T> = T | T[];
