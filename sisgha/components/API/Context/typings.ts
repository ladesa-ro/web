import type {
  AuthWhoAmIResponse,
  UsuarioFindOneResultView,
} from '@ladesa-ro/api-client-fetch';
import type { UseQueryReturnType } from '@tanstack/vue-query';
import type { ResumoPerfis } from '../Perfis/ResumirPerfis';

export type DynamicWhoAmIResult<Strict extends boolean = true> =
  AuthWhoAmIResponse & {
    usuario: Strict extends true
      ? UsuarioFindOneResultView
      : UsuarioFindOneResultView | null;
  };

export type IApiContext<
  Strict extends boolean = true,
  WhoAmI extends DynamicWhoAmIResult<Strict> = DynamicWhoAmIResult<Strict>,
> = {
  //
  resumoPerfis: ComputedRef<ResumoPerfis>;
  whoAmI: ComputedRef<WhoAmI>;
  usuario: ComputedRef<WhoAmI['usuario']>;
  perfisAtivos: ComputedRef<WhoAmI['perfisAtivos']>;
  //
  whoAmIQuery: UseQueryReturnType<WhoAmI, Error>;
};
