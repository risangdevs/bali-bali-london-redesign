import { BOOKING, MENU } from "@/lib/content";

/** Booking links are ordinary anchors, independent of canvas/scroll state. */
export default function ReservationActions({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`reservation-actions ${className}`}>
      <a className="button" href={BOOKING} target="_blank" rel="noreferrer">
        Book a Table <span aria-hidden="true">↗</span>
      </a>
      <a
        className="button button-secondary"
        href={MENU}
        target="_blank"
        rel="noreferrer"
      >
        View Menu <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
