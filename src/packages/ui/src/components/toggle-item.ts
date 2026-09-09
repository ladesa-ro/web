import type { Component } from 'vue';

export type ToggleItem = {
  text: string;
  value: string | number;
  icon?: Component | (SVGElement & HTMLElement);
};
