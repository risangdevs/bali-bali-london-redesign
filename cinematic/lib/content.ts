export const asset = (name: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/${name}`;
export const BOOKING = "https://www.balibalirestaurant.com/#Booking";
export const MENU =
  "https://www.balibalirestaurant.com/pdf/bali_bali_menu_2026.pdf";
export const HOME = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/`;
export const FOOD_MENU = `${HOME}menu/`;
// Restaurant menu 2026, checked 16 November 2026. Update alongside the PDF.
export const RIJSTTAFEL_PRICE = "£34";
export const menuSelection = [
  {
    name: "Sate",
    price: "£11.75",
    description:
      "Chicken or beef skewers, cucumber and onions, with peanut sauce.",
  },
  {
    name: "Vegetarian sate",
    price: "£11.75",
    description: "Mock chicken skewers with peanut sauce. A vegetarian option.",
  },
  {
    name: "Rendang",
    price: "£17.55",
    description: "Beef slowly cooked with coconut and chilli.",
  },
  {
    name: "Nasi goreng",
    price: "£15.45",
    description: "Fried rice with chicken, shrimp, egg and peas.",
  },
  {
    name: "Gado gado",
    price: "£13.95",
    description:
      "Indonesian salad with peanut sauce. Listed in the vegetarian section.",
  },
  {
    name: "Nasi putih",
    price: "£3.50",
    description: "Steamed rice to accompany your meal.",
  },
];
export const DIRECTIONS =
  "https://www.google.com/maps/search/?api=1&query=Bali+Bali+150+Shaftesbury+Avenue+London+WC2H+8HL";
export const chapters = [
  "First taste",
  "The food",
  "Rijsttafel",
  "Since 1986",
  "Pre-theatre",
  "Visit and booking",
];
export const anchors = [
  "first-taste",
  "the-table",
  "rijsttafel",
  "our-story",
  "west-end",
  "visit",
];
