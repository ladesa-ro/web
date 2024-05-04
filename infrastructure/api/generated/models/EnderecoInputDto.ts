/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectIdInputDto } from './ObjectIdInputDto';
export type EnderecoInputDto = {
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
	cidade: ObjectIdInputDto;
};
