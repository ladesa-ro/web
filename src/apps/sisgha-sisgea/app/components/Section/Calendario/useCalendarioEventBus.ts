import { provide, inject, onBeforeUnmount } from 'vue';
import type { InjectionKey } from 'vue';

type EventHandler = () => void;

interface CalendarioEvents {
  onEventsUpdated(handler: EventHandler): void;
  offEventsUpdated(handler: EventHandler): void;
  emitEventsUpdated(): void;

  onForceCloseInnerModals(handler: EventHandler): void;
  offForceCloseInnerModals(handler: EventHandler): void;
  emitForceCloseInnerModals(): void;
}

const CALENDARIO_EVENTS_KEY: InjectionKey<CalendarioEvents> = Symbol('calendario-events');

function createHandlerSet() {
  const handlers = new Set<EventHandler>();

  return {
    on(handler: EventHandler) {
      handlers.add(handler);
    },
    off(handler: EventHandler) {
      handlers.delete(handler);
    },
    emit() {
      handlers.forEach((handler) => handler());
    },
  };
}

export function useProvideCalendarioEvents(): CalendarioEvents {
  const eventsUpdated = createHandlerSet();
  const forceClose = createHandlerSet();

  const events: CalendarioEvents = {
    onEventsUpdated: eventsUpdated.on,
    offEventsUpdated: eventsUpdated.off,
    emitEventsUpdated: eventsUpdated.emit,

    onForceCloseInnerModals: forceClose.on,
    offForceCloseInnerModals: forceClose.off,
    emitForceCloseInnerModals: forceClose.emit,
  };

  provide(CALENDARIO_EVENTS_KEY, events);
  return events;
}

export function useInjectCalendarioEvents(): CalendarioEvents {
  const events = inject(CALENDARIO_EVENTS_KEY);

  if (!events) {
    throw new Error(
      'useInjectCalendarioEvents: Contexto não encontrado. Certifique-se de que useProvideCalendarioEvents foi chamado em um componente pai.',
    );
  }

  return events;
}

/**
 * Registers a handler for `eventsUpdated` that is automatically cleaned up on unmount.
 */
export function useOnCalendarioEventsUpdated(handler: EventHandler) {
  const events = useInjectCalendarioEvents();
  events.onEventsUpdated(handler);

  onBeforeUnmount(() => {
    events.offEventsUpdated(handler);
  });
}

/**
 * Registers a handler for `forceCloseInnerModals` that is automatically cleaned up on unmount.
 */
export function useOnCalendarioForceClose(handler: EventHandler) {
  const events = useInjectCalendarioEvents();
  events.onForceCloseInnerModals(handler);

  onBeforeUnmount(() => {
    events.offForceCloseInnerModals(handler);
  });
}
