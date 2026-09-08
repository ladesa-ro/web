import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LoginTextField from './LoginTextField.vue';

const mountField = (props = {}) =>
  mount(LoginTextField, {
    props: { type: 'password', placeholder: 'Senha', ...props },
    attachTo: document.body,
  });

describe('LoginTextField', () => {
  it('offers the visibility toggle for password fields', () => {
    const wrapper = mountField();
    expect(wrapper.find('.ui-login-text-field__toggle').exists()).toBe(true);
    wrapper.unmount();
  });

  it('omits the toggle for other field types', () => {
    const wrapper = mountField({ type: 'text' });
    expect(wrapper.find('.ui-login-text-field__toggle').exists()).toBe(false);
    wrapper.unmount();
  });

  it('flips the input type when the toggle is pressed', async () => {
    const wrapper = mountField();
    const input = wrapper.find('input').element as HTMLInputElement;

    expect(input.type).toBe('password');

    await wrapper.find('.ui-login-text-field__toggle button').trigger('click');
    expect(input.type).toBe('text');

    await wrapper.find('.ui-login-text-field__toggle button').trigger('click');
    expect(input.type).toBe('password');

    wrapper.unmount();
  });

  it('draws the framed field from the design system', () => {
    const wrapper = mountField();
    const { display, borderTopWidth } = getComputedStyle(wrapper.element);

    expect(display).toBe('flex');
    expect(borderTopWidth).toBe('2px');
    wrapper.unmount();
  });
});
