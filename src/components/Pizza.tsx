import { useId, useRef, useState } from "react";
import type { IngredientId, Topping } from "../types/game";
import { dropPosition } from "../game/logic";
import { IngredientArt } from "./IngredientArt";
import { ingredients } from "../data/ingredients";
type Point = { x: number; y: number };
type Props = {
  toppings: Topping[];
  selected: IngredientId | null;
  onPlace: (x: number, y: number) => void;
  onDraw: (points: Point[]) => void;
  baked: boolean;
  interactive: boolean;
};
export function Pizza({
  toppings,
  selected,
  onPlace,
  onDraw,
  baked,
  interactive,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useRef<{ pointer: number; points: Point[] } | null>(null);
  const [draft, setDraft] = useState<Point[]>([]);
  const clip = useId().replace(/:/g, "");
  const point = (x: number, y: number) =>
    ref.current
      ? dropPosition(x, y, ref.current.getBoundingClientRect())
      : null;
  const stroke = (points: Point[], key: string) => (
    <polyline
      key={key}
      points={points.map((p) => `${p.x},${p.y}`).join(" ")}
      fill="none"
      stroke="#d94b36"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
  return (
    <div
      ref={ref}
      data-pizza
      role="button"
      tabIndex={interactive ? 0 : -1}
      aria-disabled={!interactive}
      aria-label={
        selected === "sauce"
          ? "Pizza. Tegn med tomatsovs, eller tryk Enter for en sovseprik."
          : "Pizza. Vælg fyld og tryk eller træk det på pizzaen."
      }
      className={
        "pizza " +
        (baked ? "baked " : "") +
        (interactive ? "interactive " : "") +
        (selected === "sauce" ? "drawing" : "")
      }
      onKeyDown={(e) => {
        if (interactive && selected && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onPlace(35 + Math.random() * 30, 35 + Math.random() * 30);
        }
      }}
      onPointerDown={(e) => {
        if (
          !interactive ||
          selected !== "sauce" ||
          !e.isPrimary ||
          e.button !== 0
        )
          return;
        const p = point(e.clientX, e.clientY);
        if (!p) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        active.current = { pointer: e.pointerId, points: [p] };
        setDraft([p]);
      }}
      onPointerMove={(e) => {
        const a = active.current;
        if (!a || a.pointer !== e.pointerId) return;
        const p = point(e.clientX, e.clientY);
        if (!p || a.points.length >= 1200) return;
        const last = a.points[a.points.length - 1];
        if (Math.hypot(p.x - last.x, p.y - last.y) < 0.5) return;
        a.points.push(p);
        setDraft([...a.points]);
      }}
      onPointerUp={(e) => {
        const a = active.current;
        if (a && a.pointer === e.pointerId) {
          const p = point(e.clientX, e.clientY);
          if (p) a.points.push(p);
          onDraw(a.points);
          active.current = null;
          setDraft([]);
          return;
        }
        if (interactive && selected && selected !== "sauce") {
          const p = point(e.clientX, e.clientY);
          if (p) onPlace(p.x, p.y);
        }
      }}
      onPointerCancel={() => {
        active.current = null;
        setDraft([]);
      }}
      onLostPointerCapture={() => {
        active.current = null;
        setDraft([]);
      }}
    >
      <div className="crust" />
      <div className="sauce dough" />
      <svg className="sauce-canvas" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <clipPath id={clip}>
            <circle cx="50" cy="50" r="42" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clip})`}>
          {toppings
            .filter((t) => t.ingredient === "sauce")
            .map((t) =>
              t.points && t.points.length > 1 ? (
                stroke(t.points, t.id)
              ) : (
                <circle key={t.id} cx={t.x} cy={t.y} r="3" fill="#d94b36" />
              ),
            )}
          {draft.length === 1 ? (
            <circle cx={draft[0].x} cy={draft[0].y} r="3" fill="#d94b36" />
          ) : draft.length > 1 ? (
            stroke(draft, "draft")
          ) : null}
        </g>
      </svg>
      {toppings
        .filter((t) => t.ingredient !== "sauce")
        .map((t) => {
          const i = ingredients.find((i) => i.id === t.ingredient)!;
          return (
            <div
              key={t.id}
              className={
                "topping topping-" +
                t.ingredient +
                (i.category === "silly" ? " silly-topping" : "")
              }
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                transform: `translate(-50%,-50%) rotate(${t.rotation}deg)`,
                background: i.color,
              }}
            >
              <IngredientArt id={t.ingredient}/>
            </div>
          );
        })}
    </div>
  );
}
