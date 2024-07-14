import type {
  CursoFindOneResultDto,
  DisciplinaFindOneResultDto,
  TurmaFindOneResultDto,
} from '@ladesa-ro/api-client-fetch';

export enum UseApiResourceImageResource {
  TURMA_COVER,
  CURSO_COVER,
  DISCIPLINA_COVER,
}

type IUseApiImageRoute = {
  (
    resourceImage: UseApiResourceImageResource.TURMA_COVER,
    item: MaybeRef<TurmaFindOneResultDto | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: UseApiResourceImageResource.CURSO_COVER,
    item: MaybeRef<CursoFindOneResultDto | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: UseApiResourceImageResource.DISCIPLINA_COVER,
    item: MaybeRef<DisciplinaFindOneResultDto | null | undefined>
  ): ComputedRef<string | null>;
};

export const useApiImageRoute: IUseApiImageRoute = (resourceImage, itemRef) => {
  const apiClient = useApiClient();
  const base = apiClient.request.config.BASE;

  const item = unref(itemRef);

  return computed(() => {
    switch (resourceImage) {
      case UseApiResourceImageResource.TURMA_COVER: {
        const item = unref(itemRef);

        const imagemCapa = item?.imagemCapa;

        if (imagemCapa) {
          return `${base}/turmas/${item.id}/imagem/capa?imgCapa=${imagemCapa.id}`;
        }

        return null;
      }

      case UseApiResourceImageResource.CURSO_COVER: {
        const item = unref(itemRef);

        const imagemCapa = item?.imagemCapa;

        if (imagemCapa) {
          return `${base}/cursos/${item.id}/imagem/capa?imgCapa=${imagemCapa.id}`;
        }

        return null;
      }

      case UseApiResourceImageResource.DISCIPLINA_COVER: {
        const item = unref(itemRef);

        const imagemCapa = item?.imagemCapa;

        if (imagemCapa) {
          return `${base}/disciplinas/${item.id}/imagem/capa?imgCapa=${imagemCapa.id}`;
        }

        return null;
      }

      default: {
        return null;
      }
    }
  });
};
