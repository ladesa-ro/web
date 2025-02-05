import { createUsuariosCrudModule } from '../../../../utils';

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

export const useLadesaApiCrudDisciplinas = () => {
  return useLadesaApiCrudComposables(createDisciplinasCrudModule);
};

export const useLadesaApiCrudUsuarios = () => {
  return useLadesaApiCrudComposables(createUsuariosCrudModule);
};
