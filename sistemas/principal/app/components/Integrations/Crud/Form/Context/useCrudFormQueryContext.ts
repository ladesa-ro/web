import { type ICrudFormQueryContext, CRUD_FORM_QUERY_CONTEXT } from './Typings';

export const useCrudFormQueryContext = () => {
  const crudFormQueryContext = inject<ICrudFormQueryContext>(
    CRUD_FORM_QUERY_CONTEXT
  );

  if (!crudFormQueryContext) {
    throw new TypeError();
  }

  return crudFormQueryContext;
};
