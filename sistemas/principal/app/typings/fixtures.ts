export type MaybePromise<T> = T | Promise<T>;

export type MaybeRefDeep<T> = MaybeRef<
  T extends Function
    ? T
    : T extends object
      ? {
          [Property in keyof T]: MaybeRefDeep<T[Property]>;
        }
      : T
>;
