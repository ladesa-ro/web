/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidDto } from "./ObjectUuidDto";
export type CursoUpdateWithoutIdInputDto = {
  /**
   * Nome do curso.
   */
  nome?: string;
  /**
   * Nome abreviado do curso.
   */
  nomeAbreviado?: string;
  /**
   * Campus que o curso pertence.
   */
  campus?: ObjectUuidDto;
  /**
   * Modalidade a que o curso pertence.
   */
  modalidade?: ObjectUuidDto;
};
