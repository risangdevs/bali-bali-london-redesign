"use client";
import { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
  DoubleSide,
  Group,
  PerspectiveCamera,
  SRGBColorSpace,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import { journey, sampleCamera, cameraFov } from "@/lib/journey";
import { asset } from "@/lib/content";
import {
  atmosphereVisibility,
  qualitySettings,
  type Quality,
} from "@/lib/effects";
import {
  photoVisibility,
  photoFramingVisibility,
  photoFitScale,
} from "@/lib/motion";
import type { PhotoLayout } from "@/lib/photo-layout";
import { smooth } from "@/lib/effects";
import { photoFragment, photoVertex } from "@/lib/shaders";
import useSceneSample from "./useSceneSample";
import useOwnedTexture from "./useOwnedTexture";
import SteamParticles from "./SteamParticles";

type Props = PhotoLayout & {
  quality?: Quality;
};
/** Analytic plate relief, not an invented food depth map. Cover UVs preserve photo aspect. */
export default function DepthLayer({
  id,
  src,
  position,
  size = [6, 4.8],
  rotation = [0, 0, 0],
  round = 0,
  start = -1,
  end = 2,
  hot = false,
  fit = false,
  quality = "high",
}: Props) {
  const group = useRef<Group>(null);
  const viewport = useThree((s) => s.size);
  const view = useMemo(
    () =>
      new PerspectiveCamera(
        cameraFov(viewport.width < 768, viewport.width / viewport.height),
        viewport.width / viewport.height,
        0.04,
        110,
      ),
    [viewport.width, viewport.height],
  );
  const vectors = useMemo(
    () => ({
      camera: new Vector3(),
      target: new Vector3(),
      center: new Vector3(),
      normal: new Vector3(),
      toLens: new Vector3(),
      scale: new Vector3(),
      projected: new Vector3(),
    }),
    [],
  );
  const texture = useTexture(asset(src));
  texture.colorSpace = SRGBColorSpace;
  useOwnedTexture(texture, asset(src));
  const material = useRef<ShaderMaterial>(null);
  const shadowMaterial = useRef<ShaderMaterial>(null);
  const image = texture.image as { width: number; height: number };
  const photoAspect = image.width / image.height;
  const planeAspect = size[0] / size[1];
  const uniforms = useMemo(
    () => ({
      photo: { value: texture },
      rounded: { value: round },
      visibility: { value: 1 },
      uCover: {
        value: new Vector2(
          Math.min(1, planeAspect / photoAspect),
          Math.min(1, photoAspect / planeAspect),
        ),
      },
      uRelief: { value: quality === "low" || !round ? 0 : size[0] * 0.014 },
      uTime: { value: 0 },
      uHeat: { value: 0 },
      uQuality: { value: qualitySettings[quality].noise },
      uWarmth: { value: 1 },
      uScroll: { value: 0 },
      uScene: { value: 0 },
      uTransition: { value: 0 },
    }),
    [texture, round, photoAspect, planeAspect, quality, size[0]],
  );
  const visibility = (p: number) => {
    const opacity = photoVisibility(p, start, end);
    if (!opacity || !group.current) return 0;
    const mobile = viewport.width < 768;
    sampleCamera(p, vectors.camera, vectors.target, mobile);
    if (fit) group.current.scale.setScalar(1);
    group.current.updateWorldMatrix(true, false);
    group.current.getWorldPosition(vectors.center);
    group.current.getWorldScale(vectors.scale);
    vectors.normal.set(0, 0, 1).transformDirection(group.current.matrixWorld);
    vectors.toLens.copy(vectors.camera).sub(vectors.center);
    const facing =
      vectors.normal.dot(vectors.toLens) /
      Math.max(0.001, vectors.toLens.length());
    const depth = vectors.toLens
      .negate()
      .dot(vectors.target.sub(vectors.camera).normalize());
    view.position.copy(vectors.camera);
    view.lookAt(vectors.toLens.copy(vectors.camera).add(vectors.target));
    view.updateMatrixWorld();
    vectors.projected.copy(vectors.center).project(view);
    const fitScale = fit
      ? photoFitScale(
          depth,
          size[0] * vectors.scale.x,
          size[1] * vectors.scale.y,
          viewport.width / viewport.height,
          cameraFov(mobile, viewport.width / viewport.height),
          vectors.projected.x,
          vectors.projected.y,
          Array.isArray(fit) ? fit[0] : undefined,
          Array.isArray(fit) ? fit[1] : undefined,
        )
      : 1;
    if (fit) {
      group.current.scale.setScalar(fitScale);
      group.current.updateWorldMatrix(false, false);
    }
    return (
      opacity *
      photoFramingVisibility(
        depth,
        size[0] * vectors.scale.x * fitScale,
        size[1] * vectors.scale.y * fitScale,
        viewport.width / viewport.height,
        cameraFov(mobile, viewport.width / viewport.height),
        facing,
        vectors.projected.x,
        vectors.projected.y,
      )
    );
  };
  useSceneSample((p) => {
    const opacity = visibility(p);
    if (group.current) group.current.visible = opacity > 0.001;
    if (shadowMaterial.current)
      shadowMaterial.current.uniforms.visibility.value = opacity;
    if (!material.current) return;
    const u = material.current.uniforms;
    u.visibility.value = opacity;
    u.uTime.value = journey.time;
    u.uScroll.value = p;
    u.uScene.value = (p * 6) % 1;
    u.uTransition.value = 1 - atmosphereVisibility(p);
    u.uHeat.value = hot
      ? atmosphereVisibility(p) *
        atmosphereVisibility(journey.progress) *
        (quality === "high" ? 1 : 0.55)
      : 0;
    u.uWarmth.value = 1 + smooth(0.5, 0.7, p) * 0.25;
  }, -10);
  const segments = round ? qualitySettings[quality].segments : 1;
  return (
    <group ref={group} name={id} position={position} rotation={rotation}>
      {!!round && quality !== "low" && (
        <mesh position={[0.04, -0.06, -0.035]}>
          <planeGeometry args={[size[0] * 1.06, size[1] * 1.06]} />
          <shaderMaterial
            ref={shadowMaterial}
            uniforms={uniforms}
            transparent
            side={DoubleSide}
            depthWrite={false}
            toneMapped={false}
            vertexShader={photoVertex}
            fragmentShader={`uniform float visibility; varying vec2 vUv;
              void main() {
                float radius=length((vUv-.5)*2.);
                float alpha=(1.-smoothstep(.72,1.,radius))*.09*visibility;
                if(alpha<.001) discard;
                gl_FragColor=vec4(.055,.032,.022,alpha);
                #include <colorspace_fragment>
              }`}
          />
        </mesh>
      )}
      <mesh>
        <planeGeometry args={[size[0], size[1], segments, segments]} />
        <shaderMaterial
          key={quality}
          ref={material}
          uniforms={uniforms}
          defines={{ EFFECT_QUALITY: qualitySettings[quality].noise }}
          transparent
          side={DoubleSide}
          depthWrite={false}
          toneMapped={false}
          vertexShader={photoVertex}
          fragmentShader={photoFragment}
        />
      </mesh>
      {hot && quality !== "low" && (
        <SteamParticles quality={quality} visibility={visibility} />
      )}
    </group>
  );
}
