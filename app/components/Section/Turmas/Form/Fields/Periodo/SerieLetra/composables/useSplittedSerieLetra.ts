export const splitPeriodo = (periodo: string) => {
  const [serie, letra] = periodo.split(' ');

  return {
    serie,
    letra,
  };
};

export const joinPeriodo = (serie: string, letra: string) => {
  return `${serie.replace(/ /g, '')} ${letra.replace(/ /g, '')}`;
};

const getModifiedSplitted = (
  currentPeriodo: string,
  newSerie: string | null,
  newLetra: string | null
) => {
  const currentSplitted = splitPeriodo(currentPeriodo);

  return {
    serie: newSerie !== null ? newSerie : currentSplitted.serie,
    letra: newLetra !== null ? newLetra : currentSplitted.letra,
  };
};

const getModifiedCombined = (
  currentPeriodo: string,
  newSerie: string | null,
  newLetra: string | null
) => {
  const { serie, letra } = getModifiedSplitted(
    currentPeriodo,
    newSerie,
    newLetra
  );

  return joinPeriodo(serie, letra);
};

export const useSplittedSerieLetra = (periodo: Ref<string>) => {
  const splittedSerieLetra = computed(() => splitPeriodo(periodo.value));

  const modify = (serie: string | null, letra: string | null) => {
    periodo.value = getModifiedCombined(unref(periodo), serie, letra);
  };

  const modifySerie = (serie: string) => {
    return modify(serie, null);
  };

  const modifyLetra = (letra: string) => {
    return modify(null, letra);
  };

  const serie = computed({
    get: () => {
      return unref(splittedSerieLetra).serie;
    },

    set: (value) => {
      modifySerie(value);
    },
  });

  const letra = computed({
    get: () => {
      return unref(splittedSerieLetra).letra;
    },
    set: (value) => {
      modifyLetra(value);
    },
  });

  return {
    serie,
    letra,
    modify,
    modifyLetra,
    modifySerie,
    splittedSerieLetra,
  };
};
