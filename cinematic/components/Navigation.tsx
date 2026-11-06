"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BOOKING, MENU } from "@/lib/content";
import ReservationActions from "./ReservationActions";
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  return (
    <>
      <a className="skip-link" href="#visit">
        Skip to visit & booking
      </a>
      <header className="navigation flex items-center justify-between">
        <a
          href="#first-taste"
          className="wordmark"
          aria-label="Bali Bali, back to the first taste"
        >
          bali bali<span>INDONESIAN RESTAURANT</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href={MENU} target="_blank" rel="noreferrer">
            View Menu ↗
          </a>
          <a href="#rijsttafel">Rijsttafel</a>
          <a href="#our-story">Our story</a>
          <a href="#west-end">Visit us</a>
        </nav>
        <div className="nav-actions">
          <a
            className="button book-button"
            href={BOOKING}
            target="_blank"
            rel="noreferrer"
          >
            Book a Table <span aria-hidden="true">↗</span>
          </a>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="mobile-nav"
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          >
            {[
              ["View Menu ↗", MENU],
              ["Rijsttafel", "#rijsttafel"],
              ["Our story", "#our-story"],
              ["Visit us", "#visit"],
            ].map(([name, href]) => (
              <a key={name} href={href} onClick={() => setOpen(false)}>
                {name}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      <nav className="mobile-booking-bar" aria-label="Quick booking and menu">
        <ReservationActions />
      </nav>
    </>
  );
}
