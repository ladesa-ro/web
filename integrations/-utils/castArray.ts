export const castArray = <T extends object>(data: T | Iterable<T>) =>
  Symbol.iterator in data ? Array.from(data) : [data];
