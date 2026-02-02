import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type ICalendarioLetivoApiModuleTypings = {
  CompleteView: ApiClientTypings.CalendarioLetivoFindOneInputDto;

  Create: {
    Data: ApiClientTypings.CalendarioLetivoCreateInputDto;
    Result: ApiClientTypings.CalendarioLetivoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.CalendarioLetivoFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.CalendarioLetivoListOutputDto;
    Queries: ApiClientTypings.CalendarioLetivoFindAllData;
    ResultItem: ApiClientTypings.CalendarioLetivoListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.CalendarioLetivoUpdateInputDto;
    Result: ApiClientTypings.CalendarioLetivoUpdateResponse;
  };
};

export const createCalendarioLetivoCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['calendarioLetivo'],

    create(requestBody) {
      return apiClient.calendariosLetivos.calendarioLetivoCreate({
        requestBody,
      });
    },

    list(data, contextCampiRef) {
      const contextCampi = unref(contextCampiRef);
      return apiClient.calendariosLetivos.calendarioLetivoFindAll({
        ...data,
        filterCampusId: contextCampi ? [contextCampi] : undefined,
      });
    },

    getOne(id) {
      return apiClient.calendariosLetivos.calendarioLetivoFindById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.calendariosLetivos.calendarioLetivoUpdate({
        id,
        requestBody,
      });
    },

    deleteOne(id) {
      return apiClient.calendariosLetivos.calendarioLetivoDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<ICalendarioLetivoApiModuleTypings>;
});
