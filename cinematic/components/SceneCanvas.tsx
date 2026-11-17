"use client";
import {
  Suspense,
  useEffect,
  useState,
  useRef,
  useMemo,
  ReactNode,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Group } from "three";
import { initialQuality, qualitySettings } from "@/lib/effects";
import { type Quality } from "@/lib/effects";
import useSceneSample from "./useSceneSample";
import CeramicPortal from "./CeramicPortal";
import AtmosphericLighting from "./AtmosphericLighting";
import RenderQuality from "./RenderQuality";
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
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    const previousError = gl.debug.onShaderError;
    gl.debug.onShaderError = (context, program) => {
      console.error(
        "Bali Bali shader failed:",
        context.getProgramInfoLog(program),
      );
      queueMicrotask(onFailure);
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
      gl.debug.onShaderError = previousError;
    };
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
  useSceneSample((p) => {
    if (group.current) group.current.visible = p >= from && p <= to;
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
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  const ceiling = useMemo(() => {
    const hints = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    return initialQuality({
      mobile,
      cores: hints.hardwareConcurrency,
      memory: hints.deviceMemory,
      saveData: hints.connection?.saveData,
    });
  }, [mobile]);
  const [quality, setQuality] = useState<Quality>(ceiling);
  useEffect(() => setQuality(ceiling), [ceiling]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    // Deferred scene textures are fetched near their chapter, then retained for reverse scroll.
    const id = window.setInterval(
      () =>
        setStage((s) =>
          Math.max(
            s,
            journey.progress > 0.72
              ? 3
              : journey.progress > 0.38
                ? 2
                : journey.progress > 0.12
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
      dpr={Math.min(
        window.devicePixelRatio || 1,
        qualitySettings[quality].dpr,
        mobile ? 1.2 : 1.65,
      )}
      camera={{ position: [0, 1, 13], fov: 43, near: 0.04, far: 110 }}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ContextMonitor onFailure={onFailure} />
      <RenderQuality
        quality={quality}
        ceiling={ceiling}
        onQuality={setQuality}
      />
      <AtmosphericLighting quality={quality} />
      <CameraRig mobile={mobile} />
      <SceneTransition quality={quality} mobile={mobile} />
      <Suspense fallback={null}>
        <SceneWindow from={0} to={0.36}>
          <FoodScene mobile={mobile} quality={quality} />
        </SceneWindow>
        <SceneWindow from={0.1} to={0.4}>
          <CeramicPortal mobile={mobile || quality !== "high"} />
        </SceneWindow>
        <Ready onReady={onReady} />
      </Suspense>
      {stage >= 1 && (
        <Suspense fallback={null}>
          <SceneWindow from={0.18} to={0.54}>
            <SharingScene mobile={mobile} quality={quality} />
          </SceneWindow>
        </Suspense>
      )}
      {stage >= 2 && (
        <Suspense fallback={null}>
          <SceneWindow from={0.5} to={0.74}>
            <HeritageScene quality={quality} mobile={mobile} />
          </SceneWindow>
        </Suspense>
      )}
      {stage >= 3 && (
        <Suspense fallback={null}>
          <SceneWindow from={0.8} to={1}>
            <BookingScene quality={quality} mobile={mobile} />
          </SceneWindow>
        </Suspense>
      )}
    </Canvas>
  );
}
