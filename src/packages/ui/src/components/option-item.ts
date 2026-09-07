export type OptionItem = string | number | ParsedOptionItem;

export type ParsedOptionItem = {
  label: string;
  value: any;
};

/** Convert all items to a { label, value } object. */
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
