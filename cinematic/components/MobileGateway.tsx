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
import { fitGateway, sampleMobileGateway } from "@/lib/gateway-framing";
import type { GatewayMotion } from "./GatewayCanvas";
const GatewayCanvas = dynamic(() => import("./GatewayCanvas"), { ssr: false });

class GatewayBoundary extends Component<
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

export default function MobileGateway({ enabled }: { enabled: boolean }) {
  const frame = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const motion = useRef<GatewayMotion>({ progress: 0 });
  const [near, setNear] = useState(false),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => {
    setReady(false);
    setFailed(true);
  }, []);
  useEffect(() => {
    const element = frame.current!;
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "300px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = frame.current!,
      viewport = stage.current!,
      rail = track.current!;
    const hero = element.closest<HTMLElement>(".hero-scene")!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const { width, height } = viewport.getBoundingClientRect();
      if (!width || !height) return;
      const pinnedTop = parseFloat(getComputedStyle(viewport).top) || 76;
      const travel = rail.getBoundingClientRect().height - height;
      const progress =
        enabled && !failed && travel > 0
          ? Math.max(
              0,
              Math.min(
                1,
                (pinnedTop - rail.getBoundingClientRect().top) / travel,
              ),
            )
          : 0;
      motion.current.progress = progress;
      const view = sampleMobileGateway(progress, width / height);
      element.style.setProperty(
        "--gateway-poster-size",
        `${(height * fitGateway(1, 0.76).distance) / fitGateway(width / height).distance}px`,
      );
      element.style.setProperty(
        "--gateway-photo-opacity",
        String(view.photoOpacity),
      );
      element.style.setProperty(
        "--gateway-poster-opacity",
        String(1 - view.photoOpacity),
      );
      hero.style.setProperty(
        "--gateway-intro-opacity",
        String(view.introOpacity),
      );
      if (near) motion.current.invalidate?.();
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(request);
    resize.observe(rail);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
      hero.style.removeProperty("--gateway-intro-opacity");
    };
  }, [enabled, failed, near]);
  useEffect(() => {
    if (!enabled || !near) setReady(false);
  }, [enabled, near]);
  return (
    <figure
      ref={frame}
      className={`mobile-gateway ${enabled && !failed ? "has-transition" : ""}`}
      aria-label="Candi Bentar gateway opening onto Bali Bali's sharing dishes"
    >
      <div className="gateway-track" ref={track}>
        <div className="gateway-stage" ref={stage}>
          <img
            className="gateway-food"
            src={asset("sharing.webp")}
            alt=""
            width={550}
            height={440}
          />
          <img
            className={`gateway-poster ${ready ? "is-replaced" : ""}`}
            src={asset("sculpture-gateway.webp")}
            alt=""
            width={600}
            height={600}
            fetchPriority="high"
          />
          {enabled && near && !failed && (
            <div className={`gateway-canvas ${ready ? "is-loaded" : ""}`}>
              <GatewayBoundary onFailure={onFailure}>
                <GatewayCanvas
                  onReady={onReady}
                  onFailure={onFailure}
                  motion={motion.current}
                />
              </GatewayBoundary>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}
