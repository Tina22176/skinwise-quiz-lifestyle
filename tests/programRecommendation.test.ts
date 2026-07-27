import assert from "node:assert/strict";
import test from "node:test";
import { recommendProgram } from "../src/components/Quiz/utils/programRecommendation.ts";

test("oriente une recherche simple vers Mini Glow", () => {
  const result = recommendProgram({
    primary_goal: "simplifier",
    support_level: "declic",
    skin_daily: "brille",
    skin_stress: "rien",
  });
  assert.equal(result.id, "mini-glow");
});

test("oriente une peau à stabiliser vers Skin Reboot", () => {
  const result = recommendProgram({
    primary_goal: "stabiliser",
    support_level: "mois",
    skin_daily: "touche_pas",
    skin_stress: "hypersensible",
  });
  assert.equal(result.id, "skin-reboot");
});

test("oriente les signaux cycliques vers Glow & Cycle", () => {
  const result = recommendProgram({
    primary_goal: "comprendre_cycle",
    support_level: "plusieurs_cycles",
    cycle: "spm",
    boutons_pattern: "avant_regles",
    skin_daily: "changeante",
  });
  assert.equal(result.id, "glow-and-cycle");
  assert.equal(result.cycleRelevance, 2);
  assert.equal(result.leadTemperature, "hot");
});

test("utilise Skin Reboot comme réponse prudente sans intention explicite", () => {
  const result = recommendProgram({});
  assert.equal(result.id, "skin-reboot");
});
