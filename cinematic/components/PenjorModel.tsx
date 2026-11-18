"use client";
import type { Quality } from "@/lib/effects";
import manifest from "@/lib/penjor-model.json";
import ImportedSculpture from "./ImportedSculpture";
export default function PenjorModel(props: {
  mobile: boolean;
  quality: Quality;
}) {
  return <ImportedSculpture {...props} symbol="penjor" manifest={manifest} />;
}
