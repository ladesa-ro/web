import type {
  AuthWhoAmIResultDto,
  UsuarioFindOneResultDto,
} from '@ladesa-ro/api-client-fetch';
import type { UseQueryReturnType } from '@tanstack/vue-query';
import type { ResumoVinculos } from '../Vinculos/ResumirVinculos';

export type DynamicWhoAmIResult<Strict extends boolean = true> =
  AuthWhoAmIResultDto & {
    usuario: Strict extends true
      ? UsuarioFindOneResultDto
      : UsuarioFindOneResultDto | null;
  };

export type IApiContext<
  Strict extends boolean = true,
  WhoAmI extends DynamicWhoAmIResult<Strict> = DynamicWhoAmIResult<Strict>,
> = {
  //
  resumoVinculos: ComputedRef<ResumoVinculos>;
  whoAmI: ComputedRef<WhoAmI>;
  usuario: ComputedRef<WhoAmI['usuario']>;
  vinculosAtivos: ComputedRef<WhoAmI['vinculosAtivos']>;
  //
  whoAmIQuery: UseQueryReturnType<WhoAmI, Error>;
};
