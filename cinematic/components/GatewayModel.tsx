"use client";
import { useDeferredValue } from "react";
import type { Quality } from "@/lib/effects";
import manifest from "@/lib/gateway-model.json";
import ImportedSculpture from "./ImportedSculpture";
export default function GatewayModel(props: {
  mobile: boolean;
  quality: Quality;
}) {
  // Show the lighter gateway first; retain it while the full 4K model loads.
  const quality = useDeferredValue(
    props.quality,
    props.quality === "high" ? "medium" : props.quality,
  );
  return (
    <ImportedSculpture
      {...props}
      quality={quality}
      symbol="gateway"
      manifest={manifest}
    />
  );
}
