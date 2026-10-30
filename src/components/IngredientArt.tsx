import type { IngredientId } from "../types/game";
import { toppingImages, toppingIcons } from "../assets";
/** Same ingredient art in tray, drag preview, orders and pizza. */
export function IngredientArt({ id }: { id: IngredientId }) {
  const src = toppingImages[id];
  return src ? (
    <img className="ingredient-art" src={src} alt="" draggable={false} />
  ) : (
    <span aria-hidden="true">{toppingIcons[id]}</span>
  );
}
