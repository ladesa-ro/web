/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidInputDto } from './ObjectUuidInputDto';
export type TurmaCreateInputDto = {
	/**
	 * Período do turma.
	 */
	periodo: string;
	/**
	 * Curso que o turma pertence.
	 */
	curso: ObjectUuidInputDto;
	/**
	 * Ambiente padrão da sala de aula.
	 */
	ambientePadraoAula: ObjectUuidInputDto | null;
};
