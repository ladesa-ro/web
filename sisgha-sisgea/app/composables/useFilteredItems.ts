import type { ParsedItem } from './useOptionItems';

export const useFilterText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const filterItemsBySearch = (
  items: ParsedItem[],
  searchBarValue: string
) => {
  const filteredItems = items.filter(item =>
    useFilterText(item.label).includes(useFilterText(searchBarValue))
  );

  return filteredItems;
};
