"use client";
import { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import { anchors } from "@/lib/content";
import { navigationDuration, smootherstep } from "@/lib/motion";
export default function PageDirector({
  animated,
  onChapter,
}: {
  animated: boolean;
  onChapter: (chapter: number) => void;
}) {
  const initialized = useRef(false);
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".editorial-mode")!;
    const sections = anchors.map((id) => document.getElementById(id)!);
    const header = document.querySelector<HTMLElement>(".floating-navigation");
    const lenis = animated
      ? new Lenis({
          duration: 1.05,
          smoothWheel: true,
          syncTouch: false,
          anchors: false,
        })
      : null;
    let running = true,
      raf = 0,
      scrollFrame = 0,
      previous = -1,
      token = 0,
      navigating = false;
    const originalRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const update = () => {
      scrollFrame = 0;
      const limit = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      root.style.setProperty(
        "--page-progress",
        String(Math.max(0, Math.min(1, window.scrollY / limit))),
      );
      let chapter = 0;
      sections.forEach((section, i) => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.35)
          chapter = i;
      });
      if (chapter !== previous) {
        previous = chapter;
        onChapter(chapter);
      }
    };
    const schedule = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(update);
    };
    const tick = (time: number) => {
      lenis?.raf(time);
      if (running && lenis) raf = requestAnimationFrame(tick);
    };
    if (lenis) raf = requestAnimationFrame(tick);
    const finish = () => {
      token++;
      navigating = false;
      delete root.dataset.navigating;
    };
    const navigate = (
      destination: HTMLElement,
      hash: string,
      push = true,
      immediate = false,
    ) => {
      finish();
      const current = token;
      const offset = (header?.getBoundingClientRect().height || 72) + 20;
      const target = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          destination.getBoundingClientRect().top + window.scrollY - offset,
        ),
      );
      if (push && location.hash !== hash) history.pushState(null, "", hash);
      const arrived = () => {
        if (current !== token) return;
        finish();
        destination.focus({ preventScroll: true });
        schedule();
      };
      if (lenis && !immediate) {
        navigating = true;
        root.dataset.navigating = "true";
        lenis.scrollTo(target, {
          duration: navigationDuration(
            target - window.scrollY,
            window.innerHeight,
          ),
          easing: smootherstep,
          lock: false,
          onComplete: arrived,
        });
      } else {
        window.scrollTo({ top: target, behavior: "instant" });
        lenis?.scrollTo(target, { immediate: true });
        arrived();
      }
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
    const pop = () => {
      const hash = location.hash || "#first-taste";
      const destination = document.getElementById(hash.slice(1));
      if (destination) navigate(destination, hash, false);
    };
    const interrupt = () => {
      if (!navigating) return;
      finish();
      lenis?.scrollTo(lenis.animatedScroll, { immediate: true });
    };
    const key = (event: KeyboardEvent) => {
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
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("click", click);
    window.addEventListener("popstate", pop);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("keydown", key);
    const initialNavigation = !initialized.current;
    initialized.current = true;
    const initial = requestAnimationFrame(() => {
      const destination = location.hash
        ? document.getElementById(decodeURIComponent(location.hash.slice(1)))
        : null;
      if (destination && initialNavigation)
        navigate(destination, location.hash, false, true);
      update();
    });
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(initial);
      lenis?.destroy();
      finish();
      history.scrollRestoration = originalRestoration;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("click", click);
      window.removeEventListener("popstate", pop);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", key);
    };
  }, [animated, onChapter]);
  return null;
}
