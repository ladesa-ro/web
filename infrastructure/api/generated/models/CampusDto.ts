/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnderecoDto } from './EnderecoDto';
import type { ModalidadeDto } from './ModalidadeDto';
export type CampusDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Nome fantasia do Campus.
	 */
	nomeFantasia: string;
	/**
	 * Razão social do Campus.
	 */
	razaoSocial: string;
	/**
	 * Apelido do Campus.
	 */
	apelido: string;
	/**
	 * CNPJ do Campus.
	 */
	cnpj: string;
	/**
	 * Endereço do Campus.
	 */
	endereco: EnderecoDto;
	/**
	 * Modalidades oferecidas pelo Campus.
	 */
	modalidades: Array<ModalidadeDto>;
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
