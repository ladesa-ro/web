import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IModalidadeApiModuleTypings = {
  CompleteView: ApiClientTypings.ModalidadeFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.ModalidadeCreateInputDto;
    Result: ApiClientTypings.ModalidadeCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.ModalidadeFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.ModalidadeListOutputDto;
    Queries: ApiClientTypings.ModalidadeFindAllData;
    ResultItem: ApiClientTypings.ModalidadeListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.ModalidadeUpdateInputDto;
    Result: ApiClientTypings.ModalidadeUpdateResponse;
  };
};

export const createModalidadesCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['modalidades'],

    create(requestBody) {
      return apiClient.modalidades.modalidadeCreate({ requestBody });
    },

    list(data) {
      return apiClient.modalidades.modalidadeFindAll(data);
    },

    getOne(id) {
      return apiClient.modalidades.modalidadeFindById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.modalidades.modalidadeUpdate({
        id,
        requestBody,
      });
    },

    deleteOne(id) {
      return apiClient.modalidades.modalidadeDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<IModalidadeApiModuleTypings>;
});
