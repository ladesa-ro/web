/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnderecoInputDto } from './EnderecoInputDto';
import type { ModalidadeInputDto } from './ModalidadeInputDto';
export type CampusUpdateInputDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Nome fantasia do Campus.
	 */
	nomeFantasia?: string;
	/**
	 * Razão social do Campus.
	 */
	razaoSocial?: string;
	/**
	 * Apelido do Campus.
	 */
	apelido?: string;
	/**
	 * CNPJ do Campus.
	 */
	cnpj?: string;
	/**
	 * Endereço do Campus.
	 */
	endereco: EnderecoInputDto;
	/**
	 * Modalidades oferecidas pelo Campus.
	 */
	modalidades?: Array<ModalidadeInputDto>;
};
