import type {
  Ladesa_ManagementService_Domain_Contracts_AmbienteFindOneOutput as AmbienteFindOneOutput,
  Ladesa_ManagementService_Domain_Contracts_BlocoFindOneOutput as BlocoFindOneOutput,
  Ladesa_ManagementService_Domain_Contracts_CursoFindOneOutput as CursoFindOneOutput,
  Ladesa_ManagementService_Domain_Contracts_DisciplinaFindOneOutput as DisciplinaFindOneOutput,
  Ladesa_ManagementService_Domain_Contracts_TurmaFindOneOutput as TurmaFindOneOutput,
  Ladesa_ManagementService_Domain_Contracts_UsuarioFindOneOutput as UsuarioFindOneOutput,
} from '@ladesa-ro/management-service-client';

export enum ApiImageResource {
  TURMA_COVER,
  CURSO_COVER,
  DISCIPLINA_COVER,
  AMBIENTE_COVER,
  BLOCO_COVER,
  USUARIO_PROFILE,
}

type IUseApiImageRouteFunction = {
  (
    resourceImage: ApiImageResource.TURMA_COVER,
    item: MaybeRef<TurmaFindOneOutput | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.CURSO_COVER,
    item: MaybeRef<CursoFindOneOutput | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.DISCIPLINA_COVER,
    item: MaybeRef<DisciplinaFindOneOutput | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.AMBIENTE_COVER,
    item: MaybeRef<AmbienteFindOneOutput | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.BLOCO_COVER,
    item: MaybeRef<BlocoFindOneOutput | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.USUARIO_PROFILE,
    item: MaybeRef<UsuarioFindOneOutput | null | undefined>
  ): ComputedRef<string | null>;
};

export const useApiImageRoute: IUseApiImageRouteFunction = (
  resourceImage,
  itemRef
) => {
  const apiClient = useApiClient();
  const base = apiClient.request.config.BASE;

  return computed(() => {
    const item = unref(itemRef);

    if (!item) {
      return null;
    }

    switch (resourceImage) {
      case ApiImageResource.TURMA_COVER: {
        const imagemCapa = item?.imagemCapa;

        if (imagemCapa) {
          return `${base}/turmas/${item.id}/imagem/capa?imgCapa=${imagemCapa.id}`;
        }

        return null;
      }

      case ApiImageResource.CURSO_COVER: {
        const imagemCapa = item?.imagemCapa;

        if (imagemCapa) {
          return `${base}/cursos/${item.id}/imagem/capa?imgCapa=${imagemCapa.id}`;
        }

        return null;
      }

      case ApiImageResource.DISCIPLINA_COVER: {
        const imagemCapa = item?.imagemCapa;

        if (imagemCapa) {
          return `${base}/disciplinas/${item.id}/imagem/capa?imgCapa=${imagemCapa.id}`;
        }

        return null;
      }

      case ApiImageResource.AMBIENTE_COVER: {
        const imagemCapa = item?.imagemCapa;

        if (imagemCapa) {
          return `${base}/ambientes/${item.id}/imagem/capa?imgCapa=${imagemCapa.id}`;
        }

        return null;
      }

      case ApiImageResource.BLOCO_COVER: {
        const imagemCapa = item?.imagemCapa;

        if (imagemCapa) {
          return `${base}/blocos/${item.id}/imagem/capa?imgCapa=${imagemCapa.id}`;
        }

        return null;
      }

      case ApiImageResource.USUARIO_PROFILE: {
        const imagemPerfil = (<UsuarioFindOneOutput>item)?.imagemPerfil;

        if (imagemPerfil) {
          return `${base}/usuarios/${item.id}/imagem/perfil?imgCapa=${imagemPerfil.id}`;
        }

        return null;
      }

      default: {
        return null;
      }
    }
  });
};
