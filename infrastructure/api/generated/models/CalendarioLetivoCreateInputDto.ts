/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidInputDto } from './ObjectUuidInputDto';
export type CalendarioLetivoCreateInputDto = {
	/**
	 * Nome do calendário letivo.
	 */
	nome: string;
	/**
	 * Ano do calendário letivo.
	 */
	nomeAbreviado: string;
	/**
	 * Campus que o calendário pertence.
	 */
	campus: ObjectUuidInputDto;
	/**
	 * Modalidade a que o calendário pertence.
	 */
	modalidade: ObjectUuidInputDto;
};
