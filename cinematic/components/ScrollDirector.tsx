"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { smootherstep, navigationDuration } from "@/lib/motion";
import { smooth } from "@/lib/effects";
import { anchors } from "@/lib/content";
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
      duration: window.innerWidth < 768 ? 0.8 : 1.15,
      smoothWheel: true,
      syncTouch: false,
      allowNestedScroll: true,
      anchors: false,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    gsap.ticker.add(tick);
    const root = document.querySelector<HTMLElement>(".experience")!;
    const panels = gsap.utils.toArray<HTMLElement>(".scene-copy");
    const progress = document.querySelector<HTMLElement>(".progress-fill");
    const panelContainer =
      document.querySelector<HTMLElement>(".scene-panels")!;
    const scrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    let navigation = 0;
    let navigationActive = false;
    const finishNavigation = () => {
      navigation++;
      navigationActive = false;
      delete root.dataset.navigating;
      panelContainer.inert = false;
    };
    const navigate = (destination: HTMLElement, hash: string, push = true) => {
      const target = Math.max(
        0,
        Math.min(
          lenis.limit,
          destination.getBoundingClientRect().top + window.scrollY,
        ),
      );
      const distance = target - lenis.animatedScroll;
      finishNavigation();
      const token = navigation;
      navigationActive = true;
      journey.prepare?.(target / Math.max(1, lenis.limit));
      if (Math.abs(distance) > window.innerHeight * 0.35) {
        root.dataset.navigating = "true";
        panelContainer.inert = true;
      }
      if (push && location.hash !== hash) history.pushState(null, "", hash);
      lenis.scrollTo(target, {
        duration: navigationDuration(distance, window.innerHeight),
        easing: smootherstep,
        lock: false,
        onComplete: () => {
          if (navigation !== token) return;
          finishNavigation();
          const index = anchors.indexOf(hash.slice(1));
          if (index >= 0) panels[index]?.focus({ preventScroll: true });
        },
      });
    };
    const click = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (!link || link.target === "_blank" || link.hasAttribute("download"))
        return;
      const url = new URL(link.href, location.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;
      const destination = document.getElementById(
        decodeURIComponent(url.hash.slice(1)),
      );
      if (!destination) return;
      event.preventDefault();
      navigate(destination, url.hash);
    };
    const popstate = () => {
      const hash = location.hash || "#first-taste";
      const destination = document.getElementById(hash.slice(1));
      if (destination) navigate(destination, hash, false);
    };
    const interrupt = () => {
      if (!navigationActive) return;
      finishNavigation();
      lenis.scrollTo(lenis.animatedScroll, { immediate: true });
    };
    const keydown = (event: KeyboardEvent) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
          "Escape",
          "Tab",
        ].includes(event.key)
      )
        interrupt();
    };
    document.addEventListener("click", click);
    window.addEventListener("popstate", popstate);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("keydown", keydown);
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
        // Separate entrance/exit envelopes prevent two paragraphs ghosting together.
        const opacity =
          i === 0
            ? 1 - smooth(0.55, 0.94, local)
            : smooth(0.02, 0.25, local) *
              (i === 5 ? 1 : 1 - smooth(0.69, 0.98, local));
        gsap.set(panel, {
          opacity,
          y: (1 - opacity) * (local < 0.3 ? 22 : -16),
        });
        panel.style.pointerEvents = opacity > 0.8 ? "auto" : "none";
        panel.inert = opacity < 0.8;
        panel.setAttribute("aria-hidden", String(opacity < 0.8));
      });
      root.style.setProperty("--journey", String(p));
      root.style.setProperty("--entry-shade", String(smooth(0.07, 0.18, p)));
      root.style.setProperty(
        "--table-shade",
        String(smooth(0.29, 0.36, p) * (1 - smooth(0.47, 0.54, p))),
      );
      root.style.setProperty("--booking-shade", String(smooth(0.79, 0.9, p)));
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
          scrub: true,
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
      finishNavigation();
      history.scrollRestoration = scrollRestoration;
      document.removeEventListener("click", click);
      window.removeEventListener("popstate", popstate);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", keydown);
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
