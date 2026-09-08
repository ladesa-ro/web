import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ReasonsEditModal from './ReasonsEditModal.vue';
import type { ReasonsByDay } from './reason';

const motivosConfirmados: ReasonsByDay = {
  segunda: [
    { horario: '07:30', motivo: 'Reunião' },
    { horario: '08:20', motivo: 'Reunião' },
  ],
  quarta: [{ horario: '13:00', motivo: 'Reunião' }],
  sexta: [{ horario: '19:00', motivo: 'Licença médica' }],
};

const mountModal = () =>
  mount(ReasonsEditModal, {
    props: { motivosConfirmados, selectedDayWeek: null },
    attachTo: document.body,
  });

describe('ReasonsEditModal', () => {
  it('groups the entries by reason instead of by day', () => {
    const wrapper = mountModal();
    const names = wrapper
      .findAll('.ui-reasons-edit-modal__name')
      .map(n => n.text());
    expect(names).toEqual(['Reunião', 'Licença médica']);
    wrapper.unmount();
  });

  it('spells out every day and time of a grouped reason in the tooltip', () => {
    const wrapper = mountModal();
    const tooltip = wrapper
      .find('.ui-reasons-edit-modal__tooltip')
      .attributes('title');
    expect(tooltip).toBe(
      'quarta-feira: 13:00 | segunda-feira: 07:30 08:20'
    );
    wrapper.unmount();
  });

  it('emits the whole grouping when a reason is edited', async () => {
    const wrapper = mountModal();
    await wrapper
      .find('.ui-reasons-edit-modal__action-btn--edit')
      .trigger('click');
    expect(wrapper.emitted('editar')?.[0]?.[0]).toEqual({
      motivo: 'Reunião',
      dias: ['quarta', 'segunda'],
      horariosPorDia: {
        segunda: ['07:30', '08:20'],
        quarta: ['13:00'],
      },
    });
    wrapper.unmount();
  });

  it('emits only the reason name when one is deleted', async () => {
    const wrapper = mountModal();
    await wrapper
      .find('.ui-reasons-edit-modal__action-btn--delete')
      .trigger('click');
    expect(wrapper.emitted('deletar')?.[0]).toEqual(['Reunião']);
    wrapper.unmount();
  });

  it('falls back to an empty message when nothing is registered', () => {
    const wrapper = mount(ReasonsEditModal, {
      props: { motivosConfirmados: {}, selectedDayWeek: null },
      attachTo: document.body,
    });
    expect(wrapper.find('.ui-reasons-edit-modal__empty').text()).toBe(
      'Ainda não há motivos cadastrados.'
    );
    wrapper.unmount();
  });
});
