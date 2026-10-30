import { useEffect, useRef, useState } from "react";
import { Pizza } from "./Pizza";
import { bakeState, bakeLabels } from "../game/baking";
import type { BakeState } from "../game/baking";
import type { Topping } from "../types/game";
export function Oven({
  toppings,
  onTake,
}: {
  toppings: Topping[];
  onTake: (state: BakeState) => void;
}) {
  const started = useRef(Date.now());
  const taken = useRef(false);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setSeconds((Date.now() - started.current) / 1000),
      100,
    );
    return () => window.clearInterval(timer);
  }, []);
  const state = bakeState(seconds);
  return (
    <section className={`working-oven oven-${state}`} aria-label="Pizzaovn">
      <div className="oven-top">
        🔥 PizzaMagien stenovn <span>● ●</span>
      </div>
      <div className="baking-window">
        <div className={`oven-food cook-${state}`}>
          <Pizza
            toppings={toppings}
            selected={null}
            onPlace={() => {}}
            onDraw={() => {}}
            baked={state !== "raw"}
            interactive={false}
          />
        </div>
        <div className="oven-embers" aria-hidden="true">
          🔥 🔥 🔥 🔥
        </div>
        {state === "burnt" && (
          <div className="oven-smoke" aria-hidden="true">
            ☁️ ☁️
          </div>
        )}
      </div>
      <div className="bake-gauge">
        <span style={{ left: `${Math.min(seconds / 18, 1) * 100}%` }}>▼</span>
      </div>
      <p role="status" className="bake-status">
        {bakeLabels[state]}
      </p>
      <p>
        {state === "raw"
          ? "Klar efter 6 sekunder. Hold øje med farven!"
          : state === "ready"
            ? "Mums! Nu er det et godt tidspunkt."
            : state === "warning"
              ? "Skynd dig, før pizzaen brænder på!"
              : "Pyt! Vi kan altid lave en ny pizza."}
      </p>
      <button
        className="primary-btn"
        onClick={() => {
          if (taken.current) return;
          taken.current = true;
          onTake(bakeState((Date.now() - started.current) / 1000));
        }}
      >
        🧤 Tag pizzaen ud
      </button>
      <small>
        Pizzaen brænder på efter 18 sekunder — også hvis du skifter fane.
      </small>
    </section>
  );
}
