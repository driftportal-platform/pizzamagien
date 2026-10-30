import type { IngredientId, Topping } from "../types/game";
export const randomId = () => Math.random().toString(36).slice(2, 11);
export function evaluateOrder(toppings: Topping[], wanted: IngredientId[]) {
  const selected = new Set(
    toppings.filter((t) => t.ingredient !== "sauce").map((t) => t.ingredient),
  );
  const matched = wanted.filter((i) => selected.has(i)).length;
  const extra = [...selected].filter((i) => !wanted.includes(i)).length;
  return Math.max(
    1,
    Math.min(
      3,
      matched === wanted.length && extra === 0
        ? 3
        : matched >= Math.max(1, wanted.length - 1)
          ? 2
          : 1,
    ),
  );
}
export const loadStars = () => {
  try {
    return Number(localStorage.getItem("pizzamagien-stars") || 0) || 0;
  } catch {
    return 0;
  }
};
export const saveStars = (stars: number) => {
  try {
    localStorage.setItem("pizzamagien-stars", String(stars));
  } catch {
    /* private mode */
  }
};

/** Returns a safe topping center inside the pizza, or null for an outside drop. */
export function dropPosition(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
) {
  if (rect.width <= 0 || rect.height <= 0) return null;
  const x = ((clientX - rect.left) / rect.width) * 100,
    y = ((clientY - rect.top) / rect.height) * 100;
  return (x - 50) ** 2 + (y - 50) ** 2 <= 40 ** 2 ? { x, y } : null;
}
