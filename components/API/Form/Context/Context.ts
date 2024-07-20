import { useForm, type GenericObject } from 'vee-validate';
import * as yup from 'yup';
import type { MaybePromise } from '../../../../typings';

export const FORM_CONTEXT = Symbol();

export type APIFormContext = {
  editId: ComputedRef<string | null>;

  formOnSubmit: (e?: Event) => Promise<void> | undefined;
};

type FormContextProps<
  FormValues extends any,
  FormOutput extends any,
  Id = string,
> = {
  editId?: MaybeRef<Id | null | undefined>;
  onSubmit(values: FormOutput): MaybePromise<void>;
  existentDataRetriever(id: Id): MaybePromise<FormValues | FormOutput>;
};

export const createAPIFormContext = <
  FormValues extends yup.AnyObject,
  FormOutput extends GenericObject,
  Props extends FormContextProps<FormValues, FormOutput> = FormContextProps<
    FormValues,
    FormOutput
  >,
>(
  props: Props
) => {
  // TODO: retrieve default values with props.existentDataRetriever
  // TODO: receive schema and pass to form
  const form = useForm<FormValues, FormOutput>({});

  const { handleSubmit } = form;

  const formOnSubmit = handleSubmit(props.onSubmit);

  const editId = computed(() => unref(props.editId) ?? null);

  const formContext = {
    form,
    editId,
    formOnSubmit,
  };

  provide(FORM_CONTEXT, formContext);

  return formContext;
};

export const useFormContext = () => {
  const formContext = inject<APIFormContext>(FORM_CONTEXT);

  if (!formContext) {
    throw new TypeError();
  }

  return formContext;
};
