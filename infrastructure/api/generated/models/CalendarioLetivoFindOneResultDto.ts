/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampusFindOneResultDto } from './CampusFindOneResultDto';
import type { ModalidadeFindOneResultDto } from './ModalidadeFindOneResultDto';
export type CalendarioLetivoFindOneResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Nome do calendário letivo.
	 */
	nome: string;
	/**
	 * Ano do calendário letivo.
	 */
	ano: string;
	/**
	 * Campus que o calendário pertence.
	 */
	campus: CampusFindOneResultDto;
	/**
	 * Modalidade a que o calendário pertence.
	 */
	modalidade: ModalidadeFindOneResultDto;
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
