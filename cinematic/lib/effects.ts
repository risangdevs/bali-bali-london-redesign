/** Quality decisions are infrequent; scroll and shader values stay mutable. */
export type Quality = "high" | "medium" | "low";
export const qualitySettings = {
  high: { dpr: 1.65, particles: 64, segments: 24, targetScale: 1, noise: 2 },
  medium: { dpr: 1.2, particles: 22, segments: 10, targetScale: 0.8, noise: 1 },
  low: { dpr: 1, particles: 0, segments: 1, targetScale: 0, noise: 0 },
} as const;
export function initialQuality(hints: {
  mobile: boolean;
  cores?: number;
  memory?: number;
  saveData?: boolean;
}): Quality {
  if (hints.saveData || (hints.memory !== undefined && hints.memory <= 2))
    return "low";
  if (
    hints.mobile ||
    (hints.cores !== undefined && hints.cores <= 4) ||
    (hints.memory !== undefined && hints.memory <= 4)
  )
    return "medium";
  return "high";
}
const levels: Quality[] = ["low", "medium", "high"];
/** Two slow 90-frame windows downgrade; five fast windows recover, with hysteresis.
 * Idle gaps/background tabs are not performance samples. No device can exceed its ceiling.
 */
export class FrameBudget {
  private count = 0;
  private total = 0;
  private slow = 0;
  private fast = 0;
  private warmup = 30;
  constructor(
    public level: Quality,
    private ceiling: Quality,
  ) {}
  sample(delta: number): Quality {
    if (delta <= 0 || delta > 0.2) {
      this.reset();
      return this.level;
    }
    if (this.warmup-- > 0) return this.level;
    this.total += delta;
    if (++this.count < 90) return this.level;
    const average = this.total / this.count;
    this.count = this.total = 0;
    this.slow = average > 1 / 44 ? this.slow + 1 : 0;
    this.fast = average < 1 / 57 ? this.fast + 1 : 0;
    let index = levels.indexOf(this.level);
    if (this.slow >= 2 && index > 0) index--;
    else if (this.fast >= 5 && index < levels.indexOf(this.ceiling)) index++;
    else return this.level;
    this.level = levels[index];
    this.reset();
    return this.level;
  }
  reset() {
    this.count = this.total = this.slow = this.fast = 0;
    this.warmup = 30;
  }
}
export const smooth = (a: number, b: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
export const transitions = [
  {
    from: 0.125,
    to: 0.205,
    center: [0.7, 0.47] as const,
    approach: 0.62,
    mode: "shader",
  },
  {
    from: 0.255,
    to: 0.375,
    center: [0.51, 0.5] as const,
    approach: 0.32,
    mode: "physical",
  },
  {
    from: 0.49,
    to: 0.57,
    center: [0.62, 0.48] as const,
    approach: 0.28,
    mode: "shader",
  },
  {
    from: 0.66,
    to: 0.745,
    center: [0.72, 0.54] as const,
    approach: 0.25,
    mode: "physical",
  },
  {
    from: 0.825,
    to: 0.91,
    center: [0.65, 0.48] as const,
    approach: 0.35,
    mode: "shader",
  },
];
export function transitionAt(p: number) {
  return transitions.find(({ from, to }) => p >= from && p <= to);
}
export function transitionSamples(
  p: number,
  transition: (typeof transitions)[number],
) {
  const { from, to, approach } = transition;
  const progress = Math.max(0, Math.min(1, (p - from) / (to - from)));
  const envelope = Math.sin(progress * Math.PI) ** 2;
  const separation = (to - from) * (1 - approach) * 0.24 * envelope;
  return {
    progress,
    outgoing: p - separation,
    incoming: p + separation * 0.75,
  };
}
export function atmosphereVisibility(p: number) {
  const transition = transitionAt(p);
  return transition
    ? 1 - Math.sin(transitionSamples(p, transition).progress * Math.PI)
    : 1;
}
export function hasAtmosphere(p: number) {
  return (p < 0.54 || p > 0.64) && atmosphereVisibility(p) > 0.015;
}
