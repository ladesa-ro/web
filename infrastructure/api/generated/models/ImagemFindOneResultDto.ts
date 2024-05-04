/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImagemArquivoFindOneByIdResultDto } from './ImagemArquivoFindOneByIdResultDto';
export type ImagemFindOneResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Imagem-arquivo.
	 */
	imagemArquivo: Array<ImagemArquivoFindOneByIdResultDto>;
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
