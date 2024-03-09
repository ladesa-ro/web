import {
  APIActionModalidadeFindById,
  APP_QUERY_SUSPENSE_BEHAVIOUR,
  IAPIActionModalidadeFindByIdResult,
  useAPIActionFindById,
} from "../../infrastructure";

export const useAPIACtionModalidadeFindById = async (
  idModalidade: MaybeRef<number>,
  suspenseBehaviour = APP_QUERY_SUSPENSE_BEHAVIOUR.SERVER_SIDE_ONLY,
) => {
  const apiActionModalidadeFindById =
    await useAPIActionFindById<IAPIActionModalidadeFindByIdResult>(
      APIActionModalidadeFindById,
      idModalidade,
      "modalidades",
      "modalidade::id",
      suspenseBehaviour,
    );

  return apiActionModalidadeFindById;
};
