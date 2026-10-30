import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Chef } from "../components/Chef";
import { Oven } from "../components/Oven";
import { dropPosition } from "../game/logic";
import { Pizza } from "../components/Pizza";
import { IngredientTray } from "../components/IngredientTray";
import { ingredients } from "../data/ingredients";
import { orders } from "../data/orders";
import { evaluateOrder, randomId } from "../game/logic";
import type { IngredientId, Mode, Stage, Topping } from "../types/game";
export function Kitchen({
  mode,
  onExit,
  onAward,
}: {
  mode: Mode;
  onExit: () => void;
  onAward: (n: number) => void;
}) {
  const [chef, setChef] = useState<"Aya" | "Fraya">("Aya");
  useEffect(
    () => () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    [],
  );
  const [stage, setStage] = useState<Stage>("make");
  const [selected, setSelected] = useState<IngredientId | null>("cheese");
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [orderIndex, setOrderIndex] = useState(0);
  const [sound, setSound] = useState(true);
  const [result, setResult] = useState<number | null>(null);
  const order = orders[orderIndex % orders.length];
  const speak = (message: string) => {
    if (!sound || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "da-DK";
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
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
  const add = (x: number, y: number) => {
    if (selected) place(selected, x, y);
  };
  const drop = (id: IngredientId, x: number, y: number) => {
    const el = document.querySelector("[data-pizza]");
    if (!el) return;
    const point = dropPosition(x, y, el.getBoundingClientRect());
    if (point) place(id, point.x, point.y);
  };
  const reset = () => {
    setToppings([]);
    setStage("make");
    setResult(null);
    setSelected("cheese");
  };
  const serve = () => {
    if (mode === "orders") {
      const stars = evaluateOrder(toppings, order.request);
      setResult(stars);
      onAward(stars);
    } else setResult(3);
    setStage("serve");
  };
  const next = () => {
    setOrderIndex((i) => i + 1);
    reset();
  };
  return (
    <main className="game-screen">
      <header className="game-header">
        <button
          className="round-button"
          onClick={onExit}
          aria-label="Tilbage til start"
        >
          <ArrowLeft />
        </button>
        <div className="game-title">
          🍕 {mode === "free" ? "Fri leg" : "Mit pizzeria"}
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
          {sound ? <Volume2 /> : <VolumeX />}
        </button>
      </header>
      <div className="game-main">
        <section className="customer-panel">
          <Chef name={chef} />
          <div className="chef-switch" aria-label="Vælg kok">
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
              <div
                className="speech"
                onClick={() => speak(order.message)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") speak(order.message);
                }}
              >
                {order.message} 🔊
              </div>
              <div className="request-items">
                {order.request.map((i) => (
                  <span
                    key={i}
                    title={ingredients.find((a) => a.id === i)?.name}
                  >
                    {ingredients.find((a) => a.id === i)?.emoji}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="customer-face">👩‍🍳</div>
              <h2>Din pizzamagi!</h2>
              <p>Træk fyld på pizzaen, eller vælg og tryk. Du bestemmer!</p>
              <div className="sparkle">✨ 🌈 ✨</div>
            </>
          )}
        </section>
        <section className="workstation">
          <div className="step-label">
            {stage === "make"
              ? "1 · PYNT DIN PIZZA"
              : stage === "bake"
                ? "2 · BAG DIN PIZZA"
                : "3 · SERVER DIN PIZZA"}
          </div>
          <Pizza
            toppings={toppings}
            selected={stage === "make" ? selected : null}
            onPlace={add}
            baked={stage !== "make"}
            interactive={stage === "make"}
          />
          {stage === "make" ? (
            <p className="hint">
              👆 Træk dit fyld, eller vælg og tryk på pizzaen
            </p>
          ) : stage === "bake" ? (
            <p className="hint">🔥 Mmm! Pizzaen er i ovnen!</p>
          ) : (
            <div className="celebrate" role="status">
              🎉{" "}
              {mode === "orders"
                ? `Du fik ${result} ${result === 1 ? "stjerne" : "stjerner"}!`
                : "Sikke en flot pizza!"}
            </div>
          )}
        </section>
        <section className="action-panel">
          {stage === "make" ? (
            <>
              <h2>Vælg dit fyld</h2>
              <IngredientTray
                selected={selected}
                onSelect={setSelected}
                onDrop={drop}
              />
              <div className="actions-row">
                <button
                  className="secondary-btn"
                  onClick={() => setToppings((old) => old.slice(0, -1))}
                  disabled={!toppings.length}
                >
                  ↩ Fortryd
                </button>
                <button
                  className="primary-btn"
                  onClick={() => {
                    setStage("bake");
                    setSelected(null);
                  }}
                >
                  Til ovnen <ArrowRight size={18} />
                </button>
              </div>
            </>
          ) : stage === "bake" ? (
            <Oven onReady={serve} />
          ) : (
            <div className="stage-action">
              <div className="big-stars">
                {mode === "orders" ? "⭐".repeat(result || 1) : "🥳🍕🎈"}
              </div>
              <h2>Velbekomme!</h2>
              <p>
                {mode === "orders"
                  ? "Kunden siger tusind tak!"
                  : "Du er en fantastisk pizzakok!"}
              </p>
              <button
                className="primary-btn"
                onClick={mode === "orders" ? next : reset}
              >
                {mode === "orders" ? "Næste kunde" : "Lav en ny pizza"}{" "}
                <ArrowRight size={18} />
              </button>
            </div>
          )}
          {stage === "make" && (
            <button className="reset-btn" onClick={reset}>
              <RotateCcw size={15} /> Start forfra
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
