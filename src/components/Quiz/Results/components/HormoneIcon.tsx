import { 
  Flame, 
  Moon, 
  Calendar, 
  Sparkles, 
  Droplets, 
  Heart,
  LucideIcon
} from "lucide-react";

interface HormoneIconProps {
  profile: string;
  size?: number;
  className?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  "stressée_inflammée": Flame,
  "fatiguée_tension": Moon,
  "cyclique_congestionnée": Calendar,
  "brillante_déséquilibrée": Sparkles,
  "sèche_instable": Droplets,
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
    "stressée_inflammée": "flame",
    "fatiguée_tension": "moon",
    "cyclique_congestionnée": "calendar",
    "brillante_déséquilibrée": "sparkles",
    "sèche_instable": "droplets",
    "sensible_caméléon": "heart",
  };
  return iconNames[profile] || "sparkles";
};