export type Item = string | number | ParsedItem;

export type ParsedItem = {
  label: string;
  value: any;
};

/** Convert all items to a { label, value } object. */
export const getParsedItems = (items: Item[]): ParsedItem[] => {
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
