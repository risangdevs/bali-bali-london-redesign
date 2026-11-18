"use client";
import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import {
  DoubleSide,
  Group,
  Material,
  Mesh,
  Object3D,
  Texture,
  BufferGeometry,
} from "three";
import { HOME } from "@/lib/content";
import { culturalLayout } from "@/lib/cultural-layout";
import { smooth, type Quality } from "@/lib/effects";
import manifest from "@/lib/gateway-model.json";
import useSceneSample from "./useSceneSample";

const owners = new Map<Object3D, number>();
function disposeSource(scene: Object3D) {
  const geometries = new Set<BufferGeometry>(),
    materials = new Set<Material>(),
    textures = new Set<Texture>();
  scene.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    geometries.add(object.geometry);
    for (const material of Array.isArray(object.material)
      ? object.material
      : [object.material]) {
      materials.add(material);
      Object.values(material).forEach((value) => {
        if (value instanceof Texture) textures.add(value);
      });
    }
  });
  geometries.forEach((g) => g.dispose());
  materials.forEach((m) => m.dispose());
  textures.forEach((t) => t.dispose());
}
/** The licensed scan is prepared offline in canonical passage coordinates.
 * Instances own fade materials; cached geometry/textures have counted ownership.
 */
export default function GatewayModel({
  mobile,
  quality,
}: {
  mobile: boolean;
  quality: Quality;
}) {
  const url = `${HOME}models/${manifest.variants[quality].file}`;
  const { scene } = useGLTF(url, false, false);
  const group = useRef<Group>(null);
  const layout = culturalLayout("gateway", mobile);
  const owned = useMemo(() => {
    const root = scene.clone(true),
      materials: Material[] = [];
    root.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const clone = (source: Material) => {
        const material = source.clone();
        material.transparent = true;
        material.side = DoubleSide;
        materials.push(material);
        return material;
      };
      object.material = Array.isArray(object.material)
        ? object.material.map(clone)
        : clone(object.material);
    });
    return { root, materials, owners: 0 };
  }, [scene]);
  useEffect(() => {
    owned.owners++;
    owners.set(scene, (owners.get(scene) || 0) + 1);
    return () => {
      owned.owners--;
      owners.set(scene, (owners.get(scene) || 1) - 1);
      queueMicrotask(() => {
        if (!owned.owners)
          owned.materials.forEach((material) => material.dispose());
        if (owners.get(scene) !== 0) return;
        owners.delete(scene);
        disposeSource(scene);
        useGLTF.clear(url);
      });
    };
  }, [owned, scene, url]);
  useSceneSample((p) => {
    const opacity =
      smooth(layout.from, layout.from + 0.025, p) *
      (1 - smooth(layout.to - 0.025, layout.to, p));
    if (group.current) group.current.visible = opacity > 0.001;
    owned.materials.forEach((material) => {
      material.opacity = opacity;
      material.depthWrite = opacity > 0.98;
    });
  });
  return (
    <group
      ref={group}
      name="cultural-gateway-scan"
      position={layout.position}
      rotation={layout.rotation}
      scale={layout.scale}
    >
      <primitive object={owned.root} dispose={null} />
    </group>
  );
}
