import { IngredientArt } from "./IngredientArt";
import { useRef, useState } from "react";
import type { IngredientId } from "../types/game";
import { ingredients } from "../data/ingredients";
type Drag = {
  id: IngredientId;
  x: number;
  y: number;
  startX: number;
  startY: number;
  pointer: number;
};
export function IngredientTray({
  selected,
  onSelect,
  onDrop,
  category,
}: {
  category: "normal" | "silly";
  selected: IngredientId | null;
  onSelect: (id: IngredientId) => void;
  onDrop: (id: IngredientId, x: number, y: number) => void;
}) {
  const drag = useRef<Drag | null>(null);
  const [ghost, setGhost] = useState<Drag | null>(null);
  return (
    <>
      <div className="ingredient-tray" aria-label="Ingredienser">
        {ingredients
          .filter(
            (i) =>
              i.id !== "sauce" &&
              (category === "silly" ? i.category === "silly" : !i.category),
          )
          .map((i) => (
            <button
              className={"ingredient " + (selected === i.id ? "chosen" : "")}
              key={i.id}
              onClick={() => onSelect(i.id)}
              aria-pressed={selected === i.id}
              onPointerDown={(e) => {
                if (!e.isPrimary || e.button !== 0) return;
                e.currentTarget.setPointerCapture(e.pointerId);
                drag.current = {
                  id: i.id,
                  x: e.clientX,
                  y: e.clientY,
                  startX: e.clientX,
                  startY: e.clientY,
                  pointer: e.pointerId,
                };
                onSelect(i.id);
              }}
              onPointerMove={(e) => {
                const d = drag.current;
                if (!d || d.pointer !== e.pointerId) return;
                const next = { ...d, x: e.clientX, y: e.clientY };
                drag.current = next;
                if (Math.hypot(next.x - d.startX, next.y - d.startY) > 8)
                  setGhost(next);
              }}
              onPointerUp={(e) => {
                const d = drag.current;
                if (
                  d &&
                  d.pointer === e.pointerId &&
                  Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 8
                )
                  onDrop(d.id, e.clientX, e.clientY);
                drag.current = null;
                setGhost(null);
              }}
              onPointerCancel={() => {
                drag.current = null;
                setGhost(null);
              }}
              onLostPointerCapture={() => {
                drag.current = null;
                setGhost(null);
              }}
            >
              <span className="ingredient-emoji" aria-hidden="true">
                <IngredientArt id={i.id} />
              </span>
              <span>{i.name}</span>
            </button>
          ))}
      </div>
      {ghost && (
        <div
          className="drag-ghost"
          style={{ left: ghost.x, top: ghost.y }}
          aria-hidden="true"
        >
          <IngredientArt id={ghost.id} />
        </div>
      )}
    </>
  );
}
