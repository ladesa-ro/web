import type { Ladesa_ManagementService_Domain_Contracts_ModalidadeFindOneOutput as ModalidadeFindOneOutput } from '@ladesa-ro/management-service-client';

// TODO: não depender dos ids
export const verificarModalidade = (
  modalidade: ModalidadeFindOneOutput | null,
  fallbackToPeriodo = false
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
      return fallbackToPeriodo ? 'periodo' : 'nao-implementado';
    }
  }
};
