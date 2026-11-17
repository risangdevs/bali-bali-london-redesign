"use client";
import { type Quality } from "@/lib/effects";
import { brandLayout } from "@/lib/brand-layout";
import BrandLetter from "./BrandLetter";

export default function BrandLetterPassage({
  mobile,
  quality,
}: {
  mobile: boolean;
  quality: Quality;
}) {
  return (
    <>
      {(["B", "A"] as const).map((letter) => (
        <BrandLetter
          key={letter}
          {...brandLayout(letter, mobile)}
          quality={quality}
        />
      ))}
    </>
  );
}
