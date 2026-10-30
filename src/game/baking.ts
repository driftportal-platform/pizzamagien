import type { IngredientId, Topping } from "../types/game";
export type BakeState = "raw" | "ready" | "warning" | "burnt";
export const bakeState = (seconds: number): BakeState =>
  seconds < 6
    ? "raw"
    : seconds < 13
      ? "ready"
      : seconds < 18
        ? "warning"
        : "burnt";
export const bakeLabels: Record<BakeState, string> = {
  raw: "Bager …",
  ready: "Gylden og klar!",
  warning: "Tag den ud nu!",
  burnt: "Åh nej, brændt på!",
};
export function salePrice(
  toppings: Topping[],
  wanted: IngredientId[],
  state: BakeState,
) {
  if (state === "raw" || state === "burnt") return 0;
  const actual = new Set(
    toppings.filter((t) => t.ingredient !== "sauce").map((t) => t.ingredient),
  );
  return actual.size === new Set(wanted).size &&
    wanted.every((id) => actual.has(id))
    ? 10
    : 0;
}
export const loadCoins = () => {
  try {
    const n = Number(localStorage.getItem("pizzamagien-coins"));
    return Number.isSafeInteger(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
};
export const saveCoins = (n: number) => {
  try {
    localStorage.setItem("pizzamagien-coins", String(n));
  } catch {
    /* Spil videre uden lagring. */
  }
};
