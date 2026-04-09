import type {
  AmbienteFindOneOutputDto,
  BlocoFindOneOutputDto,
  CursoFindOneOutputDto,
  DisciplinaFindOneOutputDto,
  ModalidadeFindOneOutputDto,
  NivelFormacaoFindOneOutputDto,
  DiarioFindOneOutputDto,
  OfertaFormacaoFindOneOutputDto,
  TurmaFindOneOutputDto,
  UsuarioFindOneOutputDto,
} from '@ladesa-ro/web.api.client';

export enum ApiImageResource {
  TURMA_COVER,
  CURSO_COVER,
  DISCIPLINA_COVER,
  AMBIENTE_COVER,
  BLOCO_COVER,
  MODALIDADE_COVER,
  NIVEL_FORMACAO_COVER,
  OFERTA_FORMACAO_COVER,
  DIARIO_COVER,
  USUARIO_PROFILE,
}

type ImageResourceConfig = {
  path: string;
  prop: string;
  type: string;
};

const IMAGE_RESOURCE_CONFIG: Record<ApiImageResource, ImageResourceConfig> = {
  [ApiImageResource.TURMA_COVER]: { path: 'turmas', prop: 'imagemCapa', type: 'capa' },
  [ApiImageResource.CURSO_COVER]: { path: 'cursos', prop: 'imagemCapa', type: 'capa' },
  [ApiImageResource.DISCIPLINA_COVER]: { path: 'disciplinas', prop: 'imagemCapa', type: 'capa' },
  [ApiImageResource.AMBIENTE_COVER]: { path: 'ambientes', prop: 'imagemCapa', type: 'capa' },
  [ApiImageResource.BLOCO_COVER]: { path: 'blocos', prop: 'imagemCapa', type: 'capa' },
  [ApiImageResource.MODALIDADE_COVER]: { path: 'modalidades', prop: 'imagemCapa', type: 'capa' },
  [ApiImageResource.NIVEL_FORMACAO_COVER]: { path: 'niveis-formacoes', prop: 'imagemCapa', type: 'capa' },
  [ApiImageResource.OFERTA_FORMACAO_COVER]: { path: 'ofertas-formacoes', prop: 'imagemCapa', type: 'capa' },
  [ApiImageResource.DIARIO_COVER]: { path: 'diarios', prop: 'imagemCapa', type: 'capa' },
  [ApiImageResource.USUARIO_PROFILE]: { path: 'usuarios', prop: 'imagemPerfil', type: 'perfil' },
};

type IUseApiImageRouteFunction = {
  (
    resourceImage: ApiImageResource.TURMA_COVER,
    item: MaybeRef<TurmaFindOneOutputDto | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.CURSO_COVER,
    item: MaybeRef<CursoFindOneOutputDto | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.DISCIPLINA_COVER,
    item: MaybeRef<DisciplinaFindOneOutputDto | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.AMBIENTE_COVER,
    item: MaybeRef<AmbienteFindOneOutputDto | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.BLOCO_COVER,
    item: MaybeRef<BlocoFindOneOutputDto | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.MODALIDADE_COVER,
    item: MaybeRef<ModalidadeFindOneOutputDto | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.NIVEL_FORMACAO_COVER,
    item: MaybeRef<NivelFormacaoFindOneOutputDto | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.OFERTA_FORMACAO_COVER,
    item: MaybeRef<OfertaFormacaoFindOneOutputDto | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.DIARIO_COVER,
    item: MaybeRef<DiarioFindOneOutputDto | null | undefined>
  ): ComputedRef<string | null>;

  (
    resourceImage: ApiImageResource.USUARIO_PROFILE,
    item: MaybeRef<UsuarioFindOneOutputDto | null | undefined>
  ): ComputedRef<string | null>;
};

export const useApiImageRoute: IUseApiImageRouteFunction = (
  resourceImage,
  itemRef
) => {
  const api = useApiClient();
  const base = api.baseUrl;

  return computed(() => {
    const item = unref(itemRef);

    if (!item) {
      return null;
    }

    const config = IMAGE_RESOURCE_CONFIG[resourceImage as ApiImageResource];

    if (!config) {
      return null;
    }

    const image = (item as Record<string, any>)[config.prop];

    if (!image) {
      return null;
    }

    return `${base}/${config.path}/${item.id}/imagem/${config.type}?imgCapa=${image.id}`;
  });
};
