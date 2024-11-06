const identificadorContexto = 'contexto-diarios-form-geral';

// type IContextDiariosFormGeral = ReturnType<
//   typeof createContextDiariosFormGeral
// >;

type IContextDiariosFormGeral = {
  disciplinaId: Ref<string | null>;
};

export const createContextDiariosFormGeral = (): IContextDiariosFormGeral => {
  const disciplinaId = ref<string | null>(null);

  return {
    disciplinaId,
  };
};

export const createAndProvideContextDiariosFormGeral = () => {
  const contexto = createContextDiariosFormGeral();
  provide(identificadorContexto, contexto);
  return contexto;
};

export const useContextDiariosFormGeral = () => {
  const contexto = inject<IContextDiariosFormGeral>(identificadorContexto);

  if (!contexto) {
    throw new Error(
      'Você precisa chamar o createAndProvideContextDiariosFormGeral em algum componente pai!'
    );
  }

  return contexto;
};
