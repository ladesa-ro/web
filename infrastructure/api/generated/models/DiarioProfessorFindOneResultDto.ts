/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidDto } from './ObjectUuidDto';
import type { VinculoFindOneResultDto } from './VinculoFindOneResultDto';
export type DiarioProfessorFindOneResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Situação do vínculo.
	 */
	situacao: string;
	/**
	 * Diário vinculado.
	 */
	diario: ObjectUuidDto;
	/**
	 * Vínculo do usuário ao campus.
	 */
	vinculo: VinculoFindOneResultDto;
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
