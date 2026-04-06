import { autenticacaoWhoAmI } from '@ladesa-ro/web.api.client';
import { useQuery } from '@tanstack/vue-query';
import { QuerySuspenseBehaviourMode, suspendQuery } from '~/utils/suspend-query';
import { resumirVinculos } from './resumir-vinculos';
import type { IApiContext } from './types';

const ApiContextKey = Symbol();

export const createApiContext = (shouldProvide = true) => {
  const api = useApiClient();

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
      return api.call(autenticacaoWhoAmI);
    },

    enabled: computed(() => status.value !== 'loading'),
  });

  useQuerySuspend(whoAmIQuery);

  const whoAmI = computed(() => whoAmIQuery.data.value ?? null);

  const usuario = computed(() => whoAmI.value?.usuario ?? null);
  const perfisAtivos = computed(() => whoAmI.value?.perfisAtivos ?? []);

  const resumoVinculos = computed(() => {
    const todosOsVinculos = perfisAtivos.value;
    return resumirVinculos(todosOsVinculos);
  });

  const suspense = async () => {
    await suspendQuery(whoAmIQuery, { mode: QuerySuspenseBehaviourMode.WAIT_UNTIL_FINISH });
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
