import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Badge from './Badge.vue';

const mountBadge = (props = {}) =>
  mount(Badge, { props: { text: 'Ativo', ...props }, attachTo: document.body });

describe('Badge', () => {
  it('defaults to the neutral variant', () => {
    const wrapper = mountBadge();
    expect(wrapper.classes()).toContain('ui-badge');
    expect(wrapper.classes()).toContain('ui-badge--neutral');
    wrapper.unmount();
  });

  it('renders the text prop and prefers slot content', () => {
    const comTexto = mountBadge();
    expect(comTexto.text()).toBe('Ativo');
    comTexto.unmount();

    const comSlot = mount(Badge, {
      props: { text: 'ignorado' },
      slots: { default: 'do slot' },
    });
    expect(comSlot.text()).toBe('do slot');
  });

  it('tints background and text for every variant', () => {
    for (const variant of ['success', 'danger', 'warning', 'info'] as const) {
      const wrapper = mountBadge({ variant });
      const { backgroundColor, color } = getComputedStyle(wrapper.element);

      expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(color).not.toBe('');
      wrapper.unmount();
    }
  });
});
