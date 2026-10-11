// Capture des leads du quiz peau (quiz.majoliepeau.com).
//
// Deux choses distinctes, deux règles distinctes :
// - le guide par email est ce que la personne demande en donnant son adresse :
//   elle rejoint la liste du quiz (BREVO_LIST_ID), qui ne doit servir qu'à
//   envoyer ce guide ;
// - les conseils et offres sont un choix séparé, facultatif : la liste
//   marketing (BREVO_MARKETING_LIST_ID) seulement si `marketingConsent === true`.
//
// On n'envoie jamais `emailBlacklisted` : une personne désinscrite le reste.

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_PROGRAMS = new Set(["mini-glow", "skin-reboot", "glow-and-cycle"]);

const json = (status, body) => ({
  statusCode: status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  },
  body: JSON.stringify(body),
});

const clean = (value, max = 180) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const listId = (raw, fallback) => {
  const n = Number(raw || fallback);
  return Number.isInteger(n) && n > 0 ? n : null;
};

/**
 * Contact Brevo à créer ou mettre à jour, ou une erreur de validation.
 * Exportée pour les tests : aucune dépendance réseau.
 */
export function buildBrevoContact(input, env = {}, now = new Date()) {
  const email = clean(input?.email, 254).toLowerCase();
  const firstName = clean(input?.firstName, 80);
  const recommendation = clean(input?.recommendedProgram, 40);
  if (!EMAIL_PATTERN.test(email) || !firstName) return { error: "invalid_lead" };
  if (!ALLOWED_PROGRAMS.has(recommendation)) return { error: "invalid_recommendation" };

  const guideListId = listId(env.BREVO_LIST_ID, "9");
  // « Newsletters MJP » : la liste des envois marketing.
  const marketingListId = listId(env.BREVO_MARKETING_LIST_ID, "10");
  if (!guideListId) return { error: "lead_service_unavailable" };

  // Seul `true` vaut un oui : ni "true", ni 1, ni l'ancien `gdprConsent`.
  const marketing = input?.marketingConsent === true;

  // PRENOM existe dans le compte. Les attributs du quiz ne partent qu'une fois
  // créés dans Brevo (BREVO_QUIZ_ATTRIBUTES=true), pour ne pas risquer un refus.
  const attributes = { PRENOM: firstName };
  if (marketing) attributes.CONSENT_MARKETING = "yes";
  if (env.BREVO_QUIZ_ATTRIBUTES === "true") {
    Object.assign(attributes, {
      SKIN_PROFILE: clean(input.skinProfile, 80),
      RECOMMENDED_PROGRAM: recommendation,
      SECONDARY_PROGRAM: clean(input.secondaryProgram, 40),
      LEAD_TEMPERATURE: clean(input.leadTemperature, 20),
      PROFILE_CONFIDENCE: Number(input.confidence || 0),
      CYCLE_RELEVANCE: Number(input.cycleRelevance || 0),
      QUIZ_SOURCE: clean(input.source, 80) || "direct",
      UTM_SOURCE: clean(input.utm?.source, 120),
      UTM_MEDIUM: clean(input.utm?.medium, 120),
      UTM_CAMPAIGN: clean(input.utm?.campaign, 120),
      UTM_CONTENT: clean(input.utm?.content, 120),
      QUIZ_ANSWERS: JSON.stringify(input.answers || {}).slice(0, 1800),
      QUIZ_COMPLETED: true,
      QUIZ_DATE: now.toISOString().slice(0, 10),
      ORIGIN: "quiz_skinwise",
    });
  }

  const listIds = [guideListId];
  if (marketing && marketingListId && marketingListId !== guideListId) {
    listIds.push(marketingListId);
  }

  return {
    contact: { email, attributes, listIds, updateEnabled: true },
    marketing,
  };
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "method_not_allowed" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY is not configured");
    return json(503, { error: "lead_service_unavailable" });
  }

  let input;
  try {
    input = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const built = buildBrevoContact(input, process.env);
  if (built.error) {
    return json(built.error === "lead_service_unavailable" ? 503 : 400, { error: built.error });
  }

  const response = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(built.contact),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Brevo contact error", response.status, details.slice(0, 300));
    return json(502, { error: "lead_provider_error" });
  }

  return json(200, { success: true, subscribed: built.marketing });
};
