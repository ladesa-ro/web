/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidDto } from "./ObjectUuidDto";
export type ReservaInputDto = {
  /**
   * Situação da reserva.
   */
  situacao: string;
  /**
   * Motivo da reserva.
   */
  motivo: string | null;
  /**
   * Definir tipo da reserva.
   */
  tipo: string | null;
  /**
   * Data e hora de início da reserva.
   */
  dataInicio: string;
  /**
   * Data e hora de término da reserva.
   */
  dataTermino: string | null;
  /**
   * Ambiente que foi reservado.
   */
  ambiente: ObjectUuidDto;
  /**
   * Usuário que fez a reserva.
   */
  usuario: ObjectUuidDto;
};
