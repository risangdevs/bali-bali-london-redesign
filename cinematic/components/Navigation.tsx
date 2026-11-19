"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BOOKING, FOOD_MENU } from "@/lib/content";
import ReservationActions from "./ReservationActions";

export default function Navigation({
  staticMode,
  canAnimate,
  onModeChange,
  mobile = false,
}: {
  staticMode: boolean;
  canAnimate: boolean;
  onModeChange: () => void;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const disclosure = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!disclosure.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus({ preventScroll: true });
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#visit">
        Skip to visit & booking
      </a>
      <div className="floating-navigation">
        <div className="navigation-tools">
          <div
            className="menu-disclosure"
            ref={disclosure}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setOpen(false);
            }}
          >
            <button
              ref={toggle}
              className="menu-toggle"
              aria-label={open ? "Close navigation" : "Explore"}
              aria-expanded={open}
              aria-controls="site-navigation"
              onClick={() => setOpen(!open)}
            >
              <span aria-hidden="true">{open ? "×" : "+"}</span>
              {open ? "Close" : "Explore"}
            </button>
            {open && (
              <motion.nav
                id="site-navigation"
                aria-label="Main navigation"
                className="navigation-panel"
                initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.18 }}
              >
                {[
                  ["First taste", "#first-taste"],
                  ["The food", "#the-table"],
                  ["Rijsttafel", "#rijsttafel"],
                  ["Our story", "#our-story"],
                  ["Pre-theatre", "#west-end"],
                  ["Hours & directions", "#visit"],
                  ["Menu & prices", FOOD_MENU],
                  ["Call the restaurant", "tel:+442078362644"],
                ].map(([name, href]) => (
                  <a
                    key={name}
                    href={href}
                    onClick={() => {
                      setOpen(false);
                      toggle.current?.focus({ preventScroll: true });
                    }}
                  >
                    {name}
                  </a>
                ))}
                {canAnimate && (
                  <button
                    className="reading-toggle"
                    onClick={() => {
                      setOpen(false);
                      onModeChange();
                    }}
                  >
                    {mobile
                      ? staticMode
                        ? "Animate the gateway"
                        : "Keep the gateway still"
                      : staticMode
                        ? "Use the animated view"
                        : "Use the photo view"}
                  </button>
                )}
              </motion.nav>
            )}
          </div>
          <a
            className="utility-link"
            href="#visit"
            aria-label="Hours & directions"
          >
            <span className="navigation-label-long">Hours & directions</span>
            <span className="navigation-label-short">Visit</span>
          </a>
          <a className="utility-link" href="tel:+442078362644">
            Call
          </a>
        </div>
        <a
          className="button floating-booking"
          href={BOOKING}
          target="_blank"
          rel="noreferrer"
        >
          Book a table <span aria-hidden="true">↗</span>
        </a>
      </div>
      <nav className="mobile-booking-bar" aria-label="Quick booking and menu">
        <ReservationActions />
      </nav>
    </>
  );
}
