import type { Order } from "../types/game";
export const orders: Order[] = [
  {
    name: "Loui",
    emoji: "🐱",
    request: ["cheese", "ham"],
    message: "Miau! Jeg vil gerne have ost og skinke!",
  },
  {
    name: "Willa",
    emoji: "🐶",
    request: ["cheese", "pepperoni", "corn"],
    message: "Vuf! Ost, pepperoni og majs, tak!",
  },
  {
    name: "Kanin",
    emoji: "🐰",
    request: ["cheese", "corn", "pepper"],
    message: "Mums! Jeg elsker ost, majs og peberfrugt!",
  },
  {
    name: "Kaninens ven",
    emoji: "🐰",
    request: ["cheese", "mushroom", "olive"],
    message: "Jeg ønsker ost, champignon og oliven!",
  },
];
