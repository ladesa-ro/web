import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { type FormContext, useForm } from 'vee-validate';
import { useToast } from '../../../../../composables/useToast';
import type { ICreateOrManageConfig } from './config';

export type ICreateOrManageControl<Config extends ICreateOrManageConfig> = {
  config: Config;
  state: {
    mode: ComputedRef<'manage' | 'create'>;
    isBusy: ComputedRef<boolean>;
    isLoading: ComputedRef<boolean>;
    canSubmit: ComputedRef<boolean>;
    canDelete: ComputedRef<boolean>;
  };
  form: FormContext<any, any>;
  methods: {
    suspense: () => Promise<void>;
    onSubmit: (e?: Event) => Promise<void>;
    onDelete: () => Promise<boolean>;
    onFinish: () => Promise<void>;
  };
};

export const initCreateOrManageControl = <Config extends ICreateOrManageConfig>(
  config: Config
): ICreateOrManageControl<Config> => {
  const { showToast } = useToast();

  const mode = computed(() =>
    unref(config.state.editId) ? 'manage' : 'create'
  );

  const form = useForm({
    validationSchema: config.schema,
    initialValues: {
      ...config.schema.getDefault(),
    },
  });

  watch(
    [config.crud.get.query.data],
    ([data]) => {
      if (data) {
        form.setValues(config.schema.cast(data));
      }
    },
    { immediate: true }
  );

  const queryClient = useQueryClient();

  const invalidate = async () => {
    await queryClient.invalidateQueries({
      queryKey: [...config.crud.baseQueryKeys],
    });
  };

  const onError = (
    err: any,
    action: 'cadastro' | 'atualizacao' | 'delete' = 'cadastro'
  ) => {
    console.error(err);
    showToast(action, 'error', err?.message);
  };

  const onSubmit = async (e?: Event) => {
    await form.handleSubmit(async data => {
      const id = unref(config.state.editId);

      try {
        if (id) {
          await config.crud.update.perform(id, data);
          showToast('atualizacao', 'success');
        } else {
          await config.crud.create.perform(data);
          showToast('cadastro', 'success');
        }

        await invalidate();
        await config.methods.onFinish();
      } catch (err) {
        onError(err, id ? 'atualizacao' : 'cadastro');
      }
    })();
  };

  const deleteQuery = useMutation({
    mutationKey: [...config.crud.baseQueryKeys, '@delete'],
    mutationFn: async () => {
      const id = unref(config.state.editId);

      const checkCanDelete = async () => {
        const confirm = config.crud.delete.confirm;
        if (confirm) {
          return await confirm(id, form.values);
        } else {
          return window.confirm('Deseja realmente apagar este recurso?');
        }
      };

      if (id) {
        const canDelete = await checkCanDelete();
        if (canDelete) {
          const result = await config.crud.delete.perform(id);
          if (result) {
            await invalidate();
            showToast('delete', 'success');
            return true;
          }
        }
      }

      return false;
    },
    onError: err => onError(err, 'delete'),
  });

  const { mutateAsync: onDelete } = deleteQuery;

  const onFinish = async () => {
    await config.methods.onFinish();
  };

  const suspense = async () => {
    await config.crud.get.query.suspense();
  };

  const isLoading = computed(() => unref(config.crud.get.query.isLoading));
  const isBusy = computed(
    () =>
      unref(form.isSubmitting) ||
      unref(isLoading) ||
      unref(deleteQuery.isPending)
  );
  const canSubmit = computed(() => !unref(isBusy) && !unref(form.isValidating));

  return {
    config,
    state: {
      mode,
      isBusy,
      isLoading,
      canSubmit,
      canDelete: computed(() => unref(mode) === 'manage'),
    },
    form,
    methods: {
      suspense,
      onSubmit,
      onDelete,
      onFinish,
    },
  };
};
