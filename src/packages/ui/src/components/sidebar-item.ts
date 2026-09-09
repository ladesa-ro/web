import type { Component, InjectionKey, Ref } from 'vue';

export type SidebarItemLinkModel = {
  type: 'link';
  title: string;
  pageTitle?: string;
  hidden?: boolean;
  icon: Component;
  to: string;
  exact?: boolean;
};

export type SidebarItemGroupModel = {
  type: 'group';
  title: string;
  pageTitle?: string;
  icon: Component;
  items: SidebarItemModel[];
};

export type SidebarItemSpacerModel = {
  type: 'spacer';
};

export type SidebarItemModel =
  | SidebarItemLinkModel
  | SidebarItemGroupModel
  | SidebarItemSpacerModel;

export const SidebarSelectedItemKey: InjectionKey<
  Ref<SidebarItemModel | undefined>
> = Symbol('ui-sidebar-selected-item');
