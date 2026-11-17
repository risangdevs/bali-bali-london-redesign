import type { Metadata } from "next";
import {
  BOOKING,
  HOME,
  MENU,
  RIJSTTAFEL_PRICE,
  menuSelection,
} from "@/lib/content";

export const metadata: Metadata = { title: "Menu & prices | Bali Bali" };

export default function MenuPage() {
  return (
    <main className="menu-page">
      <nav aria-label="Menu navigation">
        <a className="text-link" href={HOME}>
          ← Back to Bali Bali
        </a>
        <a className="text-link" href={`${HOME}#visit`}>
          Hours & directions
        </a>
      </nav>
      <header>
        <p className="eyebrow">Bali Bali · Indonesian restaurant</p>
        <h1>A taste of the menu.</h1>
        <p>
          A selection to help you choose. For every dish and our full terms,{" "}
          <a href={MENU}>view the full menu (PDF)</a>.
        </p>
        <p>
          All meat is halal. Please tell our team about allergies before
          ordering.
        </p>
      </header>
      <section aria-labelledby="selection-title">
        <h2 id="selection-title">Start here</h2>
        <ul className="menu-selection">
          {menuSelection.map((dish) => (
            <li key={dish.name}>
              <div>
                <h3>{dish.name}</h3>
                <span>{dish.price}</span>
              </div>
              <p>{dish.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="menu-rice-table" aria-labelledby="rice-table-title">
        <p className="eyebrow">For two or more</p>
        <h2 id="rice-table-title">The Special Rijsttafel</h2>
        <p>Eight seasonal dishes served together as a rice table.</p>
        <p className="menu-price">
          {RIJSTTAFEL_PRICE} per person · minimum two people
        </p>
      </section>
      <aside className="menu-terms" aria-label="Prices and booking information">
        <p>
          Prices include VAT; service charge is extra. After 6pm, the minimum
          food spend is £13.50 per person. Card payments have a £10 minimum.
        </p>
        <p>
          During busy periods and weekends, bookings are limited to 90 minutes.
        </p>
        <p>
          Prices checked against the restaurant’s 2026 menu on 16 November 2026.
        </p>
      </aside>
      <div className="menu-booking">
        <a className="button" href={BOOKING} target="_blank" rel="noreferrer">
          Book a table ↗
        </a>
        <p>
          We’ll reply to confirm your table. For a same-day visit,{" "}
          <a href="tel:+442078362644">call +44 20 7836 2644</a>.
        </p>
      </div>
    </main>
  );
}
