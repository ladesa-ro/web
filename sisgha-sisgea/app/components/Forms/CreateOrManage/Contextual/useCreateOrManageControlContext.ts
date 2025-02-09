import {
  initCreateOrManageControl,
  type ICreateOrManageConfig,
  type ICreateOrManageControl,
} from '../Base/Control/useCreateOrManageControl';

const KEY = Symbol.for('CreateOrManageControlContext');

export const setupCreateOrManageControlContext = <
  Config extends ICreateOrManageConfig,
>(
  config: Config
) => {
  const form = initCreateOrManageControl(config);
  provide(KEY, form);
  return form;
};

export const useCreateOrManageControlContext = <
  Config extends ICreateOrManageConfig,
  Context extends ICreateOrManageControl<Config>,
>() => {
  const createOrManageContext = inject<Context>(KEY);

  if (!createOrManageContext) {
    throw new Error();
  }

  return createOrManageContext;
};
