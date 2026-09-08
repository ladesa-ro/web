export type GroupedReason = {
  motivo: string;
  dias: string[];
  horariosPorDia: Record<string, string[]>;
};
