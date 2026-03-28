import type {
  CampusFindOneOutputDto,
  PerfilFindOneOutputDto,
} from '@ladesa-ro/web.api.client';

export type ResumoVinculos = {
  cargos: string[];

  mapaCargoCampi: {
    [x: string]: CampusFindOneOutputDto[];
  };

  mapaCargoVinculos: {
    [x: string]: PerfilFindOneOutputDto[];
  };
};

export const resumirVinculos = (
  todosOsVinculos: PerfilFindOneOutputDto[]
): ResumoVinculos => {
  const mapaCargoVinculos: Record<string, PerfilFindOneOutputDto[]> =
    todosOsVinculos.reduce(
      (acc, vinculo) => {
        const cargo = vinculo.cargo;

        if (!acc[cargo]) {
          acc[cargo] = [];
        }

        acc[cargo].push(vinculo);

        return acc;
      },
      {} as Record<string, PerfilFindOneOutputDto[]>
    );

  const cargos = Array.from(new Set(todosOsVinculos.map(v => v.cargo)));

  const mapaCargoCampi: Record<string, CampusFindOneOutputDto[]> =
    Object.fromEntries(
      Object.entries(mapaCargoVinculos).map(([cargo, vinculos]) => [
        cargo,
        vinculos.map(v => v.campus),
      ])
    );

  return {
    cargos,
    mapaCargoCampi,
    mapaCargoVinculos,
  };
};
