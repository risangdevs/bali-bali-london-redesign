"use client";
import { useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { Texture } from "three";
// Several photo planes share each texture. Dispose only after its final consumer
// unmounts. Deferring one microtask also handles Strict Mode's effect replay.
const owners = new Map<Texture, number>();
export default function useOwnedTexture(texture: Texture, url: string) {
  useEffect(() => {
    owners.set(texture, (owners.get(texture) || 0) + 1);
    return () => {
      owners.set(texture, (owners.get(texture) || 1) - 1);
      queueMicrotask(() => {
        if (owners.get(texture) !== 0) return;
        owners.delete(texture);
        texture.dispose();
        useTexture.clear(url);
      });
    };
  }, [texture, url]);
}
