"use client";
import { type Quality } from "@/lib/effects";
import BrandLetter from "./BrandLetter";

/** B then A replace the ceramic ring along the existing camera path. */
export default function BrandLetterPassage({
  mobile,
  quality,
}: {
  mobile: boolean;
  quality: Quality;
}) {
  return (
    <>
      <BrandLetter
        letter="B"
        quality={quality}
        height={mobile ? 1.8 : 7.2}
        position={[mobile ? 0.25 : 1.5, mobile ? -4.5 : 0, -13]}
        rotation={[0, -0.09, 0]}
        from={0.085}
        to={0.245}
      />
      <BrandLetter
        letter="A"
        quality={quality}
        height={mobile ? 1.8 : 6.8}
        position={[mobile ? 0.2 : 0.9, mobile ? -3.6 : -0.1, -19]}
        rotation={[0, 0.08, 0]}
        from={0.195}
        to={0.405}
      />
    </>
  );
}
