import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import UnavailabilityGrid from './UnavailabilityGrid.vue';
import type { UnavailabilityItem } from './unavailability';

const items: UnavailabilityItem[] = [
  {
    id: '1',
    tipo: 'BLOQUEIO',
    diaSemana: 1,
    inicio: '08:00',
    fim: '10:00',
  },
  {
    id: '2',
    tipo: 'PREFERENCIA',
    diaSemana: 3,
    inicio: '14:00',
    fim: '15:00',
  },
];

const mountGrid = () =>
  mount(UnavailabilityGrid, { props: { items }, attachTo: document.body });

describe('UnavailabilityGrid', () => {
  it('renders one column per week day', () => {
    const wrapper = mountGrid();
    expect(wrapper.findAll('.ui-unavailability-grid__day')).toHaveLength(7);
    wrapper.unmount();
  });

  it('places each block on its own week day', () => {
    const wrapper = mountGrid();
    const days = wrapper.findAll('.ui-unavailability-grid__day');
    expect(days[1]?.findAll('.ui-unavailability-grid__block')).toHaveLength(1);
    expect(days[3]?.findAll('.ui-unavailability-grid__block')).toHaveLength(1);
    expect(days[0]?.findAll('.ui-unavailability-grid__block')).toHaveLength(0);
    wrapper.unmount();
  });

  it('positions a block proportionally inside the 06:00-22:00 range', () => {
    const wrapper = mountGrid();
    const block = wrapper.find('.ui-unavailability-grid__block');
    expect(block.attributes('style')).toContain('top: 12.5%');
    expect(block.attributes('style')).toContain('height: 12.5%');
    wrapper.unmount();
  });

  it('stripes only the non-blocking entries', () => {
    const wrapper = mountGrid();
    const striped = wrapper.findAll(
      '.ui-unavailability-grid__block--striped'
    );
    expect(striped).toHaveLength(1);
    expect(striped[0]?.text()).toBe('14:00–15:00');
    wrapper.unmount();
  });

  it('sizes the hour rail from the design system', () => {
    const wrapper = mountGrid();
    const hours = wrapper.find('.ui-unavailability-grid__hours');
    const { height, width } = getComputedStyle(hours.element);
    expect(height).toBe('960px');
    expect(width).toBe('48px');
    wrapper.unmount();
  });

  it('emits empty-click with the week day it belongs to', async () => {
    const wrapper = mountGrid();
    const days = wrapper.findAll('.ui-unavailability-grid__day-track');
    await days[4]?.trigger('click');
    expect(wrapper.emitted('empty-click')?.[0]).toEqual([4]);
    wrapper.unmount();
  });

  it('emits block-click without also firing empty-click', async () => {
    const wrapper = mountGrid();
    await wrapper.find('.ui-unavailability-grid__block').trigger('click');
    expect(wrapper.emitted('block-click')?.[0]?.[0]).toMatchObject({ id: '1' });
    expect(wrapper.emitted('empty-click')).toBeUndefined();
    wrapper.unmount();
  });
});
