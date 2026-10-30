import { test } from "node:test";
import assert from "node:assert/strict";
import { dropPosition, evaluateOrder } from "../src/game/logic.ts";
import type { IngredientId } from "../src/types/game.ts";
const pizza = (ids: IngredientId[]) =>
  ids.map((ingredient, i) => ({
    id: String(i),
    ingredient,
    x: 50,
    y: 50,
    rotation: 0,
  }));
test("Exact order earns three stars, duplicates do not change the recipe", () => {
  assert.equal(
    evaluateOrder(pizza(["cheese", "ham", "ham"]), ["cheese", "ham"]),
    3,
  );
});
test("Missing and extra ingredients earn gentle partial rewards", () => {
  assert.equal(evaluateOrder([], ["cheese", "ham"]), 1);
  assert.equal(evaluateOrder(pizza(["cheese"]), ["cheese", "ham"]), 2);
  assert.equal(
    evaluateOrder(pizza(["cheese", "ham", "corn"]), ["cheese", "ham"]),
    2,
  );
});
test("Drops use viewport coordinates and reject crust and outside areas", () => {
  const r = { left: 100, top: 200, width: 400, height: 400 };
  assert.deepEqual(dropPosition(300, 400, r), { x: 50, y: 50 });
  assert.equal(dropPosition(100, 200, r), null);
  assert.equal(dropPosition(700, 400, r), null);
  assert.equal(dropPosition(300, 400, { ...r, width: 0 }), null);
});
