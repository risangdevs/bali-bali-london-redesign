"use client";
import { Component, ReactNode, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navigation from "./Navigation";
import ScrollProgress from "./ScrollProgress";
import ScrollDirector from "./ScrollDirector";
import ReservationActions from "./ReservationActions";
import { anchors, asset, BOOKING, MENU, DIRECTIONS } from "@/lib/content";
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
  const [staticMode, setStaticMode] = useState(true);
  const [chapter, setChapter] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let supported = false;
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2");
      supported = !!gl;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {}
    setFailed(!supported);
    setStaticMode(media.matches || !supported);
    const change = () => setStaticMode(media.matches || !supported);
    media.addEventListener("change", change);
    return () => {
      media.removeEventListener("change", change);
    };
  }, []);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => {
    setFailed(true);
    setStaticMode(true);
  }, []);
  useEffect(() => {
    if (staticMode || ready) return;
    const timer = setTimeout(onFailure, 15000);
    return () => clearTimeout(timer);
  }, [staticMode, ready, onFailure]);
  const onChapter = useCallback((n: number) => setChapter(n), []);
  return (
    <div
      className={`experience ${staticMode ? "static-mode" : "cinematic-mode"} ${ready ? "is-ready" : ""}`}
      data-chapter={chapter}
    >
      <Navigation />
      <ScrollDirector enabled={!staticMode} onChapter={onChapter} />
      <main
        className="scroll-track"
        aria-label="A journey to the Indonesian table"
      >
        {!staticMode && (
          <div className="anchor-track" aria-hidden="true">
            {anchors.map((id, i) => (
              <div
                className="chapter-anchor"
                id={id}
                key={id}
                style={{ top: `${i === 0 ? 0 : i * 100 + 28}svh` }}
              />
            ))}
          </div>
        )}
        <div className="stage">
          {!staticMode && (
            <>
              <div className="canvas-wrap" aria-hidden="true">
                <CanvasBoundary onFailure={onFailure}>
                  <SceneCanvas onReady={onReady} onFailure={onFailure} />
                </CanvasBoundary>
              </div>
              {!ready && (
                <div className="loading-scene">
                  <img src={asset("sate.webp")} alt="" />
                  <span role="status">Setting the table…</span>
                </div>
              )}
              <div className="reading-shade" />
            </>
          )}
          <div className="scene-panels">
            <section
              className="scene-copy hero-scene"
              id={staticMode ? "first-taste" : undefined}
              aria-labelledby="hero-title"
            >
              <p className="eyebrow hero-location">
                LONDON’S WEST END <span>•</span> EST. 1986
              </p>
              <h1 id="hero-title">
                BALI BALI
                <span className="hero-script">a taste of Indonesia.</span>
              </h1>
              <div className="hero-bottom">
                <p className="small-caps">
                  AUTHENTIC INDONESIAN
                  <br />
                  DINING SINCE 1986
                </p>
                <div>
                  <p className="intro">
                    A little closer to Indonesia.
                    <br />
                    Right here in London.
                  </p>
                  <ReservationActions className="hero-actions" />
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
              <Photo
                name="sate.webp"
                alt="Bali Bali’s saté skewers with peanut sauce on a ceramic plate"
              />
            </section>
            <section
              className="scene-copy table-scene"
              id={staticMode ? "the-table" : undefined}
              aria-labelledby="table-title"
            >
              <p className="eyebrow">02 / THROUGH THE INDONESIAN TABLE</p>
              <h2 id="table-title">
                A little heat.
                <br />A lot of <em>heart.</em>
              </h2>
              <p className="body-copy">
                Grilled saté. Fragrant rice. A spoonful of sambal. Follow your
                curiosity — we’ll help you find your favourites.
              </p>
              <div className="dish-notes">
                <span>SATÉ / SMOKY & SAVOURY</span>
                <span>NASI GORENG / A GENTLE INTRODUCTION</span>
                <span>SAMBAL / HEAT ON THE SIDE</span>
              </div>
              <p className="dietary">
                All meat is halal. Vegetarian dishes available.
                <br />
                Please tell our team about allergies.
              </p>
              <a
                className="text-link"
                href={MENU}
                target="_blank"
                rel="noreferrer"
              >
                View Menu <span aria-hidden="true">↗</span>
              </a>
              <Photo
                name="sharing.webp"
                alt="A real Bali Bali spread of saté, rice, vegetables, sauces and other dishes"
              />
            </section>
            <section
              className="scene-copy sharing-scene"
              id={staticMode ? "rijsttafel" : undefined}
              aria-labelledby="sharing-title"
            >
              <p className="eyebrow">03 / THE ART OF SHARING</p>
              <h2 id="sharing-title">
                Good food is meant
                <br />
                to be <em>shared.</em>
              </h2>
              <p className="body-copy">
                Discover the richness of Indonesian flavours, served together at
                the table.
              </p>
              <a
                className="text-link"
                href={MENU}
                target="_blank"
                rel="noreferrer"
              >
                View Menu <span aria-hidden="true">↗</span>
              </a>
              <div className="sharing-note">
                <span className="small-caps">RIJSTTAFEL / THE RICE TABLE</span>
                <p>
                  A selection of dishes to explore together.
                  <br />
                  An inviting place to begin if you’re new to Indonesian food.
                </p>
              </div>
              <Photo
                name="sharing.webp"
                alt="Several dishes arranged together on Bali Bali’s wooden dining table"
              />
            </section>
            <section
              className="scene-copy heritage-scene"
              id={staticMode ? "our-story" : undefined}
              aria-labelledby="heritage-title"
            >
              <p className="eyebrow">04 / A SMALL RESTAURANT. A LONG STORY.</p>
              <span className="heritage-year" aria-hidden="true">
                1986
              </span>
              <h2 id="heritage-title">
                Rooted in
                <br />
                <em>tradition.</em>
              </h2>
              <p className="body-copy">
                Sharing Indonesian hospitality in London’s West End since 1986.
              </p>
              <p className="heritage-detail">
                Family-run and full of flavour. A place for familiar faces,
                first tastes and another dish for the table.
              </p>
              <span className="asset-note">
                FOOD FROM OUR TABLE · INTERIOR PORTRAIT TO FOLLOW
              </span>
              <Photo
                name="rendang.webp"
                alt="Bali Bali’s beef dish, photographed on the restaurant’s wooden table"
              />
            </section>
            <section
              className="scene-copy evening-scene"
              id={staticMode ? "west-end" : undefined}
              aria-labelledby="evening-title"
            >
              <p className="eyebrow">05 / YOUR EVENING IN THE WEST END</p>
              <h2 id="evening-title">
                Before the
                <br />
                <em>curtain rises.</em>
              </h2>
              <p className="body-copy">
                Make Bali Bali part of your West End evening. Tell us your
                theatre timing when you book.
              </p>
              <a
                className="button"
                href={BOOKING}
                target="_blank"
                rel="noreferrer"
              >
                Book a Table <span aria-hidden="true">↗</span>
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
                  Find us in London ↗
                </a>
              </div>
              <span className="asset-note">
                LOCATION STUDY · STREET PHOTOGRAPHY TO FOLLOW
              </span>
            </section>
            <section
              className="scene-copy booking-scene"
              id={staticMode ? "visit" : undefined}
              aria-labelledby="booking-title"
            >
              <p className="eyebrow">06 / COME TO THE TABLE</p>
              <h2 id="booking-title">
                There’s always room
                <br />
                at <em>our table.</em>
              </h2>
              <p className="body-copy">
                Discover the flavours and hospitality of Indonesia, right here
                in London.
              </p>
              <ReservationActions className="booking-actions" />
              <div className="visit-details">
                <div>
                  <h3>COME FIND US</h3>
                  <address>
                    150 Shaftesbury Avenue
                    <br />
                    London WC2H 8HL
                  </address>
                  <a href={DIRECTIONS} target="_blank" rel="noreferrer">
                    Get directions ↗
                  </a>
                  <a href="tel:+442078362644">+44 20 7836 2644</a>
                </div>
                <div>
                  <h3>TAKE YOUR TIME</h3>
                  <dl>
                    <div>
                      <dt>Mon–Thu</dt>
                      <dd>12:00–22:00</dd>
                    </div>
                    <div>
                      <dt>Friday</dt>
                      <dd>12:00–22:45</dd>
                    </div>
                    <div>
                      <dt>Saturday</dt>
                      <dd>12:00–23:00</dd>
                    </div>
                    <div>
                      <dt>Sunday</dt>
                      <dd>13:00–21:30</dd>
                    </div>
                  </dl>
                  <small>Kitchen closes around 30 minutes earlier.</small>
                </div>
              </div>
              <p className="group-note">
                A bigger table?{" "}
                <a href="tel:+442078362644">Ask us about groups of 6–50.</a>
              </p>
              <footer>
                <span>© 2026 BALI BALI · ALL MEAT HALAL</span>
                <a
                  href="https://www.balibalirestaurant.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Restaurant website ↗
                </a>
              </footer>
              <Photo
                name="sharing.webp"
                alt="An Indonesian meal to share at Bali Bali"
              />
            </section>
          </div>
        </div>
      </main>
      {!staticMode && <ScrollProgress chapter={chapter} />}
      {failed && (
        <div className="fallback-notice" role="status">
          Enjoy the photographic edition — motion is unavailable on this device.
        </div>
      )}
    </div>
  );
}
