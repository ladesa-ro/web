/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampusFindOneResultDto } from './CampusFindOneResultDto';
import type { ImagemFindOneResultDto } from './ImagemFindOneResultDto';
import type { ModalidadeFindOneResultDto } from './ModalidadeFindOneResultDto';
export type CursoFindOneResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Nome do curso.
	 */
	nome: string;
	/**
	 * Nome abreviado do curso.
	 */
	nomeAbreviado: string;
	/**
	 * Campus que o curso pertence.
	 */
	campus: CampusFindOneResultDto;
	/**
	 * Modalidade a que o curso pertence.
	 */
	modalidade: ModalidadeFindOneResultDto;
	/**
	 * Imagem de capa do curso.
	 */
	imagemCapa: ImagemFindOneResultDto | null;
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
