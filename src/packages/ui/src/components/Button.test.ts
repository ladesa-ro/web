import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Button from './Button.vue';

describe('Button', () => {
  it('wraps the label in phrasing content so callers can nest blocks', () => {
    const wrapper = mount(Button, { slots: { default: '<p>bloco</p>' } });
    expect(wrapper.find('.ui-button__label').element.tagName).toBe('SPAN');
  });

  it('renders icon wrappers only for the slots it receives', () => {
    expect(mount(Button).find('.ui-button__icon').exists()).toBe(false);

    const withStart = mount(Button, {
      slots: { 'start-icon': '<i class="mark" />' },
    });
    expect(withStart.findAll('.ui-button__icon')).toHaveLength(1);
    expect(withStart.find('.ui-button__icon .mark').exists()).toBe(true);
  });
});
