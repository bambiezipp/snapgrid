export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationPlayState = 'running' | 'paused';

export interface AnimationLayer {
  name?: string;
  duration?: number | string;
  delay?: number | string;
  easing?: string;
  iterations?: number | 'infinite';
  fill?: AnimationFillMode;
  direction?: AnimationDirection;
  playState?: AnimationPlayState;
}

export type AnimationInput = AnimationLayer | AnimationLayer[] | string;

export function toTimeValue(value: number | string | undefined, defaultUnit = 'ms'): string {
  if (value === undefined) return '0ms';
  if (typeof value === 'string') return value;
  return `${value}${defaultUnit}`;
}

export function normalizeAnimationLayer(input: AnimationLayer): Required<AnimationLayer> {
  return {
    name: input.name ?? 'none',
    duration: input.duration ?? 0,
    delay: input.delay ?? 0,
    easing: input.easing ?? 'ease',
    iterations: input.iterations ?? 1,
    fill: input.fill ?? 'none',
    direction: input.direction ?? 'normal',
    playState: input.playState ?? 'running',
  };
}

export function normalizeAnimation(input: AnimationInput): AnimationLayer[] {
  if (typeof input === 'string') {
    return [{ name: input }];
  }
  if (Array.isArray(input)) {
    return input.map(normalizeAnimationLayer);
  }
  return [normalizeAnimationLayer(input)];
}

export function layerToCSS(layer: Required<AnimationLayer>): string {
  const duration = toTimeValue(layer.duration);
  const delay = toTimeValue(layer.delay);
  const iterations = layer.iterations === 'infinite' ? 'infinite' : String(layer.iterations);
  return `${layer.name} ${duration} ${layer.easing} ${delay} ${iterations} ${layer.fill} ${layer.direction} ${layer.playState}`;
}

export function buildAnimationStyles(input: AnimationInput): Record<string, string> {
  const layers = normalizeAnimation(input);
  const normalized = layers.map(normalizeAnimationLayer);
  const value = normalized.map(layerToCSS).join(', ');
  return { animation: value };
}

export function animationToCSS(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
}
