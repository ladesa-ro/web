import type { UseQueryReturnType } from '@tanstack/vue-query';
import { type MaybePromise } from 'vee-validate';
import type { InferType, ObjectSchema } from 'yup';

export type ICreateOrManageConfig<
  Id = any,
  //
  FormSchema extends ObjectSchema<any, any, any, any> = ObjectSchema<
    any,
    any,
    any,
    any
  >,
  //
  FormOutput extends InferType<FormSchema> = InferType<FormSchema>,
> = {
  schema: FormSchema;

  state: {
    editId: MaybeRef<Id | null>;
  };

  methods: {
    onFinish: () => MaybePromise<void>;
  };

  crud: {
    baseQueryKeys: MaybeRef<string>[];

    get: {
      query: UseQueryReturnType<FormOutput | null, any>;
    };

    create: {
      perform: (formData: FormOutput) => Promise<true>;
    };

    update: {
      perform: (id: Id, formData: FormOutput) => Promise<any>;
    };

    delete: {
      perform: (id: Id) => Promise<true>;
      confirm?: (id: Id, formData: FormOutput) => Promise<boolean>;
    };
  };
};
