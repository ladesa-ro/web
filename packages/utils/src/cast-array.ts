export type MaybeArray<T> = T | T[] | Iterable<T>;

export const castArray = <T>(data: MaybeArray<T>) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (typeof data === 'object' && data && Symbol.iterator in data) {
    return Array.from(data);
  }

  return [data];
};
