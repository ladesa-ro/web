import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Container from './Container.vue';

const mountContainer = (props = {}) =>
  mount(Container, {
    props,
    slots: { default: 'conteudo' },
    attachTo: document.body,
  });

describe('Container', () => {
  it('renders the container element by default', () => {
    const wrapper = mountContainer();
    expect(wrapper.find('.ui-container').exists()).toBe(true);
    expect(wrapper.find('.ui-container--default').exists()).toBe(true);
    wrapper.unmount();
  });

  it('applies horizontal margin from the design system', () => {
    const wrapper = mountContainer();
    const el = wrapper.find('.ui-container').element;
    const { marginLeft, marginRight } = getComputedStyle(el);
    expect(marginLeft).not.toBe('0px');
    expect(marginLeft).toBe(marginRight);
    wrapper.unmount();
  });

  it('renders the slot bare when styled is false', () => {
    const wrapper = mountContainer({ styled: false });
    expect(wrapper.find('.ui-container').exists()).toBe(false);
    expect(wrapper.text()).toBe('conteudo');
    wrapper.unmount();
  });
});
