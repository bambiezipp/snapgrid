/**
 * transition.ts
 * Utilities for building CSS transition styles in snapgrid.
 */

export type EasingPreset = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end';

export interface TransitionLayer {
  property?: string | string[];
  duration?: number | string;
  easing?: EasingPreset | string;
  delay?: number | string;
}

export type TransitionInput = TransitionLayer | TransitionLayer[] | 'none' | false;

export function toTimeValue(value: number | string | undefined, fallback = '0s'): string {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'number') return `${value}ms`;
  return String(value);
}

export function normalizeTransitionLayer(layer: TransitionLayer): string {
  const property = Array.isArray(layer.property)
    ? layer.property.join(', ')
    : (layer.property ?? 'all');
  const duration = toTimeValue(layer.duration, '200ms');
  const easing = layer.easing ?? 'ease';
  const delay = toTimeValue(layer.delay, '0s');
  return `${property} ${duration} ${easing} ${delay}`;
}

export function normalizeTransition(input: TransitionInput): string[] {
  if (!input || input === 'none') return ['none'];
  const layers = Array.isArray(input) ? input : [input];
  return layers.map(normalizeTransitionLayer);
}

export function buildTransitionStyles(input: TransitionInput): Record<string, string> {
  const values = normalizeTransition(input);
  return {
    transition: values.join(', '),
  };
}

export function transitionToCSS(input: TransitionInput): string {
  const styles = buildTransitionStyles(input);
  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
}
