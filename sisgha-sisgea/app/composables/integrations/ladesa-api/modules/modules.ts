const c = useLadesaApiCrudComposables;

export const useLadesaApiCrudAmbientes = () => {
  return c<IAmbientesApiModuleTypings, IAmbientesApiModule>(
    createAmbientesCrudModule
  );
};

export const useLadesaApiCrudBlocos = () => {
  return c<IBlocosApiModuleTypings, IBlocosApiModule>(createBlocosCrudModule);
};

export const useLadesaApiCrudCampi = () => {
  return c(createCampiCrudModule);
};

export const useLadesaApiCrudCursos = () => {
  return c(createCursosCrudModule);
};

export const useLadesaApiCrudDiarios = () => {
  return c(createDiariosCrudModule);
};

export const useLadesaApiCrudDiariosProfessores = () => {
  return c(createDiariosProfessoresCrudModule);
};

export const useLadesaApiCrudDisciplinas = () => {
  return c(createDisciplinasCrudModule);
};

export const useLadesaApiCrudUsuarios = () => {
  return c(createUsuariosCrudModule);
};

export const useLadesaApiCrudTurmas = () => {
  return c<ITurmaApiModuleTypings, ITurmaApiModule>(createTurmasCrudModule);
};

export const useLadesaApiCrudOfertasFormacoes = () => {
  return c(createOfertasFormacoesCrudModule);
};
