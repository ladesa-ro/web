import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import Sidebar from './Sidebar.vue';
import type { SidebarItemModel } from './sidebar-item';

const Icone = () => h('i');

const items: SidebarItemModel[] = [
  { type: 'link', title: 'Início', icon: Icone, to: '/' },
  {
    type: 'group',
    title: 'Horário',
    icon: Icone,
    items: [{ type: 'link', title: 'Visualizar', icon: Icone, to: '/h' }],
  },
  { type: 'spacer' },
  { type: 'link', title: 'Oculto', icon: Icone, to: '/x', hidden: true },
];

const mountSidebar = (props = {}) =>
  mount(Sidebar, {
    props: { items, modelValue: true, ...props },
    attachTo: document.body,
  });

describe('Sidebar', () => {
  it('paints the branded fixed rail', () => {
    const wrapper = mountSidebar();
    const { position, backgroundColor, flexDirection } = getComputedStyle(
      wrapper.element
    );

    expect(position).toBe('fixed');
    expect(flexDirection).toBe('column');
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    wrapper.unmount();
  });

  it('renders one entry per visible item and skips hidden ones', () => {
    const wrapper = mountSidebar();
    expect(wrapper.findAll('.ui-sidebar-item')).toHaveLength(2);
    expect(wrapper.text()).not.toContain('Oculto');
    wrapper.unmount();
  });

  it('renders the spacer', () => {
    const wrapper = mountSidebar();
    expect(wrapper.find('.u-flex-1').exists()).toBe(true);
    wrapper.unmount();
  });

  it('slides out of view when closed on small screens', () => {
    const wrapper = mountSidebar({ modelValue: false });
    expect(wrapper.classes()).toContain('ui-sidebar--closed');
    wrapper.unmount();
  });

  it('expands when open', () => {
    const wrapper = mountSidebar();
    expect(wrapper.classes()).toContain('ui-sidebar--open');
    wrapper.unmount();
  });
});
