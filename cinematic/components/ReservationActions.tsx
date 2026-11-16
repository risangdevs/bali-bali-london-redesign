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
        Request a table <span aria-hidden="true">↗</span>
      </a>
      <a className="button button-secondary" href={FOOD_MENU}>
        View menu & prices <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
