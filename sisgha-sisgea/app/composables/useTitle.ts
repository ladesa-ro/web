import type { MaybeArray } from 'vee-validate';
import { HeadTitleContext } from '~/utils/head-title-context';
import { castArray } from '../utils';

// this composable defines the tab name. for example: "Painel - SISGHA" or "Perfil - SISGHA"

const SEPARATOR = ' — ';

export const buildTitle = (
  title: MaybeArray<string | null>,
  context: HeadTitleContext | null = null
): string => {
  const elements: string[] = [];

  for (const item of castArray(title).flat(4)) {
    if (item) {
      elements.push(item);
    }
  }

  switch (context) {
    case HeadTitleContext.DASHBOARD: {
      elements.push('Painel');
      break;
    }

    default: {
      break;
    }
  }

  elements.push('SISGHA');

  return elements.filter(Boolean).join(SEPARATOR);
};

export const useTitle = (
  context: HeadTitleContext | null = null,
  title: string | null = null
) => {
  const builtTitle = buildTitle(title, context);

  useHead({ title: builtTitle });
};
