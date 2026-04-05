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
      listeners.get(event)!.add(handler);
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
    return {
      on(event, handler) { window.addEventListener(event, handler as EventListener); },
      off(event, handler) { window.removeEventListener(event, handler as EventListener); },
      emit(event) { window.dispatchEvent(new CustomEvent(event)); },
    };
  }
  return bus;
}
