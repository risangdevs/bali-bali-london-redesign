"use client";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { asset } from "@/lib/content";
import { smootherstep } from "@/lib/motion";
import {
  fitInterlude,
  interludeOpacity,
  type SculptureName,
} from "@/lib/interlude";
import modelBounds from "@/lib/sculpture-bounds.json";
import type { InterludeMotion } from "./SculptureCanvas";
const SculptureCanvas = dynamic(() => import("./SculptureCanvas"), {
  ssr: false,
});
const labels: Record<SculptureName, string> = {
  gateway: "Candi Bentar",
  penjor: "Balinese Penjor",
  foliage: "Carved foliage",
  jepun: "Jepun",
};
class ModelBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function SculptureInterlude({
  symbol,
  enabled,
  hero = false,
}: {
  symbol: SculptureName;
  enabled: boolean;
  hero?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null),
    frame = useRef<HTMLDivElement>(null),
    layer = useRef<HTMLDivElement>(null);
  const motion = useRef<InterludeMotion>({ progress: 0 });
  const [near, setNear] = useState(hero),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []),
    onFailure = useCallback(() => {
      setReady(false);
      setFailed(true);
    }, []);
  useEffect(() => {
    if (!track.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "400px 0px" },
    );
    observer.observe(track.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!near || !enabled) setReady(false);
  }, [near, enabled]);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!track.current || !frame.current || !layer.current) return;
      const viewport = frame.current.getBoundingClientRect(),
        rect = track.current.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(frame.current).top) || 0;
      const travel = Math.max(1, rect.height - viewport.height);
      const p = enabled
        ? Math.max(0, Math.min(1, (top - rect.top) / travel))
        : 0;
      motion.current.progress = p;
      const posterSize =
        (viewport.height * fitInterlude(modelBounds[symbol], 1).distance) /
        fitInterlude(modelBounds[symbol], viewport.width / viewport.height)
          .distance;
      frame.current.style.setProperty("--poster-size", `${posterSize}px`);
      const bottom = window.innerHeight - (window.innerWidth < 768 ? 84 : 0);
      const ratio =
        Math.max(
          0,
          Math.min(viewport.bottom, bottom) - Math.max(viewport.top, top),
        ) / Math.max(1, viewport.height);
      const entry = enabled ? smootherstep((ratio - 0.3) / 0.55) : 1;
      layer.current.style.opacity = String(entry * interludeOpacity(p));
      motion.current.invalidate?.();
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    const observer = new ResizeObserver(request);
    if (track.current) observer.observe(track.current);
    update();
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [enabled, near, symbol]);
  return (
    <figure
      className={`sculpture-interlude ${hero ? "gateway-interlude" : ""} ${enabled ? "has-motion" : ""}`}
      data-sculpture={symbol}
      aria-label={labels[symbol]}
    >
      <div className="interlude-track" ref={track}>
        <div className="interlude-viewport" ref={frame}>
          <div className="interlude-layer" ref={layer}>
            <img
              className={`model-poster ${ready ? "is-replaced" : ""}`}
              src={asset(`sculpture-${symbol}.webp`)}
              alt=""
              width={600}
              height={600}
              loading={hero ? "eager" : "lazy"}
              fetchPriority={hero ? "high" : "auto"}
            />
            {enabled && near && !failed && (
              <div className={`interlude-canvas ${ready ? "is-loaded" : ""}`}>
                <ModelBoundary onFailure={onFailure}>
                  <SculptureCanvas
                    symbol={symbol}
                    motion={motion.current}
                    onReady={onReady}
                    onFailure={onFailure}
                  />
                </ModelBoundary>
              </div>
            )}
          </div>
        </div>
      </div>
      <figcaption>
        {labels[symbol]}
        <span aria-hidden="true">{enabled ? "↓" : "✳"}</span>
      </figcaption>
    </figure>
  );
}
