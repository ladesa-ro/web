import { HeadTitleContext } from "./HeadTitleContext";

export const buildHeadTitle = (
  title: string,
  context: HeadTitleContext | null = null,
): string => {
  switch (context) {
    default:
    case null: {
      return `${title} | SISGHA`;
    }

    case HeadTitleContext.DASHBOARD: {
      return `${title} | ${buildHeadTitle("Painel")}`;
    }
  }
};
