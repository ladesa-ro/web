import type {
  CampusFindOneResultDto,
  VinculoFindOneResultDto,
} from '@ladesa-ro/api-client-fetch';
import { groupBy, map, mapValues, uniq, type Dictionary } from 'lodash';

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
    [x: string]: CampusFindOneResultDto[];
  };

  /**
   * {
   *  dape: VinculoFindOneResultDto[],
   *  professor: VinculoFindOneResultDto[]
   * }
   */
  mapaCargoVinculos: Dictionary<VinculoFindOneResultDto[]>;
};

export const resumirVinculos = (todosOsVinculos: VinculoFindOneResultDto[]) => {
  const cargos = uniq(map(todosOsVinculos, 'cargo'));

  const mapaCargoVinculos = groupBy(
    todosOsVinculos,
    (vinculo) => vinculo.cargo
  );

  const mapaCargoCampi = mapValues(mapaCargoVinculos, (vinculos) =>
    map(vinculos, 'campus')
  );

  return {
    cargos,
    mapaCargoCampi,
    mapaCargoVinculos,
  };
};
