import type { UseQueryReturnType } from '@tanstack/vue-query';
import type {
  AuthWhoAmIOutputDto,
  UsuarioFindOneOutputDto,
} from '~/helpers/api-client';
import type { ResumoVinculos } from './resumir-vinculos';

export type DynamicWhoAmIResult<Strict extends boolean = true> =
  AuthWhoAmIOutputDto & {
    usuario: Strict extends true
      ? AuthWhoAmIOutputDto
      : UsuarioFindOneOutputDto | null;
  };

export type IApiContext<
  Strict extends boolean = true,
  WhoAmI extends DynamicWhoAmIResult<Strict> = DynamicWhoAmIResult<Strict>,
> = {
  //
  resumoVinculos: ComputedRef<ResumoVinculos>;
  whoAmI: ComputedRef<WhoAmI>;
  usuario: ComputedRef<WhoAmI['usuario']>;
  perfisAtivos: ComputedRef<WhoAmI['perfisAtivos']>;
  //
  whoAmIQuery: UseQueryReturnType<WhoAmI, Error>;
};
