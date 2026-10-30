import { useRef } from "react";
import type { IngredientId, Topping } from "../types/game";
import { dropPosition } from "../game/logic";
import { toppingIcons } from "../assets";
import { ingredients } from "../data/ingredients";
type Props = {
  toppings: Topping[];
  selected: IngredientId | null;
  onPlace: (x: number, y: number) => void;
  baked: boolean;
  interactive: boolean;
};
export function Pizza({
  toppings,
  selected,
  onPlace,
  baked,
  interactive,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const place = (clientX: number, clientY: number) => {
    if (!interactive || !selected || !ref.current) return;
    const point = dropPosition(
      clientX,
      clientY,
      ref.current.getBoundingClientRect(),
    );
    if (point) onPlace(point.x, point.y);
  };
  return (
    <div
      ref={ref}
      data-pizza
      role="button"
      tabIndex={interactive ? 0 : -1}
      aria-disabled={!interactive}
      onKeyDown={(e) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onPlace(35 + Math.random() * 30, 35 + Math.random() * 30);
        }
      }}
      className={
        "pizza " + (baked ? "baked" : "") + (interactive ? " interactive" : "")
      }
      onPointerUp={(e) => place(e.clientX, e.clientY)}
      aria-label="Pizza. Vælg en ingrediens og tryk på pizzaen for at placere den."
    >
      <div className="crust" />
      <div className="sauce" />
      <div className="pizza-cheese" />
      {toppings.map((t) => {
        const ingredient = ingredients.find((i) => i.id === t.ingredient)!;
        return (
          <div
            className={"topping topping-" + t.ingredient}
            key={t.id}
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
              transform: `translate(-50%,-50%) rotate(${t.rotation}deg)`,
              background: ingredient.color,
            }}
          >
            {toppingIcons[t.ingredient]}
          </div>
        );
      })}
    </div>
  );
}
