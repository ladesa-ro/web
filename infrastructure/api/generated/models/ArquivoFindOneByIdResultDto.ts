/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ArquivoFindOneByIdResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Nome do arquivo.
	 */
	nome: string | null;
	/**
	 * Mime-type do arquivo.
	 */
	mimeType: string | null;
	/**
	 * Tamanho do arquivo (em bytes).
	 */
	sizeBytes: number | null;
	/**
	 * Estratégia de armazenamento do arquivo.
	 */
	storageType: string | null;
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
