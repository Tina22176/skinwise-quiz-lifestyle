import { 
  Flame, 
  Moon, 
  Calendar, 
  Sparkles, 
  Heart,
  LucideIcon
} from "lucide-react";

interface HormoneIconProps {
  profile: string;
  size?: number;
  className?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  "réactive_pression": Flame,
  "fatiguée_survie": Moon,
  "controlleuse_débordée": Sparkles,
  "cyclique_subit": Calendar,
  "sensible_caméléon": Heart,
};

export const HormoneIcon = ({ 
  profile, 
  size = 24, 
  className = "" 
}: HormoneIconProps) => {
  const IconComponent = ICON_MAP[profile] || Sparkles;
  
  return (
    <IconComponent 
      size={size} 
      className={className}
      aria-hidden="true"
    />
  );
};

export const getHormoneIconName = (profile: string): string => {
  const iconNames: Record<string, string> = {
    "réactive_pression": "flame",
    "fatiguée_survie": "moon",
    "controlleuse_débordée": "sparkles",
    "cyclique_subit": "calendar",
    "sensible_caméléon": "heart",
  };
  return iconNames[profile] || "sparkles";
};
