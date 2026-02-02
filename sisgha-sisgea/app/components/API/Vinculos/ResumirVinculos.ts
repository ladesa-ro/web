import type { Dictionary } from 'lodash';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import uniq from 'lodash/uniq';
import type {
  CampusFindOneOutputDto,
  PerfilFindOneOutputDto,
} from '~/helpers/api-client';

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
  mapaCargoVinculos: Dictionary<PerfilFindOneOutputDto[]>;
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
