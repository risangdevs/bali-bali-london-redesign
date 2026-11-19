"use client";
import { Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { HOME } from "@/lib/content";
import { fitGateway } from "@/lib/gateway-framing";
import gateway from "@/lib/gateway-model.json";
import useImportedModel from "./useImportedModel";

function Gateway({ onReady }: { onReady: () => void }) {
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
    onReady();
    invalidate();
  }, [onReady, invalidate]);
  useFrame(({ camera, size }) => {
    const view = fitGateway(size.width / size.height);
    camera.position.set(
      view.center[0],
      view.center[1],
      view.center[2] + view.distance,
    );
    camera.lookAt(...view.center);
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
}: {
  onReady: () => void;
  onFailure: () => void;
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
        <Gateway onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
