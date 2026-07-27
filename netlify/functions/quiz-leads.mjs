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

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "method_not_allowed" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID || "9");
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

  const email = clean(input.email, 254).toLowerCase();
  const firstName = clean(input.firstName, 80);
  const recommendation = clean(input.recommendedProgram, 40);
  if (!EMAIL_PATTERN.test(email) || !firstName || !input.gdprConsent) {
    return json(400, { error: "invalid_lead" });
  }
  if (!ALLOWED_PROGRAMS.has(recommendation)) {
    return json(400, { error: "invalid_recommendation" });
  }

  const attributes = {
    FIRSTNAME: firstName,
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
    QUIZ_DATE: new Date().toISOString().slice(0, 10),
    ORIGIN: "quiz_skinwise",
  };

  const response = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email,
      attributes,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Brevo contact error", response.status, details.slice(0, 300));
    return json(502, { error: "lead_provider_error" });
  }

  return json(200, { success: true });
};
