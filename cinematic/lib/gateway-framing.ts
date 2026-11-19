import bounds from "./sculpture-bounds.json";

/** A level, frontal view of the complete gateway. */
export function fitGateway(aspect: number, fill = 0.84) {
  const { min, max } = bounds.gateway;
  const center = min.map((v, i) => (v + max[i]) / 2) as [
    number,
    number,
    number,
  ];
  const size = max.map((v, i) => v - min[i]);
  const fov = 38;
  const tangent = Math.tan((fov * Math.PI) / 360);
  const distance =
    size[2] / 2 +
    Math.max(
      size[1] / (2 * tangent * fill),
      size[0] / (2 * tangent * Math.max(0.15, aspect) * fill),
    );
  return { center, fov, distance };
}
