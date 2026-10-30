import type { IngredientId } from "../types/game";
export const ingredients: {
  id: IngredientId;
  name: string;
  emoji: string;
  color: string;
  category?: "silly";
}[] = [
  { id: "sauce", name: "Tomatsovs", emoji: "🍅", color: "#d94b36" },
  {
    id: "candy",
    name: "Slik",
    emoji: "🍬",
    color: "#ffc4e4",
    category: "silly",
  },
  {
    id: "rainbow",
    name: "Regnbue",
    emoji: "🌈",
    color: "#d9ceff",
    category: "silly",
  },
  {
    id: "popcorn",
    name: "Popcorn",
    emoji: "🍿",
    color: "#fff1b8",
    category: "silly",
  },
  {
    id: "strawberry",
    name: "Jordbær",
    emoji: "🍓",
    color: "#ffd4d4",
    category: "silly",
  },
  {
    id: "broccoli",
    name: "Broccoli",
    emoji: "🥦",
    color: "#d4efbb",
    category: "silly",
  },
  {
    id: "icecream",
    name: "Is",
    emoji: "🍦",
    color: "#ffe2b5",
    category: "silly",
  },
  { id: "cheese", name: "Ost", emoji: "🧀", color: "#ffe177" },
  { id: "ham", name: "Skinke", emoji: "🥓", color: "#f7a6a5" },
  { id: "pepperoni", name: "Pepperoni", emoji: "🔴", color: "#cb5548" },
  { id: "corn", name: "Majs", emoji: "🌽", color: "#f4d246" },
  { id: "pineapple", name: "Ananas", emoji: "🍍", color: "#ffd45d" },
  { id: "mushroom", name: "Champignon", emoji: "🍄", color: "#d5b59c" },
  { id: "pepper", name: "Peberfrugt", emoji: "🫑", color: "#75b66c" },
  { id: "olive", name: "Oliven", emoji: "🫒", color: "#454c39" },
];
