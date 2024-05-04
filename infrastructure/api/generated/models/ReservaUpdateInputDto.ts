/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidInputDto } from './ObjectUuidInputDto';
export type ReservaUpdateInputDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Situação da reserva.
	 */
	situacao?: string;
	/**
	 * Motivo da reserva.
	 */
	motivo?: string | null;
	/**
	 * Definir tipo da reserva.
	 */
	tipo?: string | null;
	/**
	 * Data e hora de início da reserva.
	 */
	dataInicio?: string;
	/**
	 * Data e hora de término da reserva.
	 */
	dataTermino?: string | null;
	/**
	 * Usuário que fez a reserva.
	 */
	usuario: ObjectUuidInputDto;
	/**
	 * Ambiente que foi reservado.
	 */
	ambiente: ObjectUuidInputDto;
};
