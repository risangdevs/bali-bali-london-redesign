"use client";
import { type Quality } from "@/lib/effects";
import { culturalLayout } from "@/lib/cultural-layout";
import CulturalSculpture from "./CulturalSculpture";

export default function CulturalPassage({
  mobile,
  quality,
}: {
  mobile: boolean;
  quality: Quality;
}) {
  return (
    <>
      {(["gateway", "penjor"] as const).map((symbol) => (
        <CulturalSculpture
          key={symbol}
          {...culturalLayout(symbol, mobile)}
          quality={quality}
        />
      ))}
    </>
  );
}
