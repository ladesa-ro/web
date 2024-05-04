/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidInputDto } from './ObjectUuidInputDto';
export type CursoCreateInputDto = {
	/**
	 * Nome do curso.
	 */
	nome: string;
	/**
	 * Nome abreviado do curso.
	 */
	nomeAbreviado: string;
	/**
	 * Campus que o curso pertence.
	 */
	campus: ObjectUuidInputDto;
	/**
	 * Modalidade a que o curso pertence.
	 */
	modalidade: ObjectUuidInputDto;
};
