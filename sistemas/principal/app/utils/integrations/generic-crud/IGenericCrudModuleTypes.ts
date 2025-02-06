import type { IApiCoreListInput } from '../api';

export type IGenericCrudModuleTypes = {
  CompleteView: {
    id: any;
  };

  GetOne: {
    Result: any;
  };

  Create: {
    Data: any;
    Result: any;
  };

  List: {
    Queries: IApiCoreListInput;
    Result: any;

    ResultItem: any;
  };

  Update: {
    Data: any;
    Result: any;
  };
};
