"use client";
import { useDeferredValue } from "react";
import GatewayModel from "./GatewayModel";
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
  const detail = useDeferredValue(quality);
  return (
    <>
      <GatewayModel mobile={mobile} quality={detail} />
      <CulturalSculpture
        {...culturalLayout("penjor", mobile)}
        symbol="penjor"
        quality={quality}
      />
    </>
  );
}
