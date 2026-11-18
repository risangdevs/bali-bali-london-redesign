"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Navigation from "./Navigation";
import PageDirector from "./PageDirector";
import SculptureInterlude from "./SculptureInterlude";
import {
  asset,
  anchors,
  BOOKING,
  FOOD_MENU,
  HOME,
  DIRECTIONS,
  RIJSTTAFEL_PRICE,
  menuSelection,
} from "@/lib/content";
function Photo({
  name,
  alt,
  caption,
}: {
  name: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="editorial-photo">
      <img
        src={asset(name)}
        alt={alt}
        width={550}
        height={440}
        loading="lazy"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
function ReadingSection({
  id,
  number,
  title,
  photo,
  children,
}: {
  id: string;
  number: string;
  title: ReactNode;
  photo: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      className="editorial-section"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
    >
      <div className="editorial-grid">
        <header className="editorial-heading">
          <p className="eyebrow">{number}</p>
          <h2 id={`${id}-title`}>{title}</h2>
        </header>
        {photo}
        <div className="editorial-copy">{children}</div>
      </div>
    </section>
  );
}
export default function CinematicExperience() {
  const [motion, setMotion] = useState(false),
    [canAnimate, setCanAnimate] = useState(false),
    [preferencesReady, setPreferencesReady] = useState(false),
    [chapter, setChapter] = useState(0);
  const preference = useRef(false);
  const pendingView = useRef<{ id: string; offset: number } | null>(null);
  const captureView = () => {
    let current = document.getElementById(anchors[0])!;
    anchors.forEach((id) => {
      const section = document.getElementById(id)!;
      if (section.getBoundingClientRect().top < window.innerHeight * 0.35)
        current = section;
    });
    pendingView.current = {
      id: current.id,
      offset: current.getBoundingClientRect().top,
    };
  };
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let supported = false;
    try {
      const gl = document.createElement("canvas").getContext("webgl2");
      supported = !!gl;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {}
    try {
      preference.current = sessionStorage.getItem("bali-reading") === "true";
    } catch {}
    let initialized = false;
    const update = () => {
      if (initialized) captureView();
      initialized = true;
      setCanAnimate(supported && !media.matches);
      setMotion(supported && !media.matches && !preference.current);
      setPreferencesReady(true);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const onModeChange = () => {
    captureView();
    preference.current = motion;
    try {
      sessionStorage.setItem("bali-reading", String(motion));
    } catch {}
    setMotion(!motion);
  };
  useLayoutEffect(() => {
    if (!pendingView.current) return;
    const saved = pendingView.current;
    pendingView.current = null;
    const section = document.getElementById(saved.id);
    if (section)
      window.scrollBy({
        top: section.getBoundingClientRect().top - saved.offset,
        behavior: "instant",
      });
  }, [motion]);
  const onChapter = useCallback((n: number) => setChapter(n), []);
  return (
    <div
      className={`experience editorial-mode ${motion ? "motion-enabled" : "reading-edition"}`}
      data-chapter={chapter}
    >
      <Navigation
        staticMode={!motion}
        canAnimate={canAnimate}
        onModeChange={onModeChange}
        chapter={chapter}
      />
      {preferencesReady && (
        <PageDirector animated={motion} onChapter={onChapter} />
      )}
      <main aria-label="A journey to the Indonesian table">
        <section
          className="editorial-hero"
          id="first-taste"
          tabIndex={-1}
          aria-labelledby="hero-title"
        >
          <header>
            <p className="eyebrow">
              London's West End <span>·</span> Since 1986
            </p>
            <h1 id="hero-title">
              BALI BALI<span>a taste of Indonesia.</span>
            </h1>
          </header>
          <SculptureInterlude symbol="gateway" enabled={motion} hero />
          <div className="editorial-welcome">
            <p>
              A family-run Indonesian restaurant on Shaftesbury Avenue. New to
              the food? We'll help you choose.
            </p>
            <span className="small-caps">Family-run · All meat halal</span>
          </div>
        </section>
        <ReadingSection
          id="the-table"
          number="02 / The food"
          title={
            <>
              Start with <em>sate.</em>
            </>
          }
          photo={
            <Photo
              name="sate.webp"
              alt="Bali Bali's sate skewers with peanut sauce, cucumber and onions on a ceramic plate"
              caption="Sate, served with peanut sauce."
            />
          }
        >
          <p>
            Try grilled sate with rice, and ask for sambal if you'd like more
            heat. We'll help you find your favourites.
          </p>
          <div className="editorial-dishes">
            {[menuSelection[0], menuSelection[2], menuSelection[3]].map(
              (dish) => (
                <div key={dish.name}>
                  <span>{dish.name}</span>
                  <span>{dish.price}</span>
                </div>
              ),
            )}
          </div>
          <p className="editorial-dietary">
            All meat is halal. Vegetarian dishes are available. Please tell our
            team about allergies before ordering.
          </p>
          <a className="text-link" href={FOOD_MENU}>
            Menu & prices <span aria-hidden="true">→</span>
          </a>
        </ReadingSection>
        <SculptureInterlude symbol="penjor" enabled={motion} />
        <ReadingSection
          id="rijsttafel"
          number="03 / Rijsttafel"
          title={
            <>
              A rice table
              <br />
              to <em>share.</em>
            </>
          }
          photo={
            <Photo
              name="sharing.webp"
              alt="Several Indonesian dishes arranged together on Bali Bali's wooden dining table"
              caption="A table made for sharing."
            />
          }
        >
          <p>
            Rijsttafel means 'rice table': a selection of dishes served
            together.
          </p>
          <aside className="editorial-note">
            <h3>The Special Rijsttafel</h3>
            <p>
              Eight dishes to share. {RIJSTTAFEL_PRICE} per person, minimum two
              people.
            </p>
            <p>New to Indonesian food? Ask us about each dish.</p>
          </aside>
          <a className="text-link" href={FOOD_MENU}>
            Menu & prices <span aria-hidden="true">→</span>
          </a>
        </ReadingSection>
        <ReadingSection
          id="our-story"
          number="04 / Our story"
          title={
            <>
              Family-run
              <br />
              since <em>1986.</em>
            </>
          }
          photo={
            <Photo
              name="rendang.webp"
              alt="Bali Bali's beef in a dark sauce, served on a wooden table"
              caption="Indonesian favourites, since 1986."
            />
          }
        >
          <p>We've served Indonesian food in London's West End since 1986.</p>
          <p>
            Whether you know your favourites or are trying Indonesian food for
            the first time, ask us what to order.
          </p>
        </ReadingSection>
        <div className="editorial-garden" aria-label="A pause between chapters">
          <SculptureInterlude symbol="foliage" enabled={motion} />
          <SculptureInterlude symbol="jepun" enabled={motion} />
        </div>
        <ReadingSection
          id="west-end"
          number="05 / Pre-theatre dining"
          title={
            <>
              Before the
              <br />
              <em>curtain rises.</em>
            </>
          }
          photo={
            <Photo
              name="vegetables.webp"
              alt="A colourful Indonesian vegetable dish served at Bali Bali"
              caption="Dinner before the West End."
            />
          }
        >
          <p>
            Eating before a show? Include your show time in your booking
            request. We’ll reply to confirm your table.
          </p>
          <address className="editorial-address">
            <strong>150</strong>
            <div>
              Shaftesbury Avenue
              <br />
              London WC2H 8HL
            </div>
          </address>
          <p className="small-caps">Leicester Square · Covent Garden</p>
          <a
            className="text-link"
            href={DIRECTIONS}
            target="_blank"
            rel="noreferrer"
          >
            Get directions <span aria-hidden="true">↗</span>
          </a>
        </ReadingSection>
        <section
          className="editorial-section editorial-visit"
          id="visit"
          tabIndex={-1}
          aria-labelledby="booking-title"
        >
          <header className="editorial-heading">
            <p className="eyebrow">06 / Visit and booking</p>
            <h2 id="booking-title">
              Join us on
              <br />
              <em>Shaftesbury Avenue.</em>
            </h2>
            <p>
              Send a booking request. We’ll reply to confirm your table. Tell us
              about any allergies or theatre plans.
            </p>
            <a
              className="text-link"
              href={BOOKING}
              target="_blank"
              rel="noreferrer"
            >
              Send a booking request <span aria-hidden="true">↗</span>
            </a>
          </header>
          <div className="editorial-visit-grid">
            <div>
              <h3>Find us</h3>
              <address>
                150 Shaftesbury Avenue
                <br />
                London WC2H 8HL
              </address>
              <a href={DIRECTIONS} target="_blank" rel="noreferrer">
                Get directions ↗
              </a>
              <a href="tel:+442078362644">Call +44 20 7836 2644</a>
            </div>
            <div>
              <h3>Opening hours</h3>
              <dl>
                {[
                  ["Mon to Thu", "12:00 to 22:00"],
                  ["Friday", "12:00 to 22:45"],
                  ["Saturday", "12:00 to 23:00"],
                  ["Sunday", "13:00 to 21:30"],
                ].map(([day, hours]) => (
                  <div key={day}>
                    <dt>{day}</dt>
                    <dd>{hours}</dd>
                  </div>
                ))}
              </dl>
              <p>The kitchen closes around 30 minutes before the restaurant.</p>
            </div>
          </div>
          <p className="editorial-group-note">
            For groups of 6 to 50,{" "}
            <a href="tel:+442078362644">call us to discuss your booking.</a>
          </p>
          <footer className="editorial-footer">
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
        </section>
      </main>
    </div>
  );
}
