import { Pizza } from "./Pizza";
import { IngredientArt } from "./IngredientArt";
import { bakeLabels } from "../game/baking";
import type { BakeState } from "../game/baking";
import type { Order, Topping } from "../types/game";
export type BakedPizza = { id: string; toppings: Topping[]; state: BakeState };
export function Counter({
  pizzas,
  selected,
  onSelect,
  customers,
  onServe,
  onDiscard,
  onMake,
  free,
  message,
}: {
  pizzas: BakedPizza[];
  selected: string | null;
  onSelect: (id: string) => void;
  customers: Order[];
  onServe: (index: number) => void;
  onDiscard: () => void;
  onMake: () => void;
  free: boolean;
  message: string;
}) {
  const plateLabel = (state: BakeState) =>
    state === "warning"
      ? "Godt bagt"
      : state === "ready"
        ? "Gylden og klar"
        : state === "raw"
          ? "Ikke færdigbagt"
          : bakeLabels[state];
  const pizza = pizzas.find((p) => p.id === selected);
  return (
    <section className="serving-counter">
      <h2>🍕 Pizzadisken</h2>
      <p>
        Vælg en pizza på disken
        {free ? " og nyd den!" : ", og tryk på kunden, der skal have den."}
      </p>
      <div className="pizza-shelf">
        {pizzas.map((p, index) => (
          <button
            key={p.id}
            className={`pizza-plate cook-${p.state}`}
            aria-pressed={selected === p.id}
            aria-label={`Vælg pizza ${index + 1}: ${plateLabel(p.state)}`}
            onClick={() => onSelect(p.id)}
          >
            <Pizza
              toppings={p.toppings}
              selected={null}
              onPlace={() => {}}
              onDraw={() => {}}
              baked={p.state !== "raw"}
              interactive={false}
            />
            <strong>Pizza {index + 1}</strong>
            <small>{plateLabel(p.state)}</small>
          </button>
        ))}
      </div>
      {!pizzas.length && <p>Disken er tom. Lad os bage en pizza!</p>}
      <div role="status" className="counter-message">
        {message}
      </div>
      {!free && (
        <div className="waiting-customers">
          {customers.map((order, index) => (
            <button
              className="customer-ticket"
              key={order.name}
              disabled={!pizza}
              onClick={() => onServe(index)}
              aria-label={`Giv pizza til ${order.name}`}
            >
              <span className="ticket-face">{order.emoji}</span>
              <strong>{order.name}</strong>
              <span className="ticket-recipe">
                {order.request.map((id) => (
                  <IngredientArt key={id} id={id} />
                ))}
              </span>
              <small>Rigtig pizza: 🪙 10</small>
            </button>
          ))}
        </div>
      )}
      <div className="counter-actions">
        {free && (
          <button
            className="primary-btn"
            disabled={!pizza}
            onClick={() => onServe(0)}
          >
            😋 Spis pizzaen
          </button>
        )}
        <button className="secondary-btn" disabled={!pizza} onClick={onDiscard}>
          ♻️ Fjern valgt pizza
        </button>
        <button
          className="primary-btn"
          disabled={pizzas.length >= 4}
          onClick={onMake}
        >
          👩‍🍳 Lav en pizza mere
        </button>
      </div>
      {pizzas.length >= 4 && (
        <p>Disken er fuld. Servér eller fjern en pizza først.</p>
      )}
    </section>
  );
}
