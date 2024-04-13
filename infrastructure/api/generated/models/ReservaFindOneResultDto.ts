/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmbienteFindOneResultDto } from "./AmbienteFindOneResultDto";
import type { UsuarioFindOneResultDto } from "./UsuarioFindOneResultDto";
export type ReservaFindOneResultDto = {
  /**
   * ID de "reserva"
   */
  id: string;
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
  ambiente: AmbienteFindOneResultDto;
  /**
   * Usuário que fez a reserva.
   */
  usuario: UsuarioFindOneResultDto;
};
