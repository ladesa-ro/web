import type { FormMode } from '~/utils/constants';
import type { FormContext as UiFormContext } from '@ladesa-ro/web.ui';

export type FormContext = UiFormContext<FormMode>;

export {
  useFieldDisabled,
  useInjectFormContext,
  useProvideFormContext,
} from '@ladesa-ro/web.ui';
