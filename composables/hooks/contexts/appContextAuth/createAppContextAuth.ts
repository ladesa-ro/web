import { GetAuthedUsuarioQuery } from "#gql";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { callWithNuxt } from "nuxt/app";
import { ACCESS_TOKEN_EXPIRATION_TRIM } from "~/infrastructure";
import {
  APIActionGetAuthedUsuario,
  APIActionUsuarioCheckAuthorization,
  APIActionUsuarioCheckCargo,
  APP_QUERY_SUSPENSE_BEHAVIOUR,
  IAPIActionUsuarioCheckAuthorizationDto,
  IAPIActionUsuarioCheckCargoDto,
  handleQuerySuspenseBehaviour,
} from "../../../../infrastructure";
import { IAppContextAPI } from "../appContextAPI/createAppContextAPI";

type IAppAuthContextGetAuthedUsuarioQueryUsuario =
  GetAuthedUsuarioQuery["usuario"];

type IAppAuthContextGetUsuarioResult<Strict extends boolean> =
  Strict extends true
    ? IAppAuthContextGetAuthedUsuarioQueryUsuario
    : IAppAuthContextGetAuthedUsuarioQueryUsuario | null;

export type IAppContextAuth = Awaited<ReturnType<typeof createAppContextAuth>>;

export const createAppContextAuth = async (
  appContextAPI: IAppContextAPI = useAppContextAPI(),
  suspenseBehaviour = APP_QUERY_SUSPENSE_BEHAVIOUR.ALWAYS,
) => {
  const app = useNuxtApp();
  const route = useRoute();

  const { data } = useAuthState();
  const { getSession } = useAuth();

  const timestamp = useTimestamp({ offset: 0 });

  const accessTokenExpires = computed(
    () => data.value?.accessTokenExpires ?? null,
  );

  const isTokenNearToExpire = computed(() => {
    const msNow = timestamp.value;
    const msExpires = accessTokenExpires.value;

    if (msExpires) {
      if (msExpires - msNow < ACCESS_TOKEN_EXPIRATION_TRIM) {
        return true;
      }
    }

    return false;
  });

  const mutationTokenRefresh = useMutation({
    mutationFn: async () => {
      console.debug("[debug] refreshing access token");
      await getSession();
    },
    retry: true,
    retryDelay: 1000,
  });

  const handleExpiredToken = async () => {
    if (mutationTokenRefresh.isIdle) {
      mutationTokenRefresh.mutate();
    }
  };

  const handleIsTokenNearToExpireState = async () => {
    if (isTokenNearToExpire.value) {
      console.debug("[debug] access token is near to expire");
      await handleExpiredToken();
    }
  };

  watch(
    [isTokenNearToExpire],
    () => {
      handleIsTokenNearToExpireState();
    },
    {
      immediate: true,
    },
  );

  const authState = useAuthState();

  const usuarioQuery = useQuery(
    ["usuario::authed"],
    async () => {
      const authStateStatus = authState.status.value;

      if (authStateStatus === "authenticated") {
        return appContextAPI.invoke(APIActionGetAuthedUsuario, null);
      }

      return null;
    },
    {
      keepPreviousData: true,
    },
  );

  await handleQuerySuspenseBehaviour(suspenseBehaviour, usuarioQuery);

  const keyUserId = computed(() => authState.data.value?.user?.id ?? null);
  const keyAccessToken = computed(
    () => authState.data.value?.accessToken ?? null,
  );

  watch(
    [
      //
      authState.status,
      keyUserId,
      keyAccessToken,
    ],
    () => {
      usuarioQuery.refetch();
    },
  );

  const hasAuthError = computed(() => {
    if (authState.data.value?.error || usuarioQuery.error.value) {
      return true;
    }

    return false;
  });

  watch([hasAuthError], ([hasAuthError]) => {
    if (hasAuthError) {
      callWithNuxt(app, () => navigateTo(route.fullPath, { external: true }));
    }
  });

  const isBusy = computed(
    () => usuarioQuery.isLoading.value || authState.loading.value,
  );

  const usuario = computed(() => usuarioQuery.data.value ?? null);

  const usuarioIdRef = computed(() => {
    const usuario_value = unref(usuario);
    return usuario_value?.id ?? null;
  });

  const hasUsuario = computed(() => usuarioIdRef.value !== null);

  const waitForIdleState = () =>
    new Promise<void>((resolve) => {
      const handleTick = () => {
        if (!isBusy.value) {
          resolve();
          unwatch();
        }
      };

      const unwatch = watch([isBusy], handleTick, { immediate: false });

      handleTick();
    });

  const getUsuario = <
    Strict extends boolean,
    Usuario extends IAppAuthContextGetUsuarioResult<Strict>,
  >(
    strict: Strict,
  ) => {
    const usuario_value: unknown = unref(usuario);
    return <Usuario>usuario_value;
  };

  const getUsuarioRef = <
    Strict extends boolean,
    Usuario extends IAppAuthContextGetUsuarioResult<Strict>,
  >(
    strict: Strict,
  ) => {
    const usuario_ref = <ComputedRef<Usuario>>usuario;
    return usuario_ref;
  };

  const waitForUsuario = () =>
    new Promise<IAppAuthContextGetAuthedUsuarioQueryUsuario>(
      async (resolve) => {
        const handleTick = () => {
          const is_busy_value = unref(isBusy);
          const usuario_value = unref(usuario);

          if (!is_busy_value && usuario_value !== null) {
            resolve(usuario_value);
            unwatch();
          }
        };

        const unwatch = watch([isBusy, usuario], handleTick, {
          immediate: false,
        });

        handleTick();
      },
    );

  const useCheckCargo = async (
    cargoSlug: MaybeRef<string>,
    suspenseBehaviour = APP_QUERY_SUSPENSE_BEHAVIOUR.ALWAYS,
  ) => {
    const dtoRef = computed(
      (): IAPIActionUsuarioCheckCargoDto => ({
        usuarioId: unref(usuario)?.id ?? -1,
        cargoSlug: unref(cargoSlug),
      }),
    );

    const query = useQuery(
      [
        //
        "usuario_cargo::check",
        computed(
          () => `usuario_cargo::check::dto::${JSON.stringify(unref(dtoRef))}`,
        ),
      ],
      async () => {
        const usuario = await waitForUsuario();

        return appContextAPI.invoke(APIActionUsuarioCheckCargo, {
          usuarioId: usuario.id,
          cargoSlug: unref(cargoSlug),
        });
      },
      {
        keepPreviousData: true,
      },
    );

    await handleQuerySuspenseBehaviour(suspenseBehaviour, query);

    const result = computed(() => query.data?.value);
    const isLoading = computed(() => query.isLoading?.value);

    return {
      result,
      //
      query,
      //
      isLoading,
    };
  };

  const checkCargo = async (cargoSlug: string) => {
    const { query } = await useCheckCargo(cargoSlug);
    const querySuspended = await query.suspense();

    const { data = null, error } = querySuspended;

    if (data === null || error) {
      throw error ?? new Error("Can not check cargo");
    }

    return data;
  };

  const useCheckAuthorization = async (
    partialDtoRef: MaybeRef<
      Omit<IAPIActionUsuarioCheckAuthorizationDto, "usuarioId">
    >,
    suspenseBehaviour = APP_QUERY_SUSPENSE_BEHAVIOUR.ALWAYS,
  ) => {
    const appContextAPI = useAppContextAPI();

    const dtoRef = computed(
      (): IAPIActionUsuarioCheckAuthorizationDto => ({
        usuarioId: unref(usuario)?.id ?? -1,
        ...unref(partialDtoRef),
      }),
    );

    const query = useQuery(
      [
        // ...
        "usuarios",
        "usuario::authorization::check",
        computed(() => `usuario::by-id::${unref(dtoRef).usuarioId}`),
        computed(
          () =>
            `usuario::authorization::check::dto::${JSON.stringify(unref(dtoRef))}`,
        ),
      ],
      async () => {
        const usuario = await waitForUsuario();

        const dto: IAPIActionUsuarioCheckAuthorizationDto = {
          usuarioId: usuario.id,
          ...unref(partialDtoRef),
        };

        return appContextAPI.invoke(APIActionUsuarioCheckAuthorization, dto);
      },
      {
        keepPreviousData: true,
      },
    );

    await handleQuerySuspenseBehaviour(suspenseBehaviour, query);

    const isLoading = computed(() => query.isLoading?.value);

    const can = computed(() => query.data?.value ?? null);

    return {
      can,
      //
      query,
      //
      isLoading,
    };
  };

  const checkAuthorization = async (
    partialDtoRef: MaybeRef<
      Omit<IAPIActionUsuarioCheckAuthorizationDto, "usuarioId">
    >,
  ) => {
    const { query } = await useCheckAuthorization(partialDtoRef);

    const querySuspended = await query.suspense();

    const { data, error } = querySuspended;

    const can = data ?? null;

    if (can === null || error) {
      throw error ?? new Error("Can not check authorization");
    }

    return can;
  };

  return {
    //

    isBusy,
    hasUsuario,

    //

    useCheckAuthorization,
    checkAuthorization,

    useCheckCargo,
    checkCargo,

    //

    usuario,
    usuarioIdRef,
    usuarioQuery,

    //

    getUsuario,
    getUsuarioRef,

    //

    waitForUsuario,
    waitForIdleState,
  };
};
