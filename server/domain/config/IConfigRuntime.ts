export interface IConfigRuntime {
  getRuntimeEnv(): "production" | "development" | "test" | string;
  getRuntimeURL(): string | null;
}
