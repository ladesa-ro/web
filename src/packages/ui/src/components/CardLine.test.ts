import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CardLine from './CardLine.vue';

describe('CardLine', () => {
  it('renders the text prop', () => {
    const wrapper = mount(CardLine, { props: { text: 'Slug: ead' } });
    expect(wrapper.text()).toBe('Slug: ead');
  });

  it('prefers slot content over the text prop', () => {
    const wrapper = mount(CardLine, {
      props: { text: 'ignorado' },
      slots: { default: 'do slot' },
    });
    expect(wrapper.text()).toBe('do slot');
  });

  it('truncates on a single line instead of wrapping', () => {
    const wrapper = mount(CardLine, {
      props: { text: 'x'.repeat(200) },
      attachTo: document.body,
    });
    const { whiteSpace, overflow } = getComputedStyle(wrapper.element);
    expect(whiteSpace).toBe('nowrap');
    expect(overflow).toBe('hidden');
    wrapper.unmount();
  });
});
