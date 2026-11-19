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
import { fitGateway } from "@/lib/gateway-framing";
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
    const observer = new IntersectionObserver(([entry]) =>
      setNear(entry.isIntersecting),
    );
    observer.observe(element);
    const resize = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      element.style.setProperty(
        "--gateway-poster-size",
        `${(height * fitGateway(1, 0.76).distance) / fitGateway(width / height).distance}px`,
      );
    });
    resize.observe(element);
    return () => {
      observer.disconnect();
      resize.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!enabled || !near) setReady(false);
  }, [enabled, near]);
  return (
    <figure
      ref={frame}
      className="mobile-gateway"
      aria-label="Candi Bentar, a Balinese split gateway"
    >
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
            <GatewayCanvas onReady={onReady} onFailure={onFailure} />
          </GatewayBoundary>
        </div>
      )}
    </figure>
  );
}
