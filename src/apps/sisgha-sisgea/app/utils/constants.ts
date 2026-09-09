export enum AuthStatus {
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export const AUTH_STATE_KEY = 'auth:data' as const;
export const AUTH_STATUS_KEY = 'auth:status' as const;
export const AUTH_LAST_REFRESHED_KEY = 'auth:lastRefreshedAt' as const;

export enum LayoutName {
  EMPTY = 'empty',
  DEFAULT = 'default',
  SISGHA_DAPE = 'sisgha-dape',
  SISGHA_PROFESSOR = 'sisgha-professor',
  SISGHA_ALUNO = 'sisgha-aluno',
  SISGHA_CONSULTA = 'sisgha-consulta',
  SISGEA = 'sisgea',
}

export enum FormMode {
  CREATE = 'create',
  MANAGE = 'manage',
}

export const CAMPUS_CONTEXT_KEY = 'campusContext' as const;
export const VUE_QUERY_STATE_KEY = 'vue-query' as const;

export const QUERY_CACHE_STORAGE_KEY = 'LADESA_WEB_QUERY_CACHE' as const;

export const AUTH_REFRESH_INTERVAL_MS = 15_000 as const;

export const Cargo = {
  DAPE: 'dape',
  PROFESSOR: 'professor',
  ALUNO: 'aluno',
} as const;

export type CargoType = (typeof Cargo)[keyof typeof Cargo];

export const CargoLabels: Record<CargoType, string> = {
  [Cargo.DAPE]: 'DAPE',
  [Cargo.PROFESSOR]: 'Professor',
  [Cargo.ALUNO]: 'Aluno',
};

export const CargoOptions = Object.values(Cargo).map(value => ({
  value,
  label: CargoLabels[value],
}));
