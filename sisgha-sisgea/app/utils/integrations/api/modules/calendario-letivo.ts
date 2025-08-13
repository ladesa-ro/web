import type * as ApiClientTypings from '@ladesa-ro/management-service-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type ICalendarioLetivoApiModuleTypings = {
  CompleteView: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CalendarioLetivoFindOneInput;

  Create: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CalendarioLetivoCreateInput;
    Result: ApiClientTypings.CalendarioLetivoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CalendarioLetivoFindOneOutput;
  };

  List: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CalendarioLetivoListOutput;
    Queries: ApiClientTypings.CalendarioLetivoListData;
    ResultItem: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CalendarioLetivoListOutput['data'][number];
  };

  Update: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CalendarioLetivoUpdateInput;
    Result: ApiClientTypings.CalendarioLetivoUpdateOneByIdResponse;
  };
};

export const createCalendarioLetivoCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['calendarioLetivo'],

    create(requestBody) {
      return apiClient.calendariosLetivos.calendarioLetivoCreate({ requestBody });
    },

    list(data) {
      return apiClient.calendariosLetivos.calendarioLetivoList(data);
    },

    getOne(id) {
      return apiClient.calendariosLetivos.calendarioLetivoFindOneById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.calendariosLetivos.calendarioLetivoUpdateOneById({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.calendariosLetivos.calendarioLetivoDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<ICalendarioLetivoApiModuleTypings>;
});
