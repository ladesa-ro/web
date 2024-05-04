/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArquivoFindOneByIdResultDto } from './ArquivoFindOneByIdResultDto';
import type { ObjectUuidDto } from './ObjectUuidDto';
export type ImagemArquivoFindOneByIdResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Largura da imagem.
	 */
	largura: number;
	/**
	 * Altura da imagem.
	 */
	altura: number;
	/**
	 * Formato da imagem.
	 */
	formato: string;
	/**
	 * Mime Type da imagem.
	 */
	mimeType: string;
	/**
	 * Imagem.
	 */
	imagem: ObjectUuidDto;
	/**
	 * Arquivo.
	 */
	arquivo: ArquivoFindOneByIdResultDto;
	/**
	 * Data de criação do registro.
	 */
	dateCreated: string;
};
