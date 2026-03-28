import { useQueryClient } from '@tanstack/vue-query';

export const createInvalidate = (queryKey: readonly string[]) => {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: [...queryKey] });
};
