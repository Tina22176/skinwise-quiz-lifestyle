import assert from "node:assert/strict";
import test from "node:test";
import { calculateHormoneProfile } from "../src/components/Quiz/utils/hormoneProfileCalculator.ts";
import { getHormoneProfileDetails, HORMONE_PROFILE_DETAILS } from "../src/components/Quiz/Results/utils/HormoneProfileDetails.ts";
import { getProgram, recommendProgram } from "../src/components/Quiz/utils/programRecommendation.ts";

test("ne déduit ni fatigue ni réactivité quand aucune gêne n'est rapportée", () => {
  for (const age_range of ["moins_25", "25_34", "35_44", "45_plus", "sans_reponse"]) {
    const result = calculateHormoneProfile({ age_range, skin_daily: "confortable", boutons_pattern: "pas_souci", skin_stress: "rien", energie: "stable", routine: "simple_stable" });
    assert.equal(result.type, "à_observer");
    assert.equal(result.confidence, 0);
  }
  assert.equal(calculateHormoneProfile({}).type, "à_observer");
});

test("les cinq profils restent accessibles par des réponses pertinentes", () => {
  const cases = [
    [{ skin_daily: "touche_pas", skin_stress: "explose" }, "réactive_pression"],
    [{ energie: "fatiguee_reveil", skin_stress: "ternit" }, "fatiguée_survie"],
    [{ routine: "accumule_change" }, "controlleuse_débordée"],
    [{ boutons_pattern: "avant_regles", cycle_signals: "spm" }, "cyclique_subit"],
    [{ skin_daily: "changeante", skin_stress: "hypersensible" }, "sensible_caméléon"],
  ] as const;
  for (const [answers, expected] of cases) assert.equal(calculateHormoneProfile(answers).type, expected);
});

test("peau grasse, âge et énergie stable ne suffisent pas à attribuer un comportement de routine", () => {
  assert.notEqual(calculateHormoneProfile({ age_range: "25_34", skin_daily: "brille", skin_stress: "rien", energie: "stable" }).type, "controlleuse_débordée");
});

test("microkystes, peau mixte et coups de barre ne prouvent pas un schéma cyclique", () => {
  const result = calculateHormoneProfile({ boutons_pattern: "microkystes", skin_daily: "indecise", energie: "coups_barre" });
  assert.notEqual(result.type, "cyclique_subit");
  assert.equal(result.recommendation.cycleRelevance, 0);
});

test("les conseils cycliques s'adaptent à la contraception, à l'absence de règles et au choix de ne pas répondre", () => {
  for (const cycle of ["contraceptif", "plus_cycle", "sans_reponse"]) {
    const result = calculateHormoneProfile({ cycle, cycle_signals: "recurrent" });
    const detail = getHormoneProfileDetails(result.type, result.cycleContext);
    assert.equal(result.type, "cyclique_subit");
    assert.equal(result.cycleContext, "observations");
    assert.match(detail.besoin, /sans imposer un calendrier/);
    assert.deepEqual(result.lifestyle, detail.gestes);
    assert.match(detail.gestes[0], /sans devoir renseigner un jour de cycle/);
    assert.equal(recommendProgram({ cycle, primary_goal: "comprendre_cycle" }).id, "glow-and-cycle");
  }
  const calendar = calculateHormoneProfile({ cycle: "regulier", boutons_pattern: "avant_regles" });
  assert.equal(calendar.cycleContext, "calendar");
  assert.match(getHormoneProfileDetails(calendar.type, calendar.cycleContext).gestes[0], /jour du cycle/);
});

test("un objectif de simplification prime sur les signaux cycliques et sur le rythme contradictoire", () => {
  const signals = { cycle_signals: "spm", boutons_pattern: "avant_regles", skin_daily: "changeante" };
  for (const support_level of ["declic", "mois", "plusieurs_cycles"]) {
    const result = recommendProgram({ ...signals, primary_goal: "simplifier", support_level });
    assert.equal(result.id, "mini-glow");
    assert.match(result.reason, /simplifier/);
    assert.notEqual(result.id, result.secondaryId);
  }
});

test("chaque objectif explicite prime pour tous les contextes de peau et de cycle", () => {
  const goals = { simplifier: "mini-glow", stabiliser: "skin-reboot", comprendre_cycle: "glow-and-cycle" };
  for (const [primary_goal, expected] of Object.entries(goals)) {
    for (const support_level of ["declic", "mois", "plusieurs_cycles"]) {
      for (const skin_daily of ["brille", "touche_pas", "changeante"]) {
        for (const skin_stress of ["rien", "hypersensible"]) {
          const result = recommendProgram({ primary_goal, support_level, skin_daily, skin_stress, cycle_signals: "spm", boutons_pattern: "avant_regles" });
          assert.equal(result.id, expected);
        }
      }
    }
  }
});

test("tarifs, noms et modalités sont alignés sur le shop sans garantie inventée", () => {
  assert.equal(getProgram("mini-glow").name, "Glow Express");
  assert.match(getProgram("skin-reboot").price, /149 €/);
  const cycle = getProgram("glow-and-cycle");
  assert.equal(cycle.price, "19,99 €/mois");
  assert.match(cycle.reassurance, /49 €\/trimestre ou 149 €\/an/);
  assert.match(cycle.reassurance, /Renouvellement automatique/);
  assert.doesNotMatch(cycle.reassurance, /Garantie|30 jours|299/);
  for (const detail of Object.values(HORMONE_PROFILE_DETAILS)) {
    assert.equal(detail.gestes.length, 3);
    assert.equal("programPrice" in detail, false);
  }
});
