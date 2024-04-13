/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidDto } from "./ObjectUuidDto";
export type DiarioInputDto = {
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
  turma: ObjectUuidDto;
  /**
   * disciplina a qual o diario pertence
   */
  disciplina: ObjectUuidDto;
  /**
   * Ambiente Padrao do diario
   */
  ambientePadrao: ObjectUuidDto | null;
};
