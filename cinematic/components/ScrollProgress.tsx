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
            aria-label={`${i + 1}. ${name}`}
            aria-current={chapter === i ? "step" : undefined}
          >
            <span>0{i + 1}</span>
            <span className="chapter-name">{name}</span>
          </a>
        ))}
      </div>
      <span className="scroll-instruction">
        SCROLL TO SAVOUR <span>↓</span>
      </span>
    </aside>
  );
}
