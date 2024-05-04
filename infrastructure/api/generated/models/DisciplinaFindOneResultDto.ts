/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImagemFindOneResultDto } from './ImagemFindOneResultDto';
export type DisciplinaFindOneResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Nome da disciplina.
	 */
	nome: string;
	/**
	 * Nome abreviado da disciplina.
	 */
	nomeAbreviado: string;
	/**
	 * Carga horária da disciplina.
	 */
	cargaHoraria: number;
	/**
	 * Imagem de capa da disciplina.
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
