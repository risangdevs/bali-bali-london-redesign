"use client";
import type { Quality } from "@/lib/effects";
import { bookingPhotos } from "@/lib/photo-layout";
import DepthLayer from "./DepthLayer";
export default function BookingScene({
  mobile,
  quality,
}: {
  mobile: boolean;
  quality: Quality;
}) {
  return (
    <group>
      {bookingPhotos(mobile).map((photo) => (
        <DepthLayer key={photo.id} {...photo} quality={quality} />
      ))}
    </group>
  );
}
