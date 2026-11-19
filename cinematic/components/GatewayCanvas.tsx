"use client";
import { Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { HOME } from "@/lib/content";
import { sampleMobileGateway } from "@/lib/gateway-framing";
import gateway from "@/lib/gateway-model.json";
import useImportedModel from "./useImportedModel";

export type GatewayMotion = { progress: number; invalidate?: () => void };

function Gateway({
  onReady,
  motion,
}: {
  onReady: () => void;
  motion: GatewayMotion;
}) {
  const hints = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  const quality =
    hints.connection?.saveData ||
    (hints.deviceMemory && hints.deviceMemory <= 2)
      ? "low"
      : "medium";
  const owned = useImportedModel(
    `${HOME}models/${gateway.variants[quality].file}`,
  );
  const { invalidate } = useThree();
  useEffect(() => {
    motion.invalidate = invalidate;
    onReady();
    invalidate();
    return () => {
      motion.invalidate = undefined;
    };
  }, [onReady, invalidate, motion]);
  useFrame(({ camera, size }) => {
    const view = sampleMobileGateway(motion.progress, size.width / size.height);
    camera.position.fromArray(view.position);
    camera.lookAt(...view.target);
    camera.updateMatrixWorld();
  });
  return <primitive object={owned.root} dispose={null} />;
}

function Monitor({ onFailure }: { onFailure: () => void }) {
  const canvas = useThree((s) => s.gl.domElement);
  useEffect(() => {
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [canvas, onFailure]);
  return null;
}

export default function GatewayCanvas({
  onReady,
  onFailure,
  motion,
}: {
  onReady: () => void;
  onFailure: () => void;
  motion: GatewayMotion;
}) {
  return (
    <Canvas
      aria-hidden="true"
      frameloop="demand"
      dpr={1}
      camera={{ fov: 38, near: 0.01, far: 30, position: [0, 0, 3] }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <Monitor onFailure={onFailure} />
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 8, 10]} intensity={2.4} color="#fff3df" />
      <Suspense fallback={null}>
        <Gateway onReady={onReady} motion={motion} />
      </Suspense>
    </Canvas>
  );
}
