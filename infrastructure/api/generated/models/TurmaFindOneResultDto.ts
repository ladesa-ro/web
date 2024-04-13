/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmbienteFindOneResultDto } from "./AmbienteFindOneResultDto";
import type { CursoFindOneResultDto } from "./CursoFindOneResultDto";
export type TurmaFindOneResultDto = {
  /**
   * ID de "turma"
   */
  id: string;
  /**
   * Período da turma.
   */
  periodo: string;
  /**
   * Grupo da turma.
   */
  grupo: string;
  /**
   * Nome da turma.
   */
  nome: string;
  /**
   * Ambiente padrão da sala de aula.
   */
  ambientePadraoAula: AmbienteFindOneResultDto | null;
  /**
   * Curso que a turma pertence.
   */
  curso: CursoFindOneResultDto;
};
