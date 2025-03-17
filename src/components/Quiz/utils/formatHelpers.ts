
// Helper function to convert the result value to the exact format Klaviyo expects
export const getSkinTypeFormatted = (skinType: string | null): string => {
  if (!skinType) return "normal";
  return skinType.toLowerCase();
};
