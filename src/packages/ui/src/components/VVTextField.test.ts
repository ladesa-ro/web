import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h, ref } from 'vue';
import { Form } from 'vee-validate';
import VVTextField from './VVTextField.vue';

const mountField = (disabled: ReturnType<typeof ref<boolean>>) =>
  mount(
    defineComponent({
      setup: () => () =>
        h(Form, null, {
          default: () =>
            h(VVTextField, { name: 'nome', disabled: disabled.value }),
        }),
    }),
    { attachTo: document.body }
  );

describe('VVTextField', () => {
  it('reacts when the disabled prop flips after mount', async () => {
    const disabled = ref(false);
    const wrapper = mountField(disabled);

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeUndefined();

    disabled.value = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    wrapper.unmount();
  });
});
