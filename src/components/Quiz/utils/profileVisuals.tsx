import { Flame, Moon, Sparkles, Calendar, Heart, type LucideIcon } from "lucide-react";

/* Mapping nom d'icône (champ `icon` de HormoneProfileDetails) → composant Lucide.
   Centralisé pour rester cohérent entre la home, le teaser et les résultats. */
export const PROFILE_ICONS: Record<string, LucideIcon> = {
  flame: Flame,
  moon: Moon,
  sparkles: Sparkles,
  calendar: Calendar,
  heart: Heart,
};

export const getProfileIcon = (icon: string): LucideIcon => PROFILE_ICONS[icon] ?? Sparkles;

/* Halo + couleur d'icône par profil — reste dans la famille chromatique de la marque */
export const PROFILE_THEME: Record<string, { halo: string; ring: string; icon: string }> = {
  red:    { halo: "#FBEAF2", ring: "rgba(212,100,154,0.22)", icon: "#D4649A" },
  pink:   { halo: "#FBEAF2", ring: "rgba(224,119,173,0.22)", icon: "#E077AD" },
  purple: { halo: "#EDE5F4", ring: "rgba(138,107,160,0.22)", icon: "#8A6BA0" },
  blue:   { halo: "#EBE0F5", ring: "rgba(168,148,226,0.22)", icon: "#8A6BA0" },
  green:  { halo: "#E3F0E6", ring: "rgba(120,170,130,0.28)", icon: "#5E9A6E" },
};

export const getProfileTheme = (colorTheme: string) => PROFILE_THEME[colorTheme] ?? PROFILE_THEME.pink;
