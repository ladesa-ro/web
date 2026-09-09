import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import WeekNavigator from './WeekNavigator.vue';

const mountNavigator = (props = {}) =>
  mount(WeekNavigator, {
    props: { weekLabel: '07/09 - 12/09', ...props },
    attachTo: document.body,
  });

describe('WeekNavigator', () => {
  it('renders both navigation buttons by default', () => {
    const wrapper = mountNavigator();
    expect(wrapper.findAll('.ui-week-navigator__button')).toHaveLength(2);
    wrapper.unmount();
  });

  it('hides the buttons when asked', () => {
    const wrapper = mountNavigator({ hideButtons: true });
    expect(wrapper.findAll('.ui-week-navigator__button')).toHaveLength(0);
    wrapper.unmount();
  });

  it('overrides the square button background without important', () => {
    const wrapper = mountNavigator();
    const button = wrapper.find('.ui-week-navigator__button').element;

    expect(getComputedStyle(button).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    wrapper.unmount();
  });

  it('flips the next button', () => {
    const wrapper = mountNavigator();
    const next = wrapper.find('.ui-week-navigator__button--next').element;

    expect(getComputedStyle(next).transform).not.toBe('none');
    wrapper.unmount();
  });
});
