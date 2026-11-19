"use client";
import { useDeferredValue } from "react";
import type { Quality } from "@/lib/effects";
import manifest from "@/lib/dwarapala-model.json";
import ImportedSculpture from "./ImportedSculpture";

export default function DwarapalaModel({
  mobile,
  quality,
}: {
  mobile: boolean;
  quality: Quality;
}) {
  const detail = useDeferredValue(quality);
  return (
    <ImportedSculpture
      mobile={mobile}
      quality={detail}
      symbol="dwarapala"
      manifest={manifest}
    />
  );
}
