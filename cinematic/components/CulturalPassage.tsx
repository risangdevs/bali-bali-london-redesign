"use client";
import { Suspense, useDeferredValue } from "react";
import GatewayModel from "./GatewayModel";
import { type Quality } from "@/lib/effects";
import PenjorModel from "./PenjorModel";

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
      <Suspense fallback={null}>
        <PenjorModel mobile={mobile} quality={detail} />
      </Suspense>
    </>
  );
}
