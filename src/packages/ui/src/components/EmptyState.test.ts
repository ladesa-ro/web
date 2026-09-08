import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import EmptyState from './EmptyState.vue';

describe('EmptyState', () => {
  it('shows the illustration by default', () => {
    const wrapper = mount(EmptyState, { props: { description: 'vazio' } });
    expect(wrapper.find('.ui-empty-state__illustration').exists()).toBe(true);
  });

  it('hides the illustration when asked', () => {
    const wrapper = mount(EmptyState, {
      props: { description: 'vazio', illustration: 'none' },
    });
    expect(wrapper.find('.ui-empty-state__illustration').exists()).toBe(false);
  });

  it('omits the title and the description when not given', () => {
    const wrapper = mount(EmptyState);
    expect(wrapper.find('.ui-empty-state__title').exists()).toBe(false);
    expect(wrapper.find('.ui-empty-state__description').exists()).toBe(false);
  });

  it('centers its content', () => {
    const wrapper = mount(EmptyState, {
      props: { description: 'vazio' },
      attachTo: document.body,
    });
    const { display, flexDirection, alignItems } = getComputedStyle(
      wrapper.element
    );
    expect(display).toBe('flex');
    expect(flexDirection).toBe('column');
    expect(alignItems).toBe('center');
    wrapper.unmount();
  });
});
