import { useApiContext } from '~/composables/api-context/setup';
import type { CampusFindOneOutputDto } from '@ladesa-ro/web.api.client';

type campiPorCargo = { cargo: string; campi: CampusFindOneOutputDto[] };

const SUPERUSER_CARGOS = ['dape', 'professor'];

export const useCampusContext = () =>
  useState<string | null>('campusContext', () => null);

export const useUserCargoAndCampi = () => {
  const { resumoVinculos, usuario } = useApiContext();

  const isSuperUser = usuario.value?.isSuperUser ?? false;

  const apiCargoCampi = resumoVinculos.value.mapaCargoCampi;

  const campiPorCargo: campiPorCargo[] = [];

  if (isSuperUser) {
    // Super user: cargos fixos, campi vem da API (gerenciado pelo ChangeCampus)
    for (const cargo of SUPERUSER_CARGOS) {
      const existingCampi = apiCargoCampi[cargo] ?? [];
      campiPorCargo.push({ cargo, campi: existingCampi });
    }
  } else {
    Object.entries(apiCargoCampi).forEach(([cargoName, cargoCampi]) => {
      campiPorCargo.push({ cargo: cargoName, campi: cargoCampi });
    });
  }

  const moreThanOneCargo = isSuperUser ? true : resumoVinculos.value.cargos.length > 1;

  const campi1 = campiPorCargo[0]?.campi ?? [];
  const campi2 = campiPorCargo[1]?.campi ?? [];

  const campiIdAlreadyRead = new Set();

  const campiList = [...campi1, ...campi2].filter(campus => {
    if (campiIdAlreadyRead.has(campus.id)) return false;
    campiIdAlreadyRead.add(campus.id);
    return true;
  });

  const moreThanOneCampus = isSuperUser ? true : campiList.length > 1;

  return { campiPorCargo, moreThanOneCargo, moreThanOneCampus, campiList, isSuperUser };
};

export const useCampusContextCargos = () => {
  const { campiPorCargo, isSuperUser } = useUserCargoAndCampi();
  const campusContext = useCampusContext();

  return computed(() => {
    if (isSuperUser) return [...SUPERUSER_CARGOS];

    return campiPorCargo
      .filter(cargoCampus =>
        cargoCampus.campi.some(campus => campus.id === campusContext.value)
      )
      .map(cargoCampus => cargoCampus.cargo);
  });
};
