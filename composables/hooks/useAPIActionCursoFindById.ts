import {
  APIActionCursoFindById,
  APP_QUERY_SUSPENSE_BEHAVIOUR,
  IAPIActionCursoFindByIdResult,
  useAPIActionFindById,
} from "../../infrastructure";

export const useAPIACtionCursoFindById = async (
  idCurso: MaybeRef<number>,
  suspenseBehaviour = APP_QUERY_SUSPENSE_BEHAVIOUR.SERVER_SIDE_ONLY,
) => {
  const apiActionCursoFindById =
    await useAPIActionFindById<IAPIActionCursoFindByIdResult>(
      APIActionCursoFindById,
      idCurso,
      "cursos",
      "curso::id",
      suspenseBehaviour,
    );

  return apiActionCursoFindById;
};
