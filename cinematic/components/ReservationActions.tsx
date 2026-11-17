import { BOOKING, FOOD_MENU } from "@/lib/content";

/** Booking links are ordinary anchors, independent of canvas/scroll state. */
export default function ReservationActions({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`reservation-actions ${className}`}>
      <a className="button" href={BOOKING} target="_blank" rel="noreferrer">
        Book a table <span aria-hidden="true">↗</span>
      </a>
      <a className="button button-secondary" href={FOOD_MENU}>
        View menu <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
