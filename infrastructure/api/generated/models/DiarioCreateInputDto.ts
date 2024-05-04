/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidInputDto } from './ObjectUuidInputDto';
export type DiarioCreateInputDto = {
	/**
	 * Ano do diário.
	 */
	ano: number;
	/**
	 * Etapa do diário.
	 */
	etapa: string | null;
	/**
	 * Turma vinculada ao diário.
	 */
	turma: ObjectUuidInputDto;
	/**
	 * Disciplina vinculada ao diário.
	 */
	disciplina: ObjectUuidInputDto;
	/**
	 * Ambiente padrão.
	 */
	ambientePadrao: ObjectUuidInputDto | null;
};
