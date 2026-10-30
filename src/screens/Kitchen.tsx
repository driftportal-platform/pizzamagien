import { useEffect, useRef, useState } from "react";
import { Chef } from "../components/Chef";
import { Pizza } from "../components/Pizza";
import { Oven } from "../components/Oven";
import { Counter } from "../components/Counter";
import type { BakedPizza } from "../components/Counter";
import { IngredientTray } from "../components/IngredientTray";
import { IngredientArt } from "../components/IngredientArt";
import { orders } from "../data/orders";
import { ingredients } from "../data/ingredients";
import { dropPosition, randomId } from "../game/logic";
import { salePrice } from "../game/baking";
import type { BakeState } from "../game/baking";
import type { IngredientId, Mode, Topping } from "../types/game";
export function Kitchen({
  mode,
  onExit,
  onAward,
  coins,
  onEarn,
}: {
  mode: Mode;
  onExit: () => void;
  onAward: (n: number) => void;
  coins: number;
  onEarn: (n: number) => void;
}) {
  const [chef, setChef] = useState<"Aya" | "Fraya">("Aya");
  const [stage, setStage] = useState<"make" | "bake" | "counter">("make");
  const [category, setCategory] = useState<"normal" | "silly">("normal");
  const [selected, setSelected] = useState<IngredientId | null>("sauce");
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [shelf, setShelf] = useState<BakedPizza[]>([]);
  const [plate, setPlate] = useState<string | null>(null);
  const [customerIds, setCustomerIds] = useState([0, 1, 2]);
  const [sound, setSound] = useState(true);
  const [message, setMessage] = useState("");
  const removed = useRef(new Set<string>());
  const customers = customerIds.map((i) => orders[i]);
  const order = customers[0];
  useEffect(
    () => () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    [],
  );
  const speak = () => {
    if (!sound || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(order.message);
    u.lang = "da-DK";
    window.speechSynthesis.speak(u);
  };
  const place = (ingredient: IngredientId, x: number, y: number) => {
    if (stage !== "make") return;
    setToppings((old) =>
      old.length >= 100
        ? old
        : [
            ...old,
            {
              id: randomId(),
              ingredient,
              x,
              y,
              rotation: Math.random() * 90 - 45,
            },
          ],
    );
  };
  const draw = (points: { x: number; y: number }[]) => {
    if (stage !== "make" || !points.length) return;
    setToppings((old) =>
      old.length >= 100
        ? old
        : [
            ...old,
            {
              id: randomId(),
              ingredient: "sauce",
              x: points[0].x,
              y: points[0].y,
              rotation: 0,
              points,
            },
          ],
    );
  };
  const drop = (id: IngredientId, x: number, y: number) => {
    const el = document.querySelector("[data-pizza]");
    if (!el) return;
    const p = dropPosition(x, y, el.getBoundingClientRect());
    if (p) place(id, p.x, p.y);
  };
  const make = () => {
    setToppings([]);
    setSelected("sauce");
    setStage("make");
    setMessage("");
  };
  const take = (state: BakeState) => {
    const id = randomId();
    setShelf((old) => [...old, { id, toppings: [...toppings], state }]);
    setPlate(id);
    setStage("counter");
    setMessage(
      state === "burnt"
        ? "Pizzaen blev brændt. Fjern den og prøv igen."
        : state === "raw"
          ? "Pizzaen kom for tidligt ud. Kunden betaler kun for en bagt pizza."
          : "Pizzaen er klar på disken!",
    );
  };
  const remove = (id: string) => {
    removed.current.add(id);
    const rest = shelf.filter((p) => p.id !== id);
    setShelf(rest);
    setPlate(rest[0]?.id ?? null);
  };
  const serve = (index: number) => {
    const p = shelf.find((p) => p.id === plate);
    if (!p || removed.current.has(p.id)) return;
    if (mode === "free") {
      remove(p.id);
      setMessage("Mums! Klar til en ny pizzamagi?");
      return;
    }
    const customer = customers[index];
    const price = salePrice(p.toppings, customer.request, p.state);
    if (!price) {
      setMessage(
        p.state === "burnt"
          ? "Kunden vil ikke have en brændt pizza. Lav en ny!"
          : p.state === "raw"
            ? "Pizzaen er ikke færdigbagt. Prøv igen med en ny pizza."
            : `${customer.name} siger: Det var ikke min bestilling. Prøv en anden kunde eller lav en ny pizza.`,
      );
      return;
    }
    remove(p.id);
    onEarn(price);
    onAward(3);
    setCustomerIds((ids) =>
      ids.map((id, slot) =>
        slot !== index
          ? id
          : (Array.from(
              { length: orders.length },
              (_, offset) => (id + offset + 1) % orders.length,
            ).find((candidate) => !ids.includes(candidate)) ?? id),
      ),
    );
    setMessage(
      `${customer.name}: Mums, lige min pizza! +${price} mønter og 3 stjerner!`,
    );
  };
  return (
    <main className="game-screen">
      <header className="game-header">
        <button
          className="round-button"
          onClick={onExit}
          aria-label="Tilbage til start"
        >
          ←
        </button>
        <div className="game-title">
          🍕 {mode === "free" ? "Fri leg" : "Mit pizzeria"}{" "}
          <span className="wallet" aria-label={`Penge: ${coins} mønter`}>
            🪙 {coins}
          </span>
        </div>
        <button
          className="round-button"
          onClick={() => {
            if (sound && "speechSynthesis" in window)
              window.speechSynthesis.cancel();
            setSound((v) => !v);
          }}
          aria-label={sound ? "Slå lyd fra" : "Slå lyd til"}
        >
          {sound ? "🔊" : "🔇"}
        </button>
      </header>
      {stage === "counter" ? (
        <Counter
          pizzas={shelf}
          selected={plate}
          onSelect={setPlate}
          customers={customers}
          onServe={serve}
          onDiscard={() => {
            if (plate) remove(plate);
            setMessage("Der er plads til en ny pizza!");
          }}
          onMake={make}
          free={mode === "free"}
          message={message}
        />
      ) : (
        <div className="game-main">
          <section className="customer-panel">
            <Chef name={chef} />
            <div className="chef-switch">
              {(["Aya", "Fraya"] as const).map((name) => (
                <button
                  key={name}
                  aria-pressed={chef === name}
                  onClick={() => setChef(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            {mode === "orders" ? (
              <>
                <div className="customer-face">{order.emoji}</div>
                <h2>{order.name}</h2>
                <button className="speech speech-button" onClick={speak}>
                  {order.message} 🔊
                </button>
                <div className="request-items">
                  {order.request.map((id) => (
                    <span
                      key={id}
                      title={ingredients.find((i) => i.id === id)?.name}
                    >
                      <IngredientArt id={id} />
                    </span>
                  ))}
                </div>
                <p>Rigtig, bagt pizza giver 🪙 10</p>
              </>
            ) : (
              <>
                <h2>Din pizzamagi!</h2>
                <p>Tegn sovs, pynt og bag. Husk at tage pizzaen ud!</p>
              </>
            )}
            {stage === "make" && (
              <button
                className="secondary-btn"
                onClick={() => setStage("counter")}
              >
                Se kunder og disk ({shelf.length})
              </button>
            )}
          </section>
          <section className="workstation">
            <div className="step-label">
              {stage === "make"
                ? "1 · LAV DIN PIZZA"
                : "2 · HOLD ØJE MED OVNEN"}
            </div>
            {stage === "bake" ? (
              <Oven toppings={toppings} onTake={take} />
            ) : (
              <>
                <Pizza
                  toppings={toppings}
                  selected={selected}
                  onPlace={(x, y) => {
                    if (selected) place(selected, x, y);
                  }}
                  onDraw={draw}
                  baked={false}
                  interactive
                />
                <p className="hint">
                  {selected === "sauce"
                    ? "🍅 Tegn med fingeren på pizzaen!"
                    : "👆 Træk fyld, eller vælg og tryk på pizzaen"}
                </p>
              </>
            )}
          </section>
          <section className="action-panel">
            {stage === "make" ? (
              <>
                <h2>Vælg dit fyld</h2>
                <button
                  className="sauce-tool"
                  aria-pressed={selected === "sauce"}
                  onClick={() => setSelected("sauce")}
                >
                  🍅 Tegn med tomatsovs
                </button>
                <div className="filling-tabs">
                  <button
                    aria-pressed={category === "normal"}
                    onClick={() => setCategory("normal")}
                  >
                    🧀 Klassisk fyld
                  </button>
                  <button
                    aria-pressed={category === "silly"}
                    onClick={() => setCategory("silly")}
                  >
                    🌈 Skørt fyld
                  </button>
                </div>
                <IngredientTray
                  category={category}
                  selected={selected}
                  onSelect={setSelected}
                  onDrop={drop}
                />
                <div className="actions-row">
                  <button
                    className="secondary-btn"
                    disabled={!toppings.length}
                    onClick={() => setToppings((old) => old.slice(0, -1))}
                  >
                    ↩ Fortryd
                  </button>
                  <button
                    className="primary-btn"
                    disabled={shelf.length >= 4}
                    onClick={() => setStage("bake")}
                  >
                    🔥 Sæt pizzaen i ovnen
                  </button>
                </div>
                <button
                  className="reset-btn"
                  onClick={() => {
                    setToppings([]);
                    setSelected("sauce");
                  }}
                >
                  Start forfra
                </button>
              </>
            ) : (
              <div className="stage-action">
                <h2>🧤 Husk din pizza!</h2>
                <p>Se den blive bagt i ovnen.</p>
                <p>🟡 Før 6 sek.: ikke færdig</p>
                <p>🟢 6–12 sek.: gylden og klar</p>
                <p>🟠 13–17 sek.: tag den ud nu!</p>
                <p>⚫ Efter 18 sek.: brændt på</p>
                <p>Tryk “Tag pizzaen ud”, og læg den på disken.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
