// ============================================================
// Auth
// ============================================================

export enum AuthStatus {
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export const AUTH_STATE_KEY = 'auth:data' as const;
export const AUTH_STATUS_KEY = 'auth:status' as const;
export const AUTH_LAST_REFRESHED_KEY = 'auth:lastRefreshedAt' as const;

// ============================================================
// Layouts
// ============================================================

export enum LayoutName {
  EMPTY = 'empty',
  DEFAULT = 'default',
  SISGHA_DAPE = 'sisgha-dape',
  SISGHA_PROFESSOR = 'sisgha-professor',
  SISGHA_CONSULTA = 'sisgha-consulta',
  SISGEA = 'sisgea',
}

// ============================================================
// Form Mode
// ============================================================

export enum FormMode {
  CREATE = 'create',
  MANAGE = 'manage',
}

// ============================================================
// Shared State Keys (useState)
// ============================================================

export const CAMPUS_CONTEXT_KEY = 'campusContext' as const;
export const VUE_QUERY_STATE_KEY = 'vue-query' as const;

// ============================================================
// Query Cache Key
// ============================================================

export const QUERY_CACHE_STORAGE_KEY = 'LADESA_WEB_QUERY_CACHE' as const;

// ============================================================
// API Image Resources
// ============================================================

export enum ApiImageResource {
  TURMA_COVER = 'TURMA_COVER',
  CURSO_COVER = 'CURSO_COVER',
  DISCIPLINA_COVER = 'DISCIPLINA_COVER',
  AMBIENTE_COVER = 'AMBIENTE_COVER',
  BLOCO_COVER = 'BLOCO_COVER',
  MODALIDADE_COVER = 'MODALIDADE_COVER',
  NIVEL_FORMACAO_COVER = 'NIVEL_FORMACAO_COVER',
  USUARIO_PROFILE = 'USUARIO_PROFILE',
}

// ============================================================
// Auth Refresh
// ============================================================

export const AUTH_REFRESH_INTERVAL_MS = 15_000 as const;

// ============================================================
// Cargos
// ============================================================

export enum Cargo {
  DAPE = 'dape',
  PROFESSOR = 'professor',
}
