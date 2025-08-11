import type {
  Ladesa_ManagementService_Domain_Contracts_CampusFindOneOutput as CampusFindOneOutput,
  Ladesa_ManagementService_Domain_Contracts_PerfilFindOneOutput as PerfilFindOneOutput,
} from '@ladesa-ro/management-service-client';
import type { Dictionary } from 'lodash';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import uniq from 'lodash/uniq';

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
    [x: string]: CampusFindOneOutput[];
  };

  /**
   * {
   *  dape: VinculoFindOneResultDto[],
   *  professor: VinculoFindOneResultDto[]
   * }
   */
  mapaCargoVinculos: Dictionary<PerfilFindOneOutput[]>;
};

export const resumirVinculos = (todosOsVinculos: PerfilFindOneOutput[]) => {
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
