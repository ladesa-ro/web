import { provide, inject } from 'vue';
import type { InjectionKey } from 'vue';

type EventHandler = () => void;

interface CalendarioEventBus {
  on(event: string, handler: EventHandler): void;
  off(event: string, handler: EventHandler): void;
  emit(event: string): void;
}

const CALENDARIO_EVENT_BUS_KEY: InjectionKey<CalendarioEventBus> = Symbol('calendario-event-bus');

export function useProvideCalendarioEventBus(): CalendarioEventBus {
  const listeners = new Map<string, Set<EventHandler>>();

  const bus: CalendarioEventBus = {
    on(event, handler) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event)?.add(handler);
    },
    off(event, handler) {
      listeners.get(event)?.delete(handler);
    },
    emit(event) {
      listeners.get(event)?.forEach(handler => handler());
    },
  };

  provide(CALENDARIO_EVENT_BUS_KEY, bus);
  return bus;
}

export function useCalendarioEventBus(): CalendarioEventBus {
  const bus = inject(CALENDARIO_EVENT_BUS_KEY);
  if (!bus) {
    // Fallback to window events for backward compatibility during migration
    const wrapperMap = new Map<EventHandler, EventListener>();
    return {
      on(event, handler) {
        const wrapper: EventListener = () => handler();
        wrapperMap.set(handler, wrapper);
        window.addEventListener(event, wrapper);
      },
      off(event, handler) {
        const wrapper = wrapperMap.get(handler);
        if (wrapper) {
          window.removeEventListener(event, wrapper);
          wrapperMap.delete(handler);
        }
      },
      emit(event) { window.dispatchEvent(new CustomEvent(event)); },
    };
  }
  return bus;
}
