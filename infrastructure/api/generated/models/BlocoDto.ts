/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmbienteDto } from './AmbienteDto';
import type { CampusDto } from './CampusDto';
import type { ImagemFindOneResultDto } from './ImagemFindOneResultDto';
export type BlocoDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Nome do Bloco.
	 */
	nome: string;
	/**
	 * Código do Bloco.
	 */
	codigo: string;
	/**
	 * Campus do Bloco.
	 */
	campus: CampusDto;
	/**
	 * Imagem do Bloco.
	 */
	imagemCapa: ImagemFindOneResultDto | null;
	/**
	 * Ambientes do Bloco.
	 */
	ambientes: Array<AmbienteDto>;
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
