import type { UseQueryReturnType } from '@tanstack/vue-query';
import type { FormContext } from 'vee-validate';
import { useForm } from 'vee-validate';
import type { InferType, ObjectSchema } from 'yup';
import { FormMode } from '~/utils/constants';

// ============================================================
// Interfaces
// ============================================================

export interface IEntityFormOptions<TSchema extends ObjectSchema<any>> {
  schema: TSchema;
  editId: MaybeRef<string | null>;
  getQuery: UseQueryReturnType<any, any>;

  create: (data: InferType<TSchema>) => Promise<any>;
  update: (id: string, data: InferType<TSchema>) => Promise<any>;
  remove?: (id: string) => Promise<any>;
  invalidate: () => Promise<void>;

  confirmDelete?: () => Promise<boolean>;
  onFinish: () => void;
}

export interface IEntityFormReturn<TSchema extends ObjectSchema<any>> {
  form: FormContext<InferType<TSchema>, InferType<TSchema>>;
  mode: ComputedRef<FormMode>;
  isLoading: Ref<boolean>;
  isBusy: ComputedRef<boolean>;
  onSubmit: (e?: Event) => Promise<void>;
  onDelete: () => Promise<void>;
}

// ============================================================
// Composable
// ============================================================

export const useEntityForm = <TSchema extends ObjectSchema<any>>(
  options: IEntityFormOptions<TSchema>,
): IEntityFormReturn<TSchema> => {
  const { showToast } = useToast();

  const mode = computed(() =>
    unref(options.editId) ? FormMode.MANAGE : FormMode.CREATE,
  );

  const form = useForm({
    validationSchema: options.schema,
    initialValues: options.schema.getDefault(),
  });

  watch(
    () => options.getQuery.data.value,
    data => {
      if (data) {
        form.setValues(
          options.schema.cast(data, { stripUnknown: true, assert: false }),
        );
      }
    },
    { immediate: true },
  );

  const isLoading = options.getQuery.isLoading;

  const isBusy = computed(
    () => form.isSubmitting.value || isLoading.value,
  );

  const onSubmit = async (e?: Event) => {
    await form.handleSubmit(async data => {
      const id = unref(options.editId);

      try {
        if (id) {
          await options.update(id, data);
          showToast('atualizacao', 'success');
        } else {
          await options.create(data);
          showToast('cadastro', 'success');
        }

        await options.invalidate();
        options.onFinish();
      } catch (err) {
        console.error(err);
        showToast(id ? 'atualizacao' : 'cadastro', 'error');
      }
    })();
  };

  const onDelete = async () => {
    const id = unref(options.editId);
    if (!id || !options.remove) return;

    if (options.confirmDelete) {
      const confirmed = await options.confirmDelete();
      if (!confirmed) return;
    }

    try {
      await options.remove(id);
      showToast('delete', 'success');
      await options.invalidate();
      options.onFinish();
    } catch (err) {
      console.error(err);
      showToast('delete', 'error');
    }
  };

  return { form, mode, isLoading, isBusy, onSubmit, onDelete };
};
