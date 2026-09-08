import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import DialogSkeleton from './DialogSkeleton.vue';

const openDialog = (props = {}) =>
  mount(DialogSkeleton, {
    props: { modelValue: true, ...props },
    slots: { default: '<p class="conteudo">oi</p>' },
    attachTo: document.body,
  });

afterEach(() => {
  document.body.innerHTML = '';
});

describe('DialogSkeleton', () => {
  it('teleports the content to the body when open', () => {
    const wrapper = openDialog();
    expect(document.querySelector('.conteudo')).not.toBeNull();
    wrapper.unmount();
  });

  it('renders nothing but the activator when closed', () => {
    const wrapper = openDialog({ modelValue: false });
    expect(document.querySelector('.conteudo')).toBeNull();
    wrapper.unmount();
  });

  it('closes on backdrop click by default', async () => {
    const wrapper = openDialog();
    const backdrop = document.querySelector<HTMLElement>(
      '.ui-dialog-skeleton__backdrop'
    );

    backdrop?.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
    wrapper.unmount();
  });

  it('keeps the dialog open on backdrop click when disabled', async () => {
    const wrapper = openDialog({ closeOnClickOutside: false });
    const backdrop = document.querySelector<HTMLElement>(
      '.ui-dialog-skeleton__backdrop'
    );

    backdrop?.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    wrapper.unmount();
  });
})
