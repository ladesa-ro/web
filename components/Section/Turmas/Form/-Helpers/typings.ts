export type TurmaFormValues = {
  imagem: Blob | null | undefined;

  curso: { id: string | null };
  ambientePadraoAula: { id: string | null };

  periodo: string;
};

export type TurmaFormOutput = {
  imagem: Blob | null | undefined;

  curso: { id: string };
  ambientePadraoAula: { id: string } | null;

  periodo: string;
};
