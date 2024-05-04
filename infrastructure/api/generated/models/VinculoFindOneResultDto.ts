/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampusFindOneResultDto } from './CampusFindOneResultDto';
import type { UsuarioFindOneResultDto } from './UsuarioFindOneResultDto';
export type VinculoFindOneResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Cargo do vínculo.
	 */
	cargo: string;
	/**
	 * Usuário do vínculo.
	 */
	usuario: UsuarioFindOneResultDto;
	/**
	 * Campus do vínculo.
	 */
	campus: CampusFindOneResultDto;
	/**
	 * Data de criação do registro.
	 */
	dateCreated: string;
	/**
	 * Data de atualização do registro.
	 */
	dateUpdated: string;
	/**
	 * Data de remoção do registro.
	 */
	dateDeleted: string | null;
};
