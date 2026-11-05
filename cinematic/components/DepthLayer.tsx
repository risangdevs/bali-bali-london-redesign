"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { journey } from "@/lib/journey";
import { useTexture } from "@react-three/drei";
import { DoubleSide, SRGBColorSpace, ShaderMaterial } from "three";
import { asset } from "@/lib/content";
type Props = {
  src: string;
  position: [number, number, number];
  size?: [number, number];
  rotation?: [number, number, number];
  round?: number;
  start?: number;
  end?: number;
};
// Photos remain photographs. The shader feathers the edge of the plate aperture;
// perspective and occlusion come from real world-space layers, not CSS scaling.
export default function DepthLayer({
  src,
  position,
  size = [6, 4.8],
  rotation = [0, 0, 0],
  round = 0,
  start = -1,
  end = 2,
}: Props) {
  const texture = useTexture(asset(src));
  texture.colorSpace = SRGBColorSpace;
  const material = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      photo: { value: texture },
      rounded: { value: round },
      visibility: {
        value: Math.max(
          0,
          Math.min(
            1,
            (journey.progress - start) / 0.045,
            (end - journey.progress) / 0.045,
          ),
        ),
      },
    }),
    [texture, round, start, end],
  );
  useFrame(() => {
    if (material.current)
      material.current.uniforms.visibility.value = Math.max(
        0,
        Math.min(
          1,
          (journey.progress - start) / 0.045,
          (end - journey.progress) / 0.045,
        ),
      );
  });
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        transparent
        side={DoubleSide}
        depthWrite={false}
        vertexShader={`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
        fragmentShader={`uniform sampler2D photo; uniform float rounded; uniform float visibility; varying vec2 vUv;
       void main(){vec4 c=texture2D(photo,vUv); vec2 q=(vUv-.5)*2.; float alpha=rounded>.5?1.-smoothstep(.94,1.,length(q)):1.;gl_FragColor=vec4(c.rgb,alpha*visibility);
       #include <tonemapping_fragment>
       #include <colorspace_fragment>
       }`}
      />
    </mesh>
  );
}
