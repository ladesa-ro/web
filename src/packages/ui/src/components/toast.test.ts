import { describe, expect, it } from 'vitest';
import { reactive, ref } from 'vue';
import { closeToast, type ToastItem } from './toast';

const novaFila = () =>
  reactive<ToastItem[]>([
    {
      id: 1,
      open: ref(true) as unknown as boolean,
      title: 'oi',
      type: 'info',
      actionLabel: 'Desfazer',
    },
  ]);

describe('closeToast', () => {
  it('fecha um toast guardado num array reativo', () => {
    const fila = novaFila();

    closeToast(fila[0]!);

    expect(fila[0]!.open).toBe(false);
  });

  it('escreve no ref original, para o watcher de quem criou o toast', () => {
    const aberto = ref(true);
    const fila = reactive<ToastItem[]>([
      {
        id: 1,
        open: aberto as unknown as boolean,
        title: 'oi',
        type: 'info',
      },
    ]);

    closeToast(fila[0]!);

    expect(aberto.value).toBe(false);
  });

  it('não lança ao fechar', () => {
    const fila = novaFila();

    expect(() => closeToast(fila[0]!)).not.toThrow();
  });
});
