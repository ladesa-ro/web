import type { TurmaFormValues } from './typings';

export const useTurmaExistentFormDataRetriever = () => {
  const apiClient = useApiClient();

  const existentFormDataRetrieverTurma = async (
    id: string
  ): Promise<TurmaFormValues> => {
    const turma = await apiClient.turmas.turmaFindById({ id });

    return {
      imagem: null,
      periodo: turma.periodo,
      curso: { id: turma.curso.id ?? null },
      ambientePadraoAula: { id: turma.ambientePadraoAula?.id ?? null },
    };
  };

  return existentFormDataRetrieverTurma;
};
