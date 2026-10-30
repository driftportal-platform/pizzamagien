import { test } from "node:test";
import assert from "node:assert/strict";
import { bakeState, salePrice } from "../src/game/baking.ts";
import type { IngredientId } from "../src/types/game.ts";
const pizza = (ids: IngredientId[]) =>
  ids.map((ingredient, i) => ({
    id: String(i),
    ingredient,
    x: 50,
    y: 50,
    rotation: 0,
  }));
test("Oven boundaries: raw, ready, warning, burnt", () => {
  assert.equal(bakeState(0), "raw");
  assert.equal(bakeState(5.999), "raw");
  assert.equal(bakeState(6), "ready");
  assert.equal(bakeState(12.999), "ready");
  assert.equal(bakeState(13), "warning");
  assert.equal(bakeState(17.999), "warning");
  assert.equal(bakeState(18), "burnt");
  assert.equal(bakeState(90), "burnt");
});
test("Only an exact, cooked order earns coins; sauce and duplicates are optional", () => {
  const toppings = pizza(["sauce", "cheese", "ham", "ham"]);
  assert.equal(salePrice(toppings, ["cheese", "ham"], "ready"), 10);
  assert.equal(salePrice(toppings, ["cheese", "ham"], "warning"), 10);
  assert.equal(salePrice(toppings, ["cheese", "ham"], "raw"), 0);
  assert.equal(salePrice(toppings, ["cheese", "ham"], "burnt"), 0);
  assert.equal(salePrice(toppings, ["cheese", "corn"], "ready"), 0);
  assert.equal(
    salePrice(pizza(["cheese", "ham", "rainbow"]), ["cheese", "ham"], "ready"),
    0,
  );
  assert.equal(salePrice([], ["cheese", "ham"], "ready"), 0);
});
