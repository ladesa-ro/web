import { groupBy, map, mapValues, uniq } from 'lodash-es';
import type {
  CampusFindOneOutputDto,
  PerfilFindOneOutputDto,
} from '@ladesa-ro/web.api.client';

export type ResumoVinculos = {
  /**
   * ["dape", "professor"]
   */

  cargos: string[];

  /**
   * {
   *  dape: CampusFindOneResultDto[],
   *  professor: CampusFindOneResultDto[]
   * }
   */
  mapaCargoCampi: {
    [x: string]: CampusFindOneOutputDto[];
  };

  /**
   * {
   *  dape: VinculoFindOneResultDto[],
   *  professor: VinculoFindOneResultDto[]
   * }
   */
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
