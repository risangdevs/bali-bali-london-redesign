"use client";
import { Suspense, useEffect, useState, useRef, ReactNode } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Group } from "three";
import { AdaptiveDpr } from "@react-three/drei";
import { journey } from "@/lib/journey";
import CameraRig from "./CameraRig";
import FoodScene, { SharingScene } from "./FoodScene";
import SceneTransition from "./SceneTransition";
import HeritageScene from "./HeritageScene";
import BookingScene from "./BookingScene";
function Ready({ onReady }: { onReady: () => void }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    journey.invalidate = invalidate;
    onReady();
    return () => {
      journey.invalidate = undefined;
    };
  }, [invalidate, onReady]);
  return null;
}
function ContextMonitor({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);
  return null;
}
function SceneWindow({
  from,
  to,
  children,
}: {
  from: number;
  to: number;
  children: ReactNode;
}) {
  const group = useRef<Group>(null);
  useFrame(() => {
    if (group.current)
      group.current.visible =
        journey.progress >= from && journey.progress <= to;
  });
  return <group ref={group}>{children}</group>;
}
export default function SceneCanvas({
  onReady,
  onFailure,
}: {
  onReady: () => void;
  onFailure: () => void;
}) {
  const [mobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  const [stage, setStage] = useState(0);
  useEffect(() => {
    // Deferred scene textures are fetched near their chapter, then retained for reverse scroll.
    const id = window.setInterval(
      () =>
        setStage((s) =>
          Math.max(
            s,
            journey.progress > 0.65
              ? 3
              : journey.progress > 0.43
                ? 2
                : journey.progress > 0.16
                  ? 1
                  : 0,
          ),
        ),
      250,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <Canvas
      aria-hidden="true"
      frameloop="demand"
      dpr={mobile ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 1, 13], fov: 43, near: 0.04, far: 110 }}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ContextMonitor onFailure={onFailure} />
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 8, 10]} intensity={2.4} color="#fff3df" />
      <CameraRig />
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <SceneWindow from={0} to={0.36}>
          <FoodScene mobile={mobile} />
        </SceneWindow>
        <SceneWindow from={0.1} to={0.4}>
          <SceneTransition mobile={mobile} />
        </SceneWindow>
        <Ready onReady={onReady} />
      </Suspense>
      {stage >= 1 && (
        <Suspense fallback={null}>
          <SceneWindow from={0.18} to={0.54}>
            <SharingScene mobile={mobile} />
          </SceneWindow>
        </Suspense>
      )}
      {stage >= 2 && (
        <Suspense fallback={null}>
          <SceneWindow from={0.5} to={0.74}>
            <HeritageScene />
          </SceneWindow>
        </Suspense>
      )}
      {stage >= 3 && (
        <Suspense fallback={null}>
          <SceneWindow from={0.8} to={1}>
            <BookingScene />
          </SceneWindow>
        </Suspense>
      )}
    </Canvas>
  );
}
