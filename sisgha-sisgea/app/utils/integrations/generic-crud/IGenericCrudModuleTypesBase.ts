import type { IApiCoreListInput } from '../api';

export type IGenericCrudModuleTypesBase = {
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

    Result: IApiCoreListOutput<any>;

    ResultItem: any;
  };

  Update: {
    Data: any;
    Result: any;
  };
};
