import type {
  AmbienteFindOneResultView,
  BlocoFindOneResultView,
  CursoFindOneResultView,
  DisciplinaFindOneResultView,
  TurmaFindOneResultView,
  UsuarioFindOneResultView,
} from '@ladesa-ro/api-client-fetch';

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
    item: MaybeRef<TurmaFindOneResultView | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.CURSO_COVER,
    item: MaybeRef<CursoFindOneResultView | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.DISCIPLINA_COVER,
    item: MaybeRef<DisciplinaFindOneResultView | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.AMBIENTE_COVER,
    item: MaybeRef<AmbienteFindOneResultView | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.BLOCO_COVER,
    item: MaybeRef<BlocoFindOneResultView | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.USUARIO_PROFILE,
    item: MaybeRef<UsuarioFindOneResultView | null | undefined>
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
        const imagemPerfil = (<UsuarioFindOneResultView>item)?.imagemPerfil;

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
