import { useQueryClient } from '@tanstack/vue-query';

export const createInvalidate = (queryKey: readonly string[]) => {
  const qc = useQueryClient();
  return async () => {
    await qc.invalidateQueries({ queryKey: [...queryKey] });
    await qc.refetchQueries({ queryKey: [...queryKey], type: 'active' });
  };
};
