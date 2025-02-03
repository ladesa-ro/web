import { useForm, type GenericObject } from 'vee-validate';
import type * as yup from 'yup';
import type { MaybePromise } from '../../../../typings';
import { useApiBaseResourceGet } from '../../../../utils/integrations';

export const API_FORM_CONTEXT = Symbol();

export type APIFormContext = {
  editId: ComputedRef<string | null>;
  formOnSubmit: (e?: Event) => Promise<void> | undefined;

  isBusy: globalThis.ComputedRef<boolean>;
  isLoading: globalThis.ComputedRef<boolean>;
};

export type APIFormContextProps<
  FormValues extends yup.Maybe<yup.AnyObject>,
  FormOutput,
  FormSchema extends yup.ObjectSchema<FormValues, any, any, any>,
  Id = string,
> = {
  baseQueryKey: MaybeRef<any>[] | MaybeRef<any>;

  schema: FormSchema;

  editId?: MaybeRef<Id | null | undefined>;
  onSubmit(values: FormOutput): MaybePromise<void>;

  formExistentDataRetriever(id: Id): MaybePromise<FormValues>;
};

export const createAPIFormContext = <
  FormValues extends yup.AnyObject,
  FormOutput extends GenericObject,
  FormSchema extends yup.ObjectSchema<FormValues, any, any, any>,
  //
  Id = string,
  Props extends APIFormContextProps<
    FormValues,
    FormOutput,
    FormSchema,
    Id
  > = APIFormContextProps<FormValues, FormOutput, FormSchema, Id>,
>(
  props: Props
) => {
  //

  const { schema } = props;
  const editId = computed(() => unref(props.editId) ?? null);

  //

  const resourceGetQuery = useApiBaseResourceGet<Id, FormValues>({
    id: editId,

    baseQueryKey: props.baseQueryKey,
    apiResourceGetRetriever: props.formExistentDataRetriever,

    itemQueryKeyResolver: (id) => [JSON.stringify(id), 'form-data'],
  });

  //

  const form = useForm<FormValues, FormOutput>({
    validationSchema: schema as any,
    initialValues: {
      ...schema.getDefault(),
    },
  });

  watch(
    [resourceGetQuery.response],
    ([response]) => {
      if (response) {
        form.setValues(schema.cast(response) as any);
      }
    },
    {
      immediate: true,
    }
  );

  //

  const isLoading = computed(() => unref(resourceGetQuery.isLoading));

  const isBusy = computed(() => {
    return unref(form.isSubmitting);
  });

  //

  const onError = (...args: any[]) => {
    if (import.meta.env.DEV) {
      console.error(...args);
    }
  };

  const { handleSubmit } = form;

  const formOnSubmit = handleSubmit(props.onSubmit, onError);

  //

  const apiFormContext = {
    isBusy,
    isLoading,

    form,
    editId,
    formOnSubmit,
  };

  //

  provide(API_FORM_CONTEXT, apiFormContext);

  //

  return apiFormContext;
};

export const useAPIFormContext = () => {
  const apiFormContext = inject<APIFormContext>(API_FORM_CONTEXT);

  if (!apiFormContext) {
    throw new TypeError();
  }

  return apiFormContext;
};
