/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampusFindOneResultDto } from "./CampusFindOneResultDto";
import type { UsuarioFindOneResultDto } from "./UsuarioFindOneResultDto";
export type UsuarioVinculoCampusDto = {
  /**
   * ID do vínculo.
   */
  id: string;
  /**
   * Situação do vínculo.
   */
  ativo: boolean;
  /**
   * Cargo do vínculo.
   */
  cargo: UsuarioVinculoCampusDto.cargo;
  /**
   * Campus do vínculo.
   */
  campus: CampusFindOneResultDto;
  /**
   * Usuário do vínculo.
   */
  usuario: UsuarioFindOneResultDto;
};
export namespace UsuarioVinculoCampusDto {
  /**
   * Cargo do vínculo.
   */
  export enum cargo {
    DAPE = "dape",
    PROFESSOR = "professor",
  }
}
