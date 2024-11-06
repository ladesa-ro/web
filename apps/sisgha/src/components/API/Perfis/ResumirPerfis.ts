import type {
  CampusFindOneResultView,
  PerfilFindOneResultView,
} from '@ladesa-ro/api-client-fetch';
import type { Dictionary } from 'lodash';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import uniq from 'lodash/uniq';

export type ResumoPerfis = {
  /**
   * ["dape", "professor"]
   */

  cargos: string[];

  /**
   * {
   *  dape: CampusFindOneResultView[],
   *  professor: CampusFindOneResultView[]
   * }
   */
  mapaCargoCampi: {
    [x: string]: CampusFindOneResultView[];
  };

  /**
   * {
   *  dape: PerfilFindOneResultView[],
   *  professor: PerfilFindOneResultView[]
   * }
   */
  mapaCargoPerfis: Dictionary<PerfilFindOneResultView[]>;
};

export const resumirPerfis = (todosOsPerfis: PerfilFindOneResultView[]) => {
  const cargos = uniq(map(todosOsPerfis, 'cargo'));

  const mapaCargoPerfis = groupBy(todosOsPerfis, (perfil) => perfil.cargo);

  const mapaCargoCampi = mapValues(mapaCargoPerfis, (perfis) =>
    map(perfis, 'campus')
  );

  return {
    cargos,
    mapaCargoCampi,
    mapaCargoPerfis,
  };
};
