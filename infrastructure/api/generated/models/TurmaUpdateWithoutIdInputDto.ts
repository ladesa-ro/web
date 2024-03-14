/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidDto } from "./ObjectUuidDto";
export type TurmaUpdateWithoutIdInputDto = {
  /**
   * Período da turma.
   */
  periodo?: string;
  /**
   * Grupo da turma.
   */
  grupo?: string;
  /**
   * Nome da turma.
   */
  nome?: string;
  /**
   * Ambiente padrão da sala de aula.
   */
  ambientePadraoAula?: ObjectUuidDto | null;
  /**
   * Curso que a turma pertence.
   */
  curso?: ObjectUuidDto;
};
