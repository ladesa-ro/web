import type {
  CampusFindOneResultDto,
  VinculoFindOneResultDto,
} from '@ladesa-ro/api-client-fetch';
import { groupBy, map, mapValues, uniq, type Dictionary } from 'lodash';

export type ResumoVinculos = {
  /**
   * cargos: ["dape", "professor"]
   */

  cargos: string[];

  /**
   * mapaCargoVinculos: {
   *  dape: CampusFindOneResultDto[],
   *  professor: CampusFindOneResultDto[]
   * }
   */
  mapaCargoCampi: {
    [x: string]: CampusFindOneResultDto[];
  };

  /**
   * mapaCargoVinculos: {
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
