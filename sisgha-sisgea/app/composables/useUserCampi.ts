import type { Ladesa_ManagementService_Domain_Contracts_CampusFindOneOutput as Campus } from '@ladesa-ro/management-service-client';
import { useApiContext } from '~/components/API/Context/setup-context';

type campiPorCargo = { cargo: string; campi: Campus[] };

export const useCampusContext = () =>
  useState<string | null>('campusContext', () => null);

export const useUserCargoAndCampi = () => {
  const {
    resumoVinculos,
    resumoVinculos: {
      value: { mapaCargoCampi: apiCargoCampi },
    },
  } = useApiContext();

  const campiPorCargo: campiPorCargo[] = [];

  Object.entries(apiCargoCampi).forEach(([cargoName, cargoCampi]) => {
    campiPorCargo.push({
      cargo: cargoName,
      campi: cargoCampi,
    });
  });

  //

  const moreThanOneCargo = resumoVinculos.value.cargos.length > 1;

  let moreThanOneCampus = false;

  const campi1 = campiPorCargo[0]?.campi ?? [];
  const campi2 = campiPorCargo[1]?.campi ?? [];

  //

  const campiIdAlreadyRead = new Set();

  const campiList = [...campi1, ...campi2].filter(campus => {
    if (campiIdAlreadyRead.has(campus.id)) {
      return false;
    }
    campiIdAlreadyRead.add(campus.id);
    return true;
  });

  //

  if (
    ((campi1.length > 1 || campi2.length > 1) &&
      campi1.length !== 0 &&
      campi2.length !== 0) ||
    campiList.length > 1
  ) {
    moreThanOneCampus = true;
  }

  return { campiPorCargo, moreThanOneCargo, moreThanOneCampus, campiList };
};

export const useCampusContextCargos = () => {
  const { campiPorCargo } = useUserCargoAndCampi();
  const campusContext = useCampusContext();

  return computed(() =>
    campiPorCargo
      .filter(cargoCampus =>
        cargoCampus.campi.some(campus => campus.id === campusContext.value)
      )
      .map(cargoCampus => cargoCampus.cargo)
  );
};
