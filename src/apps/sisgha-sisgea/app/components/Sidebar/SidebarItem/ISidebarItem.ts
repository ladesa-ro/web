export type ISidebarItemLink = {
  type: 'link';
  title: string;

  icon: Component;

  to: string;
  exact?: boolean;
};

export type ISidebarItemGroup = {
  type: 'group';

  title: string;
  icon: Component;

  items: ISidebarItem[];
};

export type ISidebarItemSpacer = {
  type: 'spacer';
};

export type ISidebarItem =
  | ISidebarItemLink
  | ISidebarItemGroup
  | ISidebarItemSpacer;
