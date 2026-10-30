export type Mode = 'free' | 'orders';
export type Stage = 'make' | 'bake' | 'serve';
export type IngredientId = 'cheese'|'ham'|'pepperoni'|'corn'|'pineapple'|'mushroom'|'pepper'|'olive';
export type Topping = { id:string; ingredient:IngredientId; x:number; y:number; rotation:number };
export type Order = { name:string; emoji:string; request:IngredientId[]; message:string };
