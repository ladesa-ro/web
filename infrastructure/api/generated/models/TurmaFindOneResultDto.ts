/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmbienteFindOneResultDto } from './AmbienteFindOneResultDto';
import type { CursoFindOneResultDto } from './CursoFindOneResultDto';
import type { ImagemFindOneResultDto } from './ImagemFindOneResultDto';
export type TurmaFindOneResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Período do turma.
	 */
	periodo: string;
	/**
	 * Curso que o turma pertence.
	 */
	curso: CursoFindOneResultDto;
	/**
	 * Ambiente padrão da sala de aula.
	 */
	ambientePadraoAula: AmbienteFindOneResultDto | null;
	/**
	 * Imagem de capa do turma.
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
