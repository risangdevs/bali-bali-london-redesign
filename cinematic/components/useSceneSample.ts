"use client";
import { useLayoutEffect, useRef } from "react";
import { journey } from "@/lib/journey";
// Both offscreen cameras sample the same authoritative GSAP journey. No second timeline.
const samples = new Set<(progress: number) => void>();
export const sceneSampleCount = () => samples.size;
export function sampleScene(progress: number) {
  samples.forEach((sample) => sample(progress));
}
export default function useSceneSample(sample: (progress: number) => void) {
  const current = useRef(sample);
  useLayoutEffect(() => {
    current.current = sample;
  });
  useLayoutEffect(() => {
    const update = (p: number) => current.current(p);
    samples.add(update);
    update(journey.progress);
    journey.invalidate?.();
    return () => {
      samples.delete(update);
    };
  }, []);
}
