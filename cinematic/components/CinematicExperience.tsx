"use client";
import {
  Component,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import Navigation from "./Navigation";
import ScrollProgress from "./ScrollProgress";
import ScrollDirector from "./ScrollDirector";
import ReservationActions from "./ReservationActions";
import MobileGateway from "./MobileGateway";
import {
  anchors,
  asset,
  BOOKING,
  FOOD_MENU,
  HOME,
  DIRECTIONS,
  RIJSTTAFEL_PRICE,
  menuSelection,
} from "@/lib/content";
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });
class CanvasBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.error ? null : this.props.children;
  }
}
function Photo({ name, alt }: { name: string; alt: string }) {
  return (
    <img
      className="static-photo"
      src={asset(name)}
      alt={alt}
      loading="lazy"
      width={550}
      height={440}
    />
  );
}
export default function CinematicExperience() {
  const [mobile, setMobile] = useState(false);
  const [staticMode, setStaticMode] = useState(true);
  const [chapter, setChapter] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const readingPreference = useRef(false);
  const pendingSection = useRef<string | null>(null);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let supported = false;
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2");
      supported = !!gl;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {}
    try {
      readingPreference.current =
        sessionStorage.getItem("bali-reading") === "true";
    } catch {}
    setFailed(!supported);
    setCanAnimate(supported && !media.matches);
    setStaticMode(readingPreference.current || media.matches || !supported);
    const change = () => {
      setCanAnimate(supported && !media.matches);
      setStaticMode(readingPreference.current || media.matches || !supported);
    };
    media.addEventListener("change", change);
    return () => {
      media.removeEventListener("change", change);
    };
  }, []);
  useEffect(() => {
    if (staticMode) setReady(false);
  }, [staticMode]);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => {
    const active =
      document.querySelector<HTMLElement>(".experience")?.dataset.chapter;
    pendingSection.current =
      anchors[Math.min(5, Math.max(0, Number(active) || 0))];
    setFailed(true);
    setCanAnimate(false);
    setStaticMode(true);
  }, []);
  useEffect(() => {
    if (staticMode || ready || mobile) return;
    const timer = setTimeout(onFailure, 15000);
    return () => clearTimeout(timer);
  }, [staticMode, ready, mobile, onFailure]);
  const onChapter = useCallback((n: number) => setChapter(n), []);
  const onModeChange = () => {
    if (mobile) {
      readingPreference.current = !staticMode;
      try {
        sessionStorage.setItem("bali-reading", String(!staticMode));
      } catch {}
      setStaticMode(!staticMode);
      return;
    }
    const current = staticMode
      ? anchors.find((id) => {
          const rect = document.getElementById(id)?.getBoundingClientRect();
          return rect && rect.bottom > 100;
        }) || anchors[0]
      : anchors[chapter];
    pendingSection.current = current;
    readingPreference.current = !staticMode;
    try {
      sessionStorage.setItem("bali-reading", String(!staticMode));
    } catch {}
    setStaticMode(!staticMode);
  };
  useEffect(() => {
    if (!pendingSection.current) return;
    const id = pendingSection.current;
    const frame = requestAnimationFrame(() => {
      const destination = document.getElementById(id);
      destination?.scrollIntoView({ behavior: "instant", block: "start" });
      if (staticMode) destination?.focus({ preventScroll: true });
      else
        document
          .querySelector<HTMLButtonElement>(".menu-toggle")
          ?.focus({ preventScroll: true });
      history.replaceState(null, "", `#${id}`);
      pendingSection.current = null;
    });
    return () => cancelAnimationFrame(frame);
  }, [staticMode]);
  return (
    <div
      className={`experience ${staticMode ? "static-mode" : "cinematic-mode"} ${ready ? "is-ready" : ""}`}
      data-chapter={chapter}
    >
      <Navigation
        staticMode={staticMode}
        canAnimate={canAnimate}
        onModeChange={onModeChange}
        mobile={mobile}
      />
      <ScrollDirector enabled={!staticMode && !mobile} onChapter={onChapter} />
      <main
        className="scroll-track"
        aria-label="A journey to the Indonesian table"
      >
        {!staticMode && !mobile && (
          <div className="anchor-track" aria-hidden="true">
            {anchors.map((id, i) => (
              <div
                className="chapter-anchor"
                id={id}
                key={id}
                style={{
                  top: `calc(var(--chapter-step) * ${i === 0 ? 0 : i + 0.28})`,
                }}
              />
            ))}
          </div>
        )}
        <div className="stage">
          {!staticMode && !mobile && (
            <>
              <div className="canvas-wrap" aria-hidden="true">
                <CanvasBoundary onFailure={onFailure}>
                  <SceneCanvas onReady={onReady} onFailure={onFailure} />
                </CanvasBoundary>
              </div>
              {!ready && (
                <div className="loading-scene">
                  <img
                    src={asset("gateway-opening.webp")}
                    alt=""
                    fetchPriority="high"
                  />
                  <span role="status">Opening the gateway…</span>
                </div>
              )}
              <div className="reading-shade" />
            </>
          )}
          <div className="scene-panels">
            <section
              className="scene-copy hero-scene"
              id={staticMode || mobile ? "first-taste" : undefined}
              tabIndex={-1}
              aria-labelledby="hero-title"
            >
              <p className="eyebrow hero-location">
                London's West End <span>·</span> Since 1986
              </p>
              <h1 id="hero-title">
                BALI BALI
                <span className="hero-script">a taste of Indonesia.</span>
              </h1>
              <MobileGateway enabled={mobile && !staticMode} />
              <div className="hero-bottom">
                <p className="small-caps">
                  150 SHAFTESBURY
                  <br />
                  AVENUE
                </p>
                <div>
                  <p className="intro">
                    A family-run Indonesian restaurant on Shaftesbury Avenue.
                    New to the food? We'll help you choose.
                  </p>
                  <ReservationActions className="hero-actions" />
                  <p className="booking-expectation">
                    We’ll reply to confirm your table.
                  </p>
                </div>
              </div>
              <div
                className="hero-seal"
                aria-label="Family-run, all meat halal"
              >
                <span>FAMILY-RUN</span>
                <span className="seal-flower">✳</span>
                <span>ALL MEAT HALAL</span>
              </div>
              {!mobile && (
                <Photo
                  name="sate.webp"
                  alt="Bali Bali's sate skewers with peanut sauce on a ceramic plate"
                />
              )}
            </section>
            <section
              className="scene-copy table-scene"
              id={staticMode || mobile ? "the-table" : undefined}
              tabIndex={-1}
              aria-labelledby="table-title"
            >
              <p className="eyebrow">02 / The food</p>
              <h2 id="table-title">
                Start with <em>sate.</em>
              </h2>
              <p className="body-copy">
                Try grilled sate with rice, and ask for sambal if you'd like
                more heat. We'll help you find your favourites.
              </p>
              <div className="dish-notes">
                {[menuSelection[0], menuSelection[2], menuSelection[3]].map(
                  (dish) => (
                    <span key={dish.name}>
                      <span>{dish.name}</span>
                      <strong>{dish.price}</strong>
                    </span>
                  ),
                )}
              </div>
              <p className="dietary">
                All meat is halal. Vegetarian dishes are available.
                <br />
                Please tell our team about allergies before ordering.
              </p>
              <a className="text-link" href={FOOD_MENU}>
                Menu & prices <span aria-hidden="true">→</span>
              </a>
              <Photo
                name={mobile ? "sate.webp" : "sharing.webp"}
                alt="Bali Bali's sate, rice, vegetables and sauces served together"
              />
            </section>
            <section
              className="scene-copy sharing-scene"
              id={staticMode || mobile ? "rijsttafel" : undefined}
              tabIndex={-1}
              aria-labelledby="sharing-title"
            >
              <p className="eyebrow">03 / Rijsttafel</p>
              <h2 id="sharing-title">
                A rice table
                <br />
                to <em>share.</em>
              </h2>
              <p className="body-copy">
                Rijsttafel means 'rice table': a selection of dishes served
                together.
              </p>
              <a className="text-link" href={FOOD_MENU}>
                Menu & prices <span aria-hidden="true">→</span>
              </a>
              <div className="sharing-note">
                <span className="small-caps">The Special Rijsttafel</span>
                <p>
                  Eight dishes to share. {RIJSTTAFEL_PRICE} per person, minimum
                  two people.
                  <br />
                  New to Indonesian food? Ask us about each dish.
                </p>
              </div>
              <Photo
                name="sharing.webp"
                alt="Several dishes arranged together on Bali Bali's wooden dining table"
              />
            </section>
            <section
              className="scene-copy heritage-scene"
              id={staticMode || mobile ? "our-story" : undefined}
              tabIndex={-1}
              aria-labelledby="heritage-title"
            >
              <p className="eyebrow">04 / Our story</p>
              <span className="heritage-year" aria-hidden="true">
                1986
              </span>
              <h2 id="heritage-title">
                Family-run
                <br />
                since <em>1986.</em>
              </h2>
              <p className="body-copy">
                We've served Indonesian food in London's West End since 1986.
              </p>
              <p className="heritage-detail">
                Whether you know your favourites or are trying Indonesian food
                for the first time, ask us what to order.
              </p>
              <Photo
                name="rendang.webp"
                alt="Bali Bali's beef in a dark sauce, served on a wooden table"
              />
            </section>
            <section
              className="scene-copy evening-scene"
              id={staticMode || mobile ? "west-end" : undefined}
              tabIndex={-1}
              aria-labelledby="evening-title"
            >
              <p className="eyebrow">05 / Pre-theatre dining</p>
              <h2 id="evening-title">
                Before the
                <br />
                <em>curtain rises.</em>
              </h2>
              <p className="body-copy">
                Eating before a show? Include your show time in your booking
                request. We’ll reply to confirm your table.
              </p>
              <a
                className="button"
                href={BOOKING}
                target="_blank"
                rel="noreferrer"
              >
                Book a table <span aria-hidden="true">↗</span>
              </a>
              <div className="address-art">
                <span className="street-number">150</span>
                <span className="street-name">
                  SHAFTESBURY
                  <br />
                  AVENUE
                </span>
                <span className="postcode">LONDON WC2H 8HL</span>
                <div className="location-rule" />
                <span className="small-caps">
                  LEICESTER SQUARE · COVENT GARDEN
                </span>
                <a
                  className="text-link"
                  href={DIRECTIONS}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions <span aria-hidden="true">↗</span>
                </a>
              </div>
            </section>
            <section
              className="scene-copy booking-scene"
              id={staticMode || mobile ? "visit" : undefined}
              tabIndex={-1}
              aria-labelledby="booking-title"
            >
              <p className="eyebrow">06 / Visit and booking</p>
              <h2 id="booking-title">
                Join us on
                <br />
                <em>Shaftesbury Avenue.</em>
              </h2>
              <p className="body-copy">
                Send a booking request. We’ll reply to confirm your table. Tell
                us about any allergies or theatre plans.
              </p>
              <ReservationActions className="booking-actions" />
              <div className="visit-details">
                <div>
                  <h3>Find us</h3>
                  <address>
                    150 Shaftesbury Avenue
                    <br />
                    London WC2H 8HL
                  </address>
                  <a href={DIRECTIONS} target="_blank" rel="noreferrer">
                    Get directions <span aria-hidden="true">↗</span>
                  </a>
                  <a href="tel:+442078362644">Call +44 20 7836 2644</a>
                </div>
                <div>
                  <h3>Opening hours</h3>
                  <dl>
                    <div>
                      <dt>Mon to Thu</dt>
                      <dd>12:00 to 22:00</dd>
                    </div>
                    <div>
                      <dt>Friday</dt>
                      <dd>12:00 to 22:45</dd>
                    </div>
                    <div>
                      <dt>Saturday</dt>
                      <dd>12:00 to 23:00</dd>
                    </div>
                    <div>
                      <dt>Sunday</dt>
                      <dd>13:00 to 21:30</dd>
                    </div>
                  </dl>
                  <small>
                    The kitchen closes around 30 minutes before the restaurant.
                  </small>
                </div>
              </div>
              <p className="group-note">
                For groups of 6 to 50,{" "}
                <a href="tel:+442078362644">call us to discuss your booking.</a>
              </p>
              <footer>
                <span>© 2026 BALI BALI · ALL MEAT HALAL</span>
                <a href={`${HOME}credits/`}>3D asset credits</a>
                <a
                  href="https://www.balibalirestaurant.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Restaurant website ↗
                </a>
              </footer>
              {!mobile && (
                <Photo
                  name="sharing.webp"
                  alt="An Indonesian meal to share at Bali Bali"
                />
              )}
            </section>
          </div>
        </div>
      </main>
      {!staticMode && !mobile && <ScrollProgress chapter={chapter} />}
      {failed && !mobile && (
        <div className="fallback-notice" role="status">
          Showing the photo version because animation is unavailable.
        </div>
      )}
    </div>
  );
}
