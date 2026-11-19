"use client";
import { anchors, chapters } from "@/lib/content";
export default function ScrollProgress({ chapter }: { chapter: number }) {
  return (
    <aside className="scroll-progress" aria-label="Journey chapters">
      <div className="progress-track">
        <div className="progress-fill" />
      </div>
      <div className="chapter-links">
        {chapters.map((name, i) => (
          <a
            href={`#${anchors[i]}`}
            key={name}
            aria-label={name}
            aria-current={chapter === i ? "step" : undefined}
          >
            <span className="chapter-name">{name}</span>
          </a>
        ))}
      </div>
      <p className="mobile-chapter" aria-label="Journey progress">
        {chapters[chapter]}
      </p>
    </aside>
  );
}
