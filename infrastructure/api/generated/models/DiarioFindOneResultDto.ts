/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmbienteFindOneResultDto } from './AmbienteFindOneResultDto';
import type { DisciplinaFindOneResultDto } from './DisciplinaFindOneResultDto';
import type { ImagemFindOneResultDto } from './ImagemFindOneResultDto';
import type { TurmaFindOneResultDto } from './TurmaFindOneResultDto';
export type DiarioFindOneResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
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
	turma: TurmaFindOneResultDto;
	/**
	 * Disciplina vinculada ao diário.
	 */
	disciplina: DisciplinaFindOneResultDto;
	/**
	 * Ambiente padrão.
	 */
	ambientePadrao: AmbienteFindOneResultDto | null;
	/**
	 * Imagem de capa do diário.
	 */
	imagemCapa: ImagemFindOneResultDto | null;
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
