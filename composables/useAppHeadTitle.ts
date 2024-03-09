import type { HeadTitleContext } from "~/infrastructure/HeadTitleContext";
import { buildHeadTitle } from "~/infrastructure/buildHeadTitle";

export const useAppHeadTitle = (
  title: string,
  context: HeadTitleContext | null = null,
) => {
  const builtTitle = buildHeadTitle(title, context);

  useHead({
    title: builtTitle,
  });
};
