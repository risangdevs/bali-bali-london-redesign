"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/content";
import { fitGateway } from "@/lib/gateway-framing";
import { smootherstep } from "@/lib/motion";

export default function MobileGateway({ enabled }: { enabled: boolean }) {
  const frame = useRef<HTMLElement>(null);
  const poster = useRef<HTMLImageElement>(null);
  const food = useRef<HTMLImageElement>(null);
  const [decoded, setDecoded] = useState(false);
  const [phase, setPhase] = useState<"idle" | "playing" | "complete">("idle");

  useEffect(() => {
    const element = frame.current!;
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
      resize.disconnect();
    };
  }, []);

  useEffect(() => {
    const element = frame.current!;
    if (!enabled || !decoded) {
      element.style.setProperty("--gateway-progress", "0");
      setPhase("idle");
      return;
    }
    let raf = 0;
    let end = 120;
    let previous = -1;
    let previousPhase = "";
    const update = () => {
      raf = 0;
      // Dissolve while the complete visual is still below the fixed header.
      const progress = smootherstep((window.scrollY - 16) / (end - 16));
      if (progress === previous) return;
      previous = progress;
      element.style.setProperty("--gateway-progress", String(progress));
      const nextPhase =
        progress === 0 ? "idle" : progress === 1 ? "complete" : "playing";
      if (nextPhase !== previousPhase) {
        previousPhase = nextPhase;
        setPhase(nextPhase);
      }
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const measure = () => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      const header =
        document.querySelector(".floating-navigation")?.getBoundingClientRect()
          .height ?? 65;
      end = Math.max(120, top - header - 16);
      request();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    const hero = element.closest(".hero-scene");
    if (hero) resize.observe(hero);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, [enabled, decoded]);

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
      />
    </figure>
  );
}
