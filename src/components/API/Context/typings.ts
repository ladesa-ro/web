import type {
  AuthWhoAmIResponse,
  UsuarioFindOneResultView,
} from '@ladesa-ro/api-client-fetch';
import type { UseQueryReturnType } from '@tanstack/vue-query';
import type { ResumoVinculos } from '../Vinculos/ResumirVinculos';

export type DynamicWhoAmIResult<Strict extends boolean = true> =
AuthWhoAmIResponse & {
    usuario: Strict extends true
      ? AuthWhoAmIResponse
      : UsuarioFindOneResultView | null;
  };

export type IApiContext<
  Strict extends boolean = true,
  WhoAmI extends DynamicWhoAmIResult<Strict> = DynamicWhoAmIResult<Strict>,
> = {
  //
  resumoVinculos: ComputedRef<ResumoVinculos>;
  whoAmI: ComputedRef<WhoAmI>;
  usuario: ComputedRef<WhoAmI['usuario']>;
  vinculosAtivos: ComputedRef<WhoAmI['perfisAtivos']>;
  //
  whoAmIQuery: UseQueryReturnType<WhoAmI, Error>;
};
