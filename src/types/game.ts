export type Mode = "free" | "orders";
export type Stage = "make" | "bake" | "serve";
export type IngredientId =
  | "cheese"
  | "ham"
  | "pepperoni"
  | "corn"
  | "pineapple"
  | "mushroom"
  | "pepper"
  | "olive"
  | "sauce"
  | "candy"
  | "rainbow"
  | "popcorn"
  | "strawberry"
  | "broccoli"
  | "icecream";
export type Topping = {
  id: string;
  ingredient: IngredientId;
  x: number;
  y: number;
  rotation: number;
  points?: { x: number; y: number }[];
};
export type Order = {
  name: string;
  emoji: string;
  request: IngredientId[];
  message: string;
};
