import type { IngredientId } from "./types/game";
/** Shared paths respect Vite base, including subfolder hosting. */
export const assets = {
  family: `${import.meta.env.BASE_URL}assets/characters/familie-og-dyr.png`,
  pizza: `${import.meta.env.BASE_URL}assets/icons/pizza.svg`,
};
export const toppingIcons = {
  sauce: "🍅",
  candy: "🍬",
  rainbow: "🌈",
  popcorn: "🍿",
  strawberry: "🍓",
  broccoli: "🥦",
  icecream: "🍦",
  cheese: "✦",
  ham: "▰",
  pepperoni: "●",
  corn: "●",
  pineapple: "◆",
  mushroom: "🍄",
  pepper: "◯",
  olive: "◉",
};

export const toppingImages: Partial<Record<IngredientId, string>> =
  Object.fromEntries(
    [
      "cheese",
      "ham",
      "pepperoni",
      "corn",
      "pineapple",
      "mushroom",
      "pepper",
      "olive",
    ].map((id) => [id, `${import.meta.env.BASE_URL}assets/toppings/${id}.svg`]),
  );
