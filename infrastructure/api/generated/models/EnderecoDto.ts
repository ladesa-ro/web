/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CidadeFindOneResultDto } from './CidadeFindOneResultDto';
export type EnderecoDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * CEP do Endereço.
	 */
	cep: string;
	/**
	 * Logradouro do Endereço.
	 */
	logradouro: string;
	/**
	 * Número do Endereço.
	 */
	numero: number;
	/**
	 * Bairro do Endereço.
	 */
	bairro: string;
	/**
	 * Complemento do Endereço.
	 */
	complemento: string | null;
	/**
	 * Ponto de referência do Endereço.
	 */
	pontoReferencia: string | null;
	/**
	 * Cidade do Endereço.
	 */
	cidade: CidadeFindOneResultDto;
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
