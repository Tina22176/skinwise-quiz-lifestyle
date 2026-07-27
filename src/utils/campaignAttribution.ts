export interface CampaignAttribution {
  source: string;
  medium: string;
  campaign: string;
  content: string;
}

const STORAGE_KEY = "skinwise_campaign_attribution";

export const captureCampaignAttribution = (): CampaignAttribution => {
  const params = new URLSearchParams(window.location.search);
  const current: CampaignAttribution = {
    source: params.get("utm_source") || params.get("source") || "direct",
    medium: params.get("utm_medium") || "",
    campaign: params.get("utm_campaign") || "",
    content: params.get("utm_content") || "",
  };

  const hasCampaign = current.source !== "direct" || current.medium || current.campaign || current.content;
  if (hasCampaign) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return current;
  }

  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) as CampaignAttribution : current;
  } catch {
    return current;
  }
};
