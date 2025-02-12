import type { ICreateOrManageConfig } from '../Base/Control/config';
import {
  type ICreateOrManageControl,
  initCreateOrManageControl,
} from '../Base/Control/control';

const KEY = Symbol.for('CreateOrManageControlContext');

export const setupCreateOrManageControlContext = <
  Config extends ICreateOrManageConfig,
>(
  config: Config
) => {
  const form = initCreateOrManageControl<Config>(config);
  provide(KEY, form);
  return form;
};

export const useCreateOrManageControlContext = <
  Config extends ICreateOrManageConfig,
  Control extends ICreateOrManageControl<Config>,
>() => {
  const control = inject<Control>(KEY);

  if (!control) {
    throw new Error();
  }

  return control;
};
