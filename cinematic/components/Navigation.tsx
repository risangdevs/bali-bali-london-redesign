"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BOOKING, MENU } from "@/lib/content";
import ReservationActions from "./ReservationActions";

export default function Navigation() {
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
      toggle.current?.focus();
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
            aria-expanded={open}
            aria-controls="site-navigation"
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true">{open ? "×" : "+"}</span>
            {open ? "Close" : "Menu"}
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
                ["Visit us", "#visit"],
                ["View Menu ↗", MENU],
              ].map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target={href === MENU ? "_blank" : undefined}
                  rel={href === MENU ? "noreferrer" : undefined}
                  onClick={() => {
                    setOpen(false);
                    toggle.current?.focus();
                  }}
                >
                  {name}
                </a>
              ))}
            </motion.nav>
          )}
        </div>
        <a
          className="button floating-booking"
          href={BOOKING}
          target="_blank"
          rel="noreferrer"
        >
          Book a Table <span aria-hidden="true">↗</span>
        </a>
      </div>
      <nav className="mobile-booking-bar" aria-label="Quick booking and menu">
        <ReservationActions />
      </nav>
    </>
  );
}
