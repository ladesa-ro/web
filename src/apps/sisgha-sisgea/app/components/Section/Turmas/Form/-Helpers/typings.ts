export type TurmaFormValues = {
  imagem: Blob | null | undefined;

  curso: { id: string | null };
  ambientePadraoAula: { id: string | null };

  periodo: string;

  numeroEstimadoAlunos: number | null;
};

export type TurmaFormOutput = {
  imagem: Blob | null | undefined;

  curso: { id: string };
  ambientePadraoAula: { id: string } | null;

  periodo: string;

  numeroEstimadoAlunos: number | null;

  _?: any;
};
