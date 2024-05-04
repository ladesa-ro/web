/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmbienteFindOneResultDto } from './AmbienteFindOneResultDto';
import type { UsuarioFindOneResultDto } from './UsuarioFindOneResultDto';
export type ReservaFindOneResultDto = {
	/**
	 * ID do registro.
	 */
	id: string;
	/**
	 * Situação da reserva.
	 */
	situacao: string;
	/**
	 * Motivo da reserva.
	 */
	motivo: string | null;
	/**
	 * Definir tipo da reserva.
	 */
	tipo: string | null;
	/**
	 * Data e hora de início da reserva.
	 */
	dataInicio: string;
	/**
	 * Data e hora de término da reserva.
	 */
	dataTermino: string | null;
	/**
	 * Usuário que fez a reserva.
	 */
	usuario: UsuarioFindOneResultDto;
	/**
	 * Ambiente que foi reservado.
	 */
	ambiente: AmbienteFindOneResultDto;
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
