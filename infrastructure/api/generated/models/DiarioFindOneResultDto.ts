/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmbienteFindOneResultDto } from "./AmbienteFindOneResultDto";
import type { DisciplinaFindOneResultDto } from "./DisciplinaFindOneResultDto";
import type { TurmaFindOneResultDto } from "./TurmaFindOneResultDto";
export type DiarioFindOneResultDto = {
  /**
   * ID de "diario"
   */
  id: string;
  /**
   * Situação do diário. Ativo ou inativo.
   */
  situacao: string;
  /**
   * Ano do diário.
   */
  ano: number;
  /**
   * Etapa/período do diário.
   */
  etapa: string | null;
  /**
   * Turma que o diario pertence
   */
  turma: TurmaFindOneResultDto;
  /**
   * disciplina a qual o diario pertence
   */
  disciplina: DisciplinaFindOneResultDto;
  /**
   * Ambiente Padrao do diario
   */
  ambientePadrao: AmbienteFindOneResultDto | null;
};
