import type { ParsedItem } from './useOptionItems';

const filterText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const filterItemsBySearch = (
  items: ParsedItem[],
  searchBarValue: string
) => {
  const filteredItems = items.filter(item =>
    filterText(item.label).includes(filterText(searchBarValue))
  );

  return filteredItems;
};
