import type { UseQueryReturnType } from '@tanstack/vue-query';
import { useForm, type FormContext, type MaybePromise } from 'vee-validate';
import type { AnyObject, InferType, Maybe, ObjectSchema } from 'yup';

export type ICreateOrManageConfig<
  Id = any,
  FormState extends Maybe<AnyObject> = Maybe<AnyObject>,
  FormSchema extends ObjectSchema<FormState, any, any, any> = ObjectSchema<
    FormState,
    any,
    any,
    any
  >,
  FormOutput extends InferType<FormSchema> = InferType<FormSchema>,
> = {
  baseQueryKeys: MaybeRef<string>[];

  editId: MaybeRef<Id | null>;

  schema: FormSchema;

  onFinish: () => MaybePromise<void>;

  get: {
    query: UseQueryReturnType<FormState, unknown>;
  };

  delete: {
    perform: (id: Id) => Promise<true>;
    confirm?: (id: Id, formData: FormOutput) => Promise<boolean>;
  };

  create: {
    perform: (formData: FormOutput) => Promise<true>;
  };

  update: {
    perform: (id: Id, formData: FormOutput) => Promise<true>;
  };
};

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
    onSubmit: (e?: Event) => Promise<Promise<true>>;
    onDelete: () => Promise<boolean>;

    onFinish: () => Promise<void>;
  };
};

export const initCreateOrManageControl = <Config extends ICreateOrManageConfig>(
  config: Config
) => {
  const mode = computed(() => (unref(config.editId) ? 'manage' : 'create'));

  const form = useForm({
    validationSchema: config.schema,

    initialValues: {
      ...config.schema.getDefault(),
    },
  });

  watch(
    [config.get.query.data],
    ([data]) => {
      if (data) {
        form.setValues(config.schema.cast(data));
      }
    },
    {
      immediate: true,
    }
  );

  //

  const onError = (...args: any[]) => {
    if (import.meta.env.DEV) {
      console.error(...args);
    }
  };

  const onSubmit = form.handleSubmit((data) => {
    const id = unref(config.editId);

    if (id) {
      return config.update.perform(id, data);
    } else {
      return config.create.perform(data);
    }
  }, onError);

  const onDelete = async () => {
    const id = unref(config.editId);

    if (id) {
      // TODO: ensureCanDelete
      return config.delete.perform(id);
    }

    return false;
  };

  const onFinish = async () => {
    await config.onFinish();
  };

  //

  const suspense = async () => {
    await config.get.query.suspense();
  };

  //

  const isLoading = computed(() => unref(config.get.query.isLoading));
  const isBusy = computed(() => unref(form.isSubmitting) || unref(isLoading));

  const canSubmit = computed(() => !unref(isBusy) && !unref(form.isValidating));

  //

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
