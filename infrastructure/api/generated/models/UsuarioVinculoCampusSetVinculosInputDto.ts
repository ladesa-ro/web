/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidDto } from "./ObjectUuidDto";
export type UsuarioVinculoCampusSetVinculosInputDto = {
  /**
   * Campus do vínculo.
   */
  campus: ObjectUuidDto;
  /**
   * Usuário do vínculo.
   */
  usuario: ObjectUuidDto;
  /**
   * Cargos a serem alterados.
   */
  cargos: Array<"dape" | "professor">;
};
