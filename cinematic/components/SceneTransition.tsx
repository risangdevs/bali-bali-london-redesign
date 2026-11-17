"use client";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  DepthTexture,
  Mesh,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  UnsignedByteType,
  Vector2,
  Vector3,
  WebGLRenderTarget,
} from "three";
import { journey, sampleCamera } from "@/lib/journey";
import {
  qualitySettings,
  transitionAt,
  transitionSamples,
  type Quality,
} from "@/lib/effects";
import { transitionFragment, transitionVertex } from "@/lib/shaders";
import { sampleScene } from "./useSceneSample";
import { frameCamera } from "./CameraRig";

/** Reusable, reversible two-camera compositor. Targets exist only on medium/high.
 * All world transforms/uniforms are sampled from the same GSAP progress for each
 * pass, then restored. HTML and CTAs are outside this render pipeline entirely.
 */
export default function SceneTransition({
  quality,
  mobile,
}: {
  quality: Quality;
  mobile: boolean;
}) {
  const { gl, size, invalidate } = useThree();
  const lastTransition = useRef(false);
  const resources = useMemo(() => {
    if (quality === "low") return null;
    const makeTarget = () => {
      const target = new WebGLRenderTarget(1, 1, {
        type: UnsignedByteType,
        depthBuffer: true,
        stencilBuffer: false,
      });
      target.depthTexture = new DepthTexture(1, 1);
      target.texture.generateMipmaps = false;
      return target;
    };
    const from = makeTarget(),
      to = makeTarget();
    const material = new ShaderMaterial({
      uniforms: {
        uFrom: { value: from.texture },
        uTo: { value: to.texture },
        uDepthFrom: { value: from.depthTexture },
        uDepthTo: { value: to.depthTexture },
        uProgress: { value: 0 },
        uAspect: { value: 1 },
        uCenter: { value: new Vector2(0.5, 0.5) },
        uNear: { value: 0.04 },
        uFar: { value: 110 },
        uQuality: { value: qualitySettings[quality].noise },
        uScroll: { value: 0 },
      },
      vertexShader: transitionVertex,
      fragmentShader: transitionFragment,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    const geometry = new PlaneGeometry(2, 2);
    const scene = new Scene();
    scene.add(new Mesh(geometry, material));
    return {
      from,
      to,
      material,
      geometry,
      scene,
      screenCamera: new OrthographicCamera(-1, 1, 1, -1, 0, 1),
      viewCamera: new PerspectiveCamera(43, 1, 0.04, 110),
      position: new Vector3(),
      target: new Vector3(),
    };
  }, [quality]);
  useLayoutEffect(() => {
    if (!resources) return;
    const scale = gl.getPixelRatio() * qualitySettings[quality].targetScale;
    const cap = Math.min(
      1,
      1600 / (size.width * scale),
      Math.sqrt(
        (quality === "high" ? 1_250_000 : 720_000) /
          (size.width * size.height * scale * scale),
      ),
    );
    const width = Math.max(1, Math.round(size.width * scale * cap));
    const height = Math.max(1, Math.round(size.height * scale * cap));
    resources.from.setSize(width, height);
    resources.to.setSize(width, height);
    resources.material.uniforms.uAspect.value = size.width / size.height;
    resources.viewCamera.aspect = size.width / size.height;
    resources.viewCamera.updateProjectionMatrix();
    invalidate();
  }, [resources, gl, size.width, size.height, quality, invalidate]);
  useEffect(
    () => () => {
      if (!resources) return;
      resources.from.dispose();
      resources.to.dispose();
      resources.material.dispose();
      resources.geometry.dispose();
      resources.scene.clear();
    },
    [resources],
  );
  // Positive priority deliberately owns the v9 R3F render job. All other frame
  // work runs first; there is no competing EffectComposer or requestAnimationFrame.
  useFrame(({ scene, camera }) => {
    const p = journey.progress;
    const candidate = resources && transitionAt(p);
    const transition =
      candidate && candidate.mode === "shader" ? candidate : undefined;
    if (!resources || !transition) {
      sampleScene(p);
      gl.setRenderTarget(null);
      gl.render(scene, camera);
      if (lastTransition.current) {
        // Return GPU storage between transition windows; objects can be reused on reverse.
        resources?.from.dispose();
        resources?.to.dispose();
      }
      lastTransition.current = false;
      return;
    }
    lastTransition.current = true;
    const { progress, outgoing, incoming } = transitionSamples(p, transition);
    const renderView = (sample: number, target: WebGLRenderTarget) => {
      sampleCamera(sample, resources.position, resources.target, mobile);
      frameCamera(
        resources.viewCamera,
        resources.position,
        resources.target,
        mobile,
        size.width / size.height,
      );
      sampleScene(sample);
      gl.setRenderTarget(target);
      gl.clear();
      gl.render(scene, resources.viewCamera);
    };
    const previousTarget = gl.getRenderTarget();
    try {
      renderView(outgoing, resources.from);
      renderView(incoming, resources.to);
      const uniforms = resources.material.uniforms;
      uniforms.uProgress.value = progress;
      uniforms.uScroll.value = p;
      uniforms.uCenter.value.set(transition.center[0], transition.center[1]);
      gl.setRenderTarget(null);
      gl.render(resources.scene, resources.screenCamera);
    } finally {
      sampleScene(p);
      gl.setRenderTarget(previousTarget);
    }
  }, 1);
  return null;
}
