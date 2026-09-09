import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ModalBaseLayout from './ModalBaseLayout.vue';

const mountLayout = (props = {}) =>
  mount(ModalBaseLayout, {
    props: { onClose: () => {}, ...props },
    slots: { default: 'conteudo' },
    attachTo: document.body,
  });

describe('ModalBaseLayout', () => {
  it('shows the close button by default', () => {
    const wrapper = mountLayout();
    expect(wrapper.find('.ui-modal-layout__close').exists()).toBe(true);
    wrapper.unmount();
  });

  it('hides the close button when asked', () => {
    const wrapper = mountLayout({ closeButton: false });
    expect(wrapper.find('.ui-modal-layout__close').exists()).toBe(false);
    wrapper.unmount();
  });

  it('omits the footer when no button group is given', () => {
    const wrapper = mountLayout();
    expect(wrapper.find('.ui-modal-layout__buttons').exists()).toBe(false);
    wrapper.unmount();
  });

  it('renders the footer when the button group slot is filled', () => {
    const wrapper = mount(ModalBaseLayout, {
      props: { onClose: () => {} },
      slots: { default: 'conteudo', 'button-group': '<button>ok</button>' },
    });
    expect(wrapper.find('.ui-modal-layout__buttons').exists()).toBe(true);
  });

  it('applies the framed surface from the design system', () => {
    const wrapper = mountLayout();
    const { display, borderTopWidth } = getComputedStyle(wrapper.element);
    expect(display).toBe('flex');
    expect(borderTopWidth).toBe('3px');
    wrapper.unmount();
  });
});
