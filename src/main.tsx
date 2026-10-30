import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./screens/Home";
import { Kitchen } from "./screens/Kitchen";
import { loadStars, saveStars } from "./game/logic";
import type { Mode } from "./types/game";
import { loadCoins, saveCoins } from "./game/baking";
import "./styles/main.css";
function App() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [coins, setCoins] = useState(loadCoins);
  useEffect(() => saveCoins(coins), [coins]);
  const [stars, setStars] = useState(loadStars);
  useEffect(() => saveStars(stars), [stars]);
  const award = (n: number) => setStars((s) => s + n);
  return mode ? (
    <Kitchen
      mode={mode}
      onExit={() => setMode(null)}
      onAward={award}
      coins={coins}
      onEarn={(n) => setCoins((c) => c + n)}
    />
  ) : (
    <Home onStart={setMode} stars={stars} coins={coins} />
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
