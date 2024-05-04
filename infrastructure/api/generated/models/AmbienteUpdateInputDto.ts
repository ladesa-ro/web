/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidInputDto } from './ObjectUuidInputDto';
export type AmbienteUpdateInputDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Nome do ambiente/sala.
	 */
	nome?: string;
	/**
	 * Descrição do ambiente/sala.
	 */
	descricao?: string;
	/**
	 * Código do ambiente/sala.
	 */
	codigo?: string;
	/**
	 * Capacidade do ambiente/sala.
	 */
	capacidade?: string | null;
	/**
	 * Tipo do ambiente/sala. Ex.: sala aula, auditório, laboratório de química.
	 */
	tipo?: string | null;
	/**
	 * Bloco que o ambiente/sala pertence.
	 */
	bloco: ObjectUuidInputDto;
};
