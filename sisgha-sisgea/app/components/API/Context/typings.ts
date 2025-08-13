import type {
  Ladesa_ManagementService_Domain_Contracts_AuthWhoAmIOutput as AuthWhoAmIOutput,
  Ladesa_ManagementService_Domain_Contracts_UsuarioFindOneOutput as UsuarioFindOneOutput,
} from '@ladesa-ro/management-service-client';
import type { UseQueryReturnType } from '@tanstack/vue-query';
import type { ResumoVinculos } from '../Vinculos/ResumirVinculos';

export type DynamicWhoAmIResult<Strict extends boolean = true> =
  AuthWhoAmIOutput & {
    usuario: Strict extends true
      ? AuthWhoAmIOutput
      : UsuarioFindOneOutput | null;
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
