/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UsuarioFindOneResultDtoVinculoAtivoCampus } from "./UsuarioFindOneResultDtoVinculoAtivoCampus";
export type UsuarioFindOneResultDtoVinculoAtivo = {
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
  cargo: UsuarioFindOneResultDtoVinculoAtivo.cargo;
  /**
   * Campus do vínculo.
   */
  campus: UsuarioFindOneResultDtoVinculoAtivoCampus;
};
export namespace UsuarioFindOneResultDtoVinculoAtivo {
  /**
   * Cargo do vínculo.
   */
  export enum cargo {
    DAPE = "dape",
    PROFESSOR = "professor",
  }
}
