/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImagemFindOneResultDto } from './ImagemFindOneResultDto';
import type { ObjectUuidDto } from './ObjectUuidDto';
export type UsuarioFindOneResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Nome do usuário.
	 */
	nome: string;
	/**
	 * Matrícula Siape do usuário.
	 */
	matriculaSiape: string;
	/**
	 * E-mail do usuário.
	 */
	email: string;
	/**
	 * Imagem de capa do usuário.
	 */
	imagemCapa: ImagemFindOneResultDto | null;
	/**
	 * Imagem de perfil do usuário.
	 */
	imagemPerfil: ImagemFindOneResultDto | null;
	/**
	 * Vínculos ativos do usuário.
	 */
	vinculosAtivos: Array<ObjectUuidDto>;
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
