import { assets } from "../assets";
import type { Mode } from "../types/game";
export function Home({
  onStart,
  stars,
}: {
  onStart: (mode: Mode) => void;
  stars: number;
}) {
  return (
    <main className="home">
      <div className="home-top">
        <div className="brand-small">✨ ET HYGGELIGT PIZZASPIL ✨</div>
        <h1>🍕 PizzaMagien</h1>
        <p>Pizzahygge med Aya, Fraya og vennerne!</p>
      </div>
      <div className="home-body">
        <div className="home-art">
          <img
            src={assets.family}
            alt="Tegneserieillustration med to børn og deres dyr"
          />
        </div>
        <div className="home-actions">
          <button className="hero-btn free" onClick={() => onStart("free")}>
            <span>🎨</span>
            <strong>Fri leg</strong>
            <small>Lav din helt egen pizza</small>
          </button>
          <button className="hero-btn orders" onClick={() => onStart("orders")}>
            <span>🛎️</span>
            <strong>Mit pizzeria</strong>
            <small>Lav pizzaer til kunder</small>
          </button>
          <div className="stars">⭐ {stars} stjerner samlet</div>
        </div>
      </div>
    </main>
  );
}
