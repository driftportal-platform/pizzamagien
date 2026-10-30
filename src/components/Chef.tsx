import { assets } from "../assets";
export function Chef({ name }: { name: "Aya" | "Fraya" }) {
  return (
    <div className="chef">
      <div
        className={`chef-portrait ${name === "Aya" ? "aya" : "fraya"}`}
        style={{ backgroundImage: `url("${assets.family}")` }}
      />
      <span className="chef-hat" aria-hidden="true">
        👩‍🍳
      </span>
      <strong>Kok {name}</strong>
    </div>
  );
}
