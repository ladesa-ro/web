import { useTurmaGetRetriever } from '../../../../../integrations';
import type { TurmaFormValues } from './typings';

export const useTurmaFormExistentDataRetriever = () => {
  const turmaGetRetriever = useTurmaGetRetriever();

  const formExistentDataRetrieverTurma = async (
    id: string
  ): Promise<TurmaFormValues> => {
    const turma = await turmaGetRetriever(id);

    return {
      imagem: null,
      periodo: turma.periodo,
      curso: { id: turma.curso.id ?? null },
      ambientePadraoAula: { id: turma.ambientePadraoAula?.id ?? null },
    };
  };

  return formExistentDataRetrieverTurma;
};
