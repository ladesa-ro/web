export type OptionItem = string | number | ParsedOptionItem;

export type ParsedOptionItem = {
  label: string;
  value: any;
};

export const getParsedOptionItems = (items: OptionItem[]): ParsedOptionItem[] => {
  return items.map(item => {
    if (typeof item === 'string' || typeof item === 'number') {
      return {
        label: String(item),
        value: item,
      };
    }

    return {
      label: String(item.label),
      value: item.value,
    };
  });
};

export const normalizeOptionItemText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const filterOptionItemsBySearch = (
  items: ParsedOptionItem[],
  searchBarValue: string
) =>
  items.filter(item =>
    normalizeOptionItemText(item.label).includes(
      normalizeOptionItemText(searchBarValue)
    )
  );
