"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { journey } from "@/lib/journey";
gsap.registerPlugin(ScrollTrigger);

export default function ScrollDirector({
  enabled,
  onChapter,
}: {
  enabled: boolean;
  onChapter: (n: number) => void;
}) {
  useLayoutEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      allowNestedScroll: true,
      anchors: { offset: 0 },
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    gsap.ticker.add(tick);
    const root = document.querySelector<HTMLElement>(".experience")!;
    const panels = gsap.utils.toArray<HTMLElement>(".scene-copy");
    const progress = document.querySelector<HTMLElement>(".progress-fill");
    let previous = -1;
    const update = () => {
      const p = journey.progress;
      const chapter = Math.min(5, Math.floor(p * 6));
      if (chapter !== previous) {
        previous = chapter;
        onChapter(chapter);
      }
      if (progress) progress.style.transform = `scaleX(${p})`;
      panels.forEach((panel, i) => {
        const local = p * 6 - i;
        const opacity =
          i === 0
            ? 1 - gsap.utils.clamp(0, 1, (local - 0.55) / 0.36)
            : Math.min(
                gsap.utils.clamp(0, 1, (local + 0.08) / 0.22),
                i === 5 ? 1 : 1 - gsap.utils.clamp(0, 1, (local - 0.72) / 0.25),
              );
        gsap.set(panel, {
          opacity,
          y: (1 - opacity) * (local < 0.3 ? 22 : -16),
        });
        panel.style.pointerEvents = opacity > 0.8 ? "auto" : "none";
        panel.inert = opacity < 0.8;
        panel.setAttribute("aria-hidden", String(opacity < 0.8));
      });
      root.style.setProperty("--journey", String(p));
      journey.invalidate?.();
    };
    const tween = gsap.fromTo(
      journey,
      { progress: 0 },
      {
        progress: 1,
        ease: "none",
        onUpdate: update,
        scrollTrigger: {
          trigger: ".scroll-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      },
    );
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    update();
    ScrollTrigger.refresh();
    if (location.hash) {
      const destination = document.getElementById(location.hash.slice(1));
      if (destination) lenis.scrollTo(destination, { immediate: true });
    }
    return () => {
      window.removeEventListener("load", refresh);
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
      panels.forEach((panel) => {
        gsap.set(panel, { clearProps: "opacity,transform" });
        panel.inert = false;
        panel.removeAttribute("aria-hidden");
        panel.style.pointerEvents = "";
      });
    };
  }, [enabled, onChapter]);
  return null;
}
