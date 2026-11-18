"use client";
import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";
import { journey, sampleCamera, cameraFov } from "@/lib/journey";

export function frameCamera(
  camera: PerspectiveCamera,
  position: Vector3,
  target: Vector3,
  mobile: boolean,
  aspect: number,
) {
  camera.position.copy(position);
  // A wider portrait lens retains the plate and negative space for the copy.
  // Direct and offscreen cameras use the same responsive route and lens.
  const fov = cameraFov(mobile, aspect);
  if (camera.fov !== fov) {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }
  camera.lookAt(target);
  camera.updateMatrixWorld();
}
export default function CameraRig({ mobile }: { mobile: boolean }) {
  const [position, target] = useMemo(() => [new Vector3(), new Vector3()], []);
  const size = useThree((s) => s.size);
  useFrame(({ camera }) => {
    sampleCamera(journey.progress, position, target, mobile);
    frameCamera(
      camera as PerspectiveCamera,
      position,
      target,
      mobile,
      size.width / size.height,
    );
  }, -1);
  return null;
}
