import { useEffect, useState } from "react";
export function Oven({ onReady }: { onReady: () => void }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setSeconds((s) => Math.min(5, s + 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);
  const ready = seconds === 5;
  return (
    <div className="stage-action">
      <div className={`magic-oven ${ready ? "ready" : ""}`} aria-hidden="true">
        <div className="oven-knobs">● ● ●</div>
        <div className="oven-window">
          <span className="oven-pizza">🍕</span>
          <span className="flames">🔥 🔥 🔥</span>
        </div>
      </div>
      <h2>{ready ? "Ding! Pizzaen er klar!" : "Nu bager vi!"}</h2>
      <progress max={5} value={seconds} aria-label="Bagetid" />
      <p role="status">
        {ready
          ? "Tid til at servere!"
          : `Pizzaen hygger sig i ovnen … ${5 - seconds}`}
      </p>
      <button className="primary-btn" disabled={!ready} onClick={onReady}>
        🔔 Server pizza
      </button>
    </div>
  );
}
