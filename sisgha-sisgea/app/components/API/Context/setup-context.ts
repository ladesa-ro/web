import { useQuery } from '@tanstack/vue-query';
import { resumirVinculos } from '../Vinculos/ResumirVinculos';
import type { IApiContext } from './typings';

const ApiContextKey = Symbol();

export const createApiContext = (shouldProvide = true) => {
  const apiClient = useApiClient();

  const { data, status, lastRefreshedAt } = useAuthState();

  const whoAmIQueryKey = computed(() => [
    'usuarios',
    'who-am-i',
    data.value?.accessTokenExpires,
    unref(status),
    unref(lastRefreshedAt),
  ]);

  const whoAmIQuery = useQuery({
    queryKey: whoAmIQueryKey,

    queryFn: async () => {
      return apiClient.autenticacao.authWhoAmI();
    },

    enabled: computed(() => status.value !== 'loading'),
  });

  const whoAmI = computed(() => whoAmIQuery.data.value ?? null);

  const usuario = computed(() => whoAmI.value?.usuario ?? null);
  const perfisAtivos = computed(() => whoAmI.value?.perfisAtivos ?? []);

  const resumoVinculos = computed(() => {
    const todosOsVinculos = perfisAtivos.value;
    return resumirVinculos(todosOsVinculos);
  });

  const suspense = async () => {
    await whoAmIQuery.suspense().catch(() => {});
  };

  const apiContext = {
    //
    whoAmI,
    usuario,
    perfisAtivos,
    resumoVinculos,
    //
    whoAmIQuery,
    //
    suspense,
    //
  };

  if (shouldProvide) {
    provide(ApiContextKey, apiContext);
  }

  return apiContext;
};

/**
 * esse useAPIContext é o cara que pode ser chamado em qualquer componente para saber as informações do usuãrio logado eu vou usar pela primeira vez no appbar
 * @param _strict
 * @returns
 */

export const useApiContext = <
  Strict extends boolean = true,
  ApiContext extends IApiContext<Strict> = IApiContext<Strict>,
>() => {
  const apiContext = inject<ApiContext>(ApiContextKey);

  if (!apiContext) {
    throw new Error(`${useApiContext.name}: setup not created`);
  }

  return apiContext;
};
