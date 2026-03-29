export type ISidebarItemLink = {
  type: 'link';
  title: string;
  pageTitle?: string;
  hidden?: boolean;

  icon: Component;

  to: string;
  exact?: boolean;
};

export type ISidebarItemGroup = {
  type: 'group';

  title: string;
  pageTitle?: string;
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
