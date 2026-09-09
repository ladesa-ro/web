import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CalendarMonth from './CalendarMonth.vue';

const mountMonth = (monthNum: number) =>
  mount(CalendarMonth, {
    props: {
      year: 2026,
      events: [],
      toggleMonth: false,
      calendarId: 'calendario',
      monthNum,
    },
    attachTo: document.body,
  });

describe('CalendarMonth', () => {
  it('escreve o nome do mês em português', () => {
    const wrapper = mountMonth(9);
    expect(wrapper.find('.ui-calendar-month__title').text()).toBe('setembro');
    wrapper.unmount();
  });

  it('abrevia os dias da semana em português', () => {
    const wrapper = mountMonth(9);
    const cabecalho = wrapper.findAll('.ui-calendar-month__grid > p');
    expect(cabecalho.map(p => p.text())).toEqual([
      'Dom',
      'Seg',
      'Ter',
      'Qua',
      'Qui',
      'Sex',
      'Sáb',
    ]);
    wrapper.unmount();
  });
});
