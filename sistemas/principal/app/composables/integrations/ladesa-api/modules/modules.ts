export const useLadesaApiCrudAmbientes = () => {
  return useLadesaApiCrudComposables(createAmbientesCrudModule);
};

export const useLadesaApiCrudBlocos = () => {
  return useLadesaApiCrudComposables(createBlocosCrudModule);
};

export const useLadesaApiCrudCampi = () => {
  return useLadesaApiCrudComposables(createCampiCrudModule);
};

export const useLadesaApiCrudCursos = () => {
  return useLadesaApiCrudComposables(createCursosCrudModule);
};

export const useLadesaApiCrudDiarios = () => {
  return useLadesaApiCrudComposables(createDiariosCrudModule);
};

export const useLadesaApiCrudDiariosProfessores = () => {
  return useLadesaApiCrudComposables(createDiariosProfessoresCrudModule);
};

export const useLadesaApiCrudDisciplinas = () => {
  return useLadesaApiCrudComposables(createDisciplinasCrudModule);
};

export const useLadesaApiCrudUsuarios = () => {
  return useLadesaApiCrudComposables(createUsuariosCrudModule);
};

export const useLadesaApiCrudTurmas = () => {
  return useLadesaApiCrudComposables(createTurmasCrudModule);
};

export const useLadesaApiCrudOfertasFormacoes = () => {
  return useLadesaApiCrudComposables(createOfertasFormacoesCrudModule);
};
