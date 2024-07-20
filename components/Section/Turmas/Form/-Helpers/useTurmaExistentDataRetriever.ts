import type { TurmaFormValues } from './typings';

export const useTurmaExistentDataRetriever = () => {
  const apiClient = useApiClient();

  const existentDataRetrieverTurma = async (
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

  return existentDataRetrieverTurma;
};
