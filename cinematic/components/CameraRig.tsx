"use client";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { journey, sampleCamera } from "@/lib/journey";
export default function CameraRig() {
  const [position, target] = useMemo(() => [new Vector3(), new Vector3()], []);
  useFrame(({ camera }) => {
    sampleCamera(journey.progress, position, target);
    camera.position.copy(position);
    camera.lookAt(target);
  });
  return null;
}
