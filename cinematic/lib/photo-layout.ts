import { smootherstep } from "./motion";
export type PhotoLayout = {
  id: string;
  src: string;
  position: [number, number, number];
  size: [number, number];
  rotation?: [number, number, number];
  round?: number;
  start: number;
  end: number;
  hot?: boolean;
  fit?: boolean | [number, number];
};
// One spatial sequence shared by the renderer and camera-framing checks.
export function foodPhotos(mobile: boolean): PhotoLayout[] {
  return [
    {
      id: "food-sate",
      src: "sate.webp",
      position: [mobile ? 0.2 : 3.5, mobile ? -3.2 : -0.3, -13],
      size: mobile ? [3.1, 2.48] : [5.4, 4.32],
      rotation: [0, -0.1, -0.05],
      round: 1,
      start: 0.145,
      end: 0.34,
      hot: true,
    },
    ...(!mobile
      ? [
          {
            id: "food-rendang",
            src: "rendang.webp",
            position: [-3.5, -0.3, -15.5] as [number, number, number],
            size: [3.6, 2.88] as [number, number],
            rotation: [0.06, 0.15, 0.06] as [number, number, number],
            round: 1,
            start: 0.19,
            end: 0.335,
            hot: true,
          },
        ]
      : []),
    ...(!mobile
      ? [
          {
            id: "food-vegetables",
            src: "vegetables.webp",
            position: [4.8, 0.2, -17] as [number, number, number],
            size: [3.6, 2.88] as [number, number],
            rotation: [0, -0.15, -0.05] as [number, number, number],
            round: 1,
            start: 0.225,
            end: 0.35,
          },
        ]
      : []),
  ];
}
export const sharingTilt = (p: number) =>
  ((1 - smootherstep((p - 0.35) / 0.12)) * Math.PI) / 2;
export function sharingPhotos(mobile: boolean): PhotoLayout[] {
  return [
    {
      id: "sharing-main",
      fit: mobile ? [0.5, 0.18] : true,
      src: "sharing.webp",
      position: [mobile ? 0 : 1.8, 0.02, mobile ? 0.4 : 0],
      size: mobile ? [4.5, 3.6] : [7, 5.6],
      rotation: [-Math.PI / 2, 0, 0],
      round: 1,
      start: 0.305,
      end: 0.535,
    },
    ...(!mobile
      ? [
          {
            id: "sharing-sate",
            src: "sate.webp",
            position: [-3.2, 0.1, 1.3] as [number, number, number],
            size: [3.1, 2.48] as [number, number],
            rotation: [-Math.PI / 2, 0, -0.2] as [number, number, number],
            round: 1,
            start: 0.33,
            end: 0.515,
            hot: true,
          },
          {
            id: "sharing-rendang",
            src: "rendang.webp",
            position: [6, 0.14, -3.3] as [number, number, number],
            size: [2.8, 2.24] as [number, number],
            rotation: [-Math.PI / 2, 0, 0.15] as [number, number, number],
            round: 1,
            start: 0.34,
            end: 0.52,
            hot: true,
          },
        ]
      : []),
  ];
}
export function heritagePhotos(mobile: boolean): PhotoLayout[] {
  return [
    {
      id: "heritage-sate",
      src: "sate.webp",
      position: [mobile ? 0.5 : 6, mobile ? -1.4 : 0.3, -47],
      size: mobile ? [3.2, 2.56] : [5, 4],
      rotation: [0, -0.15, 0],
      round: 1,
      start: 0.49,
      end: 0.635,
    },
    ...(!mobile
      ? [
          {
            id: "heritage-sharing",
            src: "sharing.webp",
            position: [-0.6, -1, -49] as [number, number, number],
            size: [3.6, 2.88] as [number, number],
            rotation: [0, 0.1, 0] as [number, number, number],
            round: 1,
            start: 0.51,
            end: 0.62,
          },
        ]
      : []),
  ];
}
export function bookingPhotos(mobile: boolean): PhotoLayout[] {
  return [
    {
      id: "booking-sharing",
      src: "sharing.webp",
      position: [mobile ? 0 : 2.7, mobile ? -1.7 : -0.4, -65],
      size: mobile ? [3.8, 3.04] : [6.4, 5.12],
      rotation: [0, -0.1, 0.03],
      round: 1,
      start: 0.735,
      end: 2,
    },
    ...(!mobile
      ? [
          {
            id: "booking-rice",
            src: "rice.webp",
            position: [-3, -2.5, -66] as [number, number, number],
            size: [2.8, 2.24] as [number, number],
            rotation: [0, 0.1, 0] as [number, number, number],
            round: 1,
            start: 0.81,
            end: 2,
            hot: true,
          },
        ]
      : []),
  ];
}
