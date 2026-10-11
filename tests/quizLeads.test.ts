import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildBrevoContact } from "../netlify/functions/quiz-leads.mjs";

/**
 * Le guide par email et les conseils sont deux choix distincts : donner son
 * adresse pour recevoir son guide n'inscrit pas aux conseils et offres.
 */

const lead = {
  email: " Lea@Example.com ",
  firstName: "Léa",
  recommendedProgram: "mini-glow",
  skinProfile: "reactive",
  answers: { a: "b" },
  utm: { source: "instagram" },
};

test("sans case cochée : liste du guide seulement, aucune trace marketing", () => {
  const { contact, marketing } = buildBrevoContact(lead, {});
  assert.equal(marketing, false);
  assert.deepEqual(contact.listIds, [9]);
  assert.equal(contact.email, "lea@example.com");
  assert.ok(!("CONSENT_MARKETING" in contact.attributes));
});

test("seul true vaut un oui", () => {
  for (const marketingConsent of ["true", 1, "yes", undefined]) {
    assert.deepEqual(buildBrevoContact({ ...lead, marketingConsent }, {}).contact.listIds, [9]);
  }
  // L'ancien champ du formulaire ne vaut pas consentement aux conseils.
  assert.deepEqual(buildBrevoContact({ ...lead, gdprConsent: true }, {}).contact.listIds, [9]);
});

test("case cochée : liste marketing en plus, consentement noté", () => {
  const { contact, marketing } = buildBrevoContact({ ...lead, marketingConsent: true }, {
    BREVO_LIST_ID: "9",
    BREVO_MARKETING_LIST_ID: "10",
  });
  assert.equal(marketing, true);
  assert.deepEqual(contact.listIds, [9, 10]);
  assert.equal(contact.attributes.CONSENT_MARKETING, "yes");
});

test("ne touche jamais à la liste noire", () => {
  const { contact } = buildBrevoContact({ ...lead, marketingConsent: true }, {});
  assert.ok(!("emailBlacklisted" in contact));
  assert.ok(!("smsBlacklisted" in contact));
  const source = readFileSync(new URL("../netlify/functions/quiz-leads.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /(email|sms)Blacklisted\s*:/);
});

test("attributs du quiz seulement une fois créés dans Brevo", () => {
  assert.deepEqual(Object.keys(buildBrevoContact(lead, {}).contact.attributes), ["PRENOM"]);
  const withAttrs = buildBrevoContact(lead, { BREVO_QUIZ_ATTRIBUTES: "true" }, new Date("2026-10-11T10:00:00Z"));
  assert.equal(withAttrs.contact.attributes.RECOMMENDED_PROGRAM, "mini-glow");
  assert.equal(withAttrs.contact.attributes.QUIZ_DATE, "2026-10-11");
});

test("rejette un lead invalide", () => {
  assert.equal(buildBrevoContact({ ...lead, email: "pas-un-email" }, {}).error, "invalid_lead");
  assert.equal(buildBrevoContact({ ...lead, recommendedProgram: "autre" }, {}).error, "invalid_recommendation");
});

test("le formulaire ne conditionne plus le guide à la case conseils", () => {
  const gate = readFileSync(
    new URL("../src/components/Quiz/Results/components/ProfileTeaserGate.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(gate, /type="checkbox"[\s\S]{0,200}required/);
  assert.doesNotMatch(gate, /disabled=\{[^}]*Consent/);
});
