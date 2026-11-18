"use client";
import { useLayoutEffect, useRef } from "react";
import { journey } from "@/lib/journey";
// Both offscreen cameras sample the same authoritative GSAP journey. No second timeline.
type Sample = { update: (progress: number) => void; priority: number };
const samples = new Set<Sample>();
let ordered: Sample[] = [];
const reorder = () => {
  ordered = [...samples].sort((a, b) => a.priority - b.priority);
};
export const sceneSampleCount = () => samples.size;
export function sampleScene(progress: number) {
  ordered.forEach((sample) => sample.update(progress));
}
export default function useSceneSample(
  sample: (progress: number) => void,
  priority = 0,
) {
  const current = useRef(sample);
  useLayoutEffect(() => {
    current.current = sample;
  });
  useLayoutEffect(() => {
    const update = (p: number) => current.current(p);
    const entry = { update, priority };
    samples.add(entry);
    reorder();
    update(journey.progress);
    journey.invalidate?.();
    return () => {
      samples.delete(entry);
      reorder();
    };
  }, [priority]);
}
