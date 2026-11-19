"use client";
import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import {
  DoubleSide,
  Material,
  Mesh,
  Object3D,
  Texture,
  BufferGeometry,
} from "three";
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
export default function useImportedModel(url: string) {
  const { scene } = useGLTF(url, false, false);
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
  return owned;
}
