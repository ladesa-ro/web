export type ISidebarItemLink = {
	type: 'link';
	title: string;
	icon: any;
	to: string;
};

export type ISidebarItemGroup = {
	type: 'group';

	title: string;
	icon: any;

	items: ISidebarItem[];
};

export type ISidebarItemSpacer = {
	type: 'spacer';
};

export type ISidebarItem =
	| ISidebarItemLink
	| ISidebarItemGroup
	| ISidebarItemSpacer;
