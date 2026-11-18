"use client";
import type { Quality } from "@/lib/effects";
import manifest from "@/lib/gateway-model.json";
import ImportedSculpture from "./ImportedSculpture";
export default function GatewayModel(props: {
  mobile: boolean;
  quality: Quality;
}) {
  return <ImportedSculpture {...props} symbol="gateway" manifest={manifest} />;
}
