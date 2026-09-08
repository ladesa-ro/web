import { groupBy, map, mapValues, uniq } from 'lodash-es';
import type {
  CampusFindOneOutputDto,
  PerfilFindOneOutputDto,
} from '@ladesa-ro/web.api.client';

export type ResumoVinculos = {
  cargos: string[];

  mapaCargoCampi: {
    [x: string]: CampusFindOneOutputDto[];
  };

  mapaCargoVinculos: { [key: string]: PerfilFindOneOutputDto[] };
};

export const resumirVinculos = (todosOsVinculos: PerfilFindOneOutputDto[]) => {
  const cargos = uniq(map(todosOsVinculos, 'cargo'));

  const mapaCargoVinculos = groupBy(todosOsVinculos, vinculo => vinculo.cargo);

  const mapaCargoCampi = mapValues(mapaCargoVinculos, vinculos =>
    map(vinculos, 'campus')
  );

  return {
    cargos,
    mapaCargoCampi,
    mapaCargoVinculos,
  };
};
