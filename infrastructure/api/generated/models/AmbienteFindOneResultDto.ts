/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlocoDto } from './BlocoDto';
import type { ImagemFindOneResultDto } from './ImagemFindOneResultDto';
export type AmbienteFindOneResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Nome do ambiente/sala.
	 */
	nome: string;
	/**
	 * Descrição do ambiente/sala.
	 */
	descricao: string;
	/**
	 * Código do ambiente/sala.
	 */
	codigo: string;
	/**
	 * Capacidade do ambiente/sala.
	 */
	capacidade: string | null;
	/**
	 * Tipo do ambiente/sala. Ex.: sala aula, auditório, laboratório de química.
	 */
	tipo: string | null;
	/**
	 * Bloco que o ambiente/sala pertence.
	 */
	bloco: BlocoDto;
	/**
	 * Imagem de capa do ambiente/sala.
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
