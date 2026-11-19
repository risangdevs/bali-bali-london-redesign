"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/content";
import { fitGateway } from "@/lib/gateway-framing";

export default function MobileGateway({ enabled }: { enabled: boolean }) {
  const frame = useRef<HTMLElement>(null);
  const poster = useRef<HTMLImageElement>(null);
  const food = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);
  const [decoded, setDecoded] = useState(false);
  const [phase, setPhase] = useState<"idle" | "playing" | "complete">("idle");

  useEffect(() => {
    const element = frame.current!;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= 0.55),
      { threshold: 0.55 },
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
    let cancelled = false;
    Promise.all([poster.current!.decode(), food.current!.decode()])
      .then(() => {
        if (!cancelled) setDecoded(true);
      })
      .catch(() => {
        /* Keep the complete gateway if either image fails. */
      });
    return () => {
      cancelled = true;
      observer.disconnect();
      resize.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!enabled && phase === "playing") {
      setPhase("complete");
      return;
    }
    if (!enabled || !visible || !decoded || phase !== "idle") return;
    const timer = setTimeout(() => setPhase("playing"), 450);
    return () => clearTimeout(timer);
  }, [enabled, visible, decoded, phase]);

  return (
    <figure
      ref={frame}
      className={`mobile-gateway ${enabled ? `is-${phase}` : "is-static"}`}
      aria-label={
        enabled && phase === "complete"
          ? "Bali Bali's dishes arranged to share"
          : enabled && phase === "playing"
            ? "A Candi Bentar gateway fading into a photograph of Bali Bali's dishes"
            : "A rendering of a Candi Bentar gateway"
      }
    >
      <img
        ref={food}
        className="gateway-food"
        src={asset("sharing.webp")}
        alt=""
        width={550}
        height={440}
      />
      <img
        ref={poster}
        className="gateway-poster"
        src={asset("sculpture-gateway.webp")}
        alt=""
        width={600}
        height={600}
        fetchPriority="high"
        onAnimationEnd={(event) => {
          if (event.animationName === "gateway-dissolve") setPhase("complete");
        }}
      />
    </figure>
  );
}
