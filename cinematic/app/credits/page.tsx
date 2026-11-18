import type { Metadata } from "next";
import { HOME } from "@/lib/content";
import gateway from "@/lib/gateway-model.json";
import flower from "@/lib/flower-model.json";
export const metadata: Metadata = { title: "3D asset credits | Bali Bali" };
export default function CreditsPage() {
  return (
    <main className="menu-page">
      <nav aria-label="Credits navigation">
        <a className="text-link" href={HOME}>
          ← Back to Bali Bali
        </a>
      </nav>
      <header>
        <p className="eyebrow">Bali Bali · Asset credits</p>
        <h1>Craft and credit.</h1>
      </header>
      <section aria-labelledby="gateway-credit">
        <h2 id="gateway-credit">Candi Bentar</h2>
        <p>
          <a href={gateway.source}>{gateway.title}</a> by{" "}
          <a href={gateway.authorUrl}>{gateway.author}</a>, licensed under{" "}
          <a href={gateway.licenseUrl}>{gateway.license}</a>.
        </p>
        <p>Adaptations for this website: {gateway.modifications}</p>
        <p>
          The gateway is a cultural sculpture in the camera journey and does not
          depict the restaurant entrance.
        </p>
      </section>
      <section aria-labelledby="flower-credit">
        <h2 id="flower-credit">Frangipani / Jepun</h2>
        <p>
          <a href={flower.source}>{flower.title}</a> by{" "}
          <a href={flower.authorUrl}>{flower.author}</a>, released under{" "}
          <a href={flower.licenseUrl}>{flower.license}</a>.
        </p>
        <p>Adaptations for this website: {flower.modifications}</p>
      </section>
      <section>
        <h2>Other sculptures</h2>
        <p>
          The ornamental penjor and foliage frame are original procedural
          geometry created for this website.
        </p>
      </section>
    </main>
  );
}
