import { useCallback } from "react";
import { LEAD_CAPTURE_ENDPOINT } from "@/config/brevo";
import { CampaignAttribution } from "@/utils/campaignAttribution";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";

interface LeadPayload {
  email: string;
  firstName: string;
  profile: HormoneProfile;
  answers: Record<string, string>;
  attribution: CampaignAttribution;
  /** Conseils et offres : choix séparé, facultatif. Le guide part sans. */
  marketingConsent: boolean;
}

export const useBrevoIntegration = () => {
  const subscribeToNewsletter = useCallback(async ({
    email,
    firstName,
    profile,
    answers,
    attribution,
    marketingConsent,
  }: LeadPayload) => {
    const response = await fetch(LEAD_CAPTURE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        firstName,
        marketingConsent: marketingConsent === true,
        skinProfile: profile.type,
        recommendedProgram: profile.recommendation.id,
        secondaryProgram: profile.recommendation.secondaryId,
        leadTemperature: profile.recommendation.leadTemperature,
        confidence: profile.confidence,
        cycleRelevance: profile.recommendation.cycleRelevance,
        answers,
        source: attribution.source,
        utm: attribution,
      }),
    });

    if (!response.ok) {
      throw new Error(`Lead capture failed (${response.status})`);
    }

    return { success: true };
  }, []);

  return { subscribeToNewsletter };
};
