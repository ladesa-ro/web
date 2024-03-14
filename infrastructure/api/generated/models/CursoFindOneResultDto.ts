/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampusFindOneResultDto } from "./CampusFindOneResultDto";
import type { ModalidadeFindOneResultDto } from "./ModalidadeFindOneResultDto";
export type CursoFindOneResultDto = {
  /**
   * ID da Curso
   */
  id: string;
  /**
   * Nome do curso.
   */
  nome: string;
  /**
   * Nome abreviado do curso.
   */
  nomeAbreviado: string;
  /**
   * Campus que o curso pertence.
   */
  campus: CampusFindOneResultDto;
  /**
   * Modalidade a que o curso pertence.
   */
  modalidade: ModalidadeFindOneResultDto;
};
