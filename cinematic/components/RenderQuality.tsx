"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { sceneSampleCount } from "./useSceneSample";
import { journey } from "@/lib/journey";
import { FrameBudget, hasAtmosphere, type Quality } from "@/lib/effects";

export default function RenderQuality({
  quality,
  ceiling,
  onQuality,
}: {
  quality: Quality;
  ceiling: Quality;
  onQuality: (quality: Quality) => void;
}) {
  const { gl, invalidate } = useThree();
  const visible = useRef(true);
  const report = useRef(0);
  const frameTime = useRef(1 / 60);
  const monitor = useMemo(() => new FrameBudget(ceiling, ceiling), [ceiling]);
  useEffect(() => {
    const canvas = gl.domElement;
    const update = () => {
      monitor.reset();
      if (!document.hidden && visible.current) invalidate();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      update();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [gl, invalidate, monitor]);
  useEffect(() => {
    gl.domElement.dataset.quality = quality;
  }, [gl, quality]);
  useFrame((_, delta) => {
    if (document.hidden || !visible.current) {
      monitor.reset();
      return;
    }
    journey.time += Math.min(delta, 0.05);
    if (delta < 0.2) frameTime.current += (delta - frameTime.current) * 0.05;
    const next = monitor.sample(delta);
    if (next !== quality) onQuality(next);
    // Steam/heat keep moving when scrolling stops. Quiet chapters return to demand
    // rendering; one invalidation chain, paused entirely when the tab is hidden.
    if (quality !== "low" && hasAtmosphere(journey.progress)) invalidate();
  }, -2);
  useFrame((_, delta) => {
    if (process.env.NODE_ENV !== "development") return;
    report.current += delta;
    if (report.current < 0.5) return;
    report.current = 0;
    const data = gl.domElement.dataset;
    data.frameMs = (frameTime.current * 1000).toFixed(1);
    data.textures = String(gl.info.memory.textures);
    data.geometries = String(gl.info.memory.geometries);
    data.samples = String(sceneSampleCount());
    data.progress = journey.progress.toFixed(5);
    data.effectTime = journey.time.toFixed(2);
  }, 2);
  return null;
}
