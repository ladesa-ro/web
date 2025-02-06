import { useForm } from 'vee-validate';
import * as yup from 'yup';
import type { MaybePromise } from '../../../../typings';
import type { IGenericCrudModuleTypes } from '../../../../utils';

export type ICrudFormQueryOptions<
  Typings extends IGenericCrudModuleTypes,
  FormValues extends yup.Maybe<yup.AnyObject>,
  FormOutput,
  FormSchema extends yup.ObjectSchema<FormValues, any, any, any>,
> = {
  schema: FormSchema;

  crudModule: IGenericCrudModule<Typings>;

  editId?: MaybeRef<Typings['CompleteView']['id'] | null | undefined>;
  onSubmit(values: FormOutput): MaybePromise<void>;
};

export const useCrudFormQuery = <
  Typings extends IGenericCrudModuleTypes,
  FormValues extends yup.Maybe<yup.AnyObject>,
  FormOutput,
  FormSchema extends yup.ObjectSchema<FormValues, any, any, any>,
>(
  options: ICrudFormQueryOptions<Typings, FormValues, FormOutput, FormSchema>
) => {
  const { schema, crudModule } = options;

  const editId = computed(() => unref(options.editId) ?? null);

  //

  const { useFindOneQuery } = useGenericCrudComposables(crudModule);

  const resourceGetQuery = useFindOneQuery(editId);

  //

  const form = useForm<FormValues, FormOutput>({
    validationSchema: schema as any,

    initialValues: {
      ...schema.getDefault(),
    },
  });

  watch(
    [resourceGetQuery.data],
    ([data]) => {
      if (data) {
        form.setValues(schema.cast(data) as any);
      }
    },
    { immediate: true }
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

  const formOnSubmit = handleSubmit(options.onSubmit, onError);

  //

  const suspense = async () => {
    await resourceGetQuery.suspense();
  }

  return {
    suspense,

    isBusy,
    isLoading,

    form,
    editId,

    formOnSubmit,
  };
};
