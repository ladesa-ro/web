import type { ModalidadeFindOneResultDto } from '@ladesa-ro/api-client-fetch';

export const verificarModalidade = (
  modalidade: ModalidadeFindOneResultDto | null,
  FALLBACK_TO_PERIODO = false
): 'serie-letra' | 'periodo' | 'nao-implementado' => {
  switch (modalidade?.id) {
    case '1f08fe79-8f99-493b-ade1-fe082b4761e1':
    case 'aab71668-9dfc-46ae-8593-99dcb616a88d': {
      return 'serie-letra';
    }

    case '3ec92df1-1c11-4990-8664-f17fbbd3ca41':
    case '2fcfc6cb-8f79-44ff-9c06-96a6a955005b':
    case 'c6079567-5975-4247-b8bc-892eeeeb1451': {
      return 'periodo';
    }

    default: {
      return FALLBACK_TO_PERIODO ? 'periodo' : 'nao-implementado';
    }
  }
};
