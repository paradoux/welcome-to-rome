import {
  Building2,
  Coffee,
  IceCreamBowl,
  Landmark,
  Martini,
  Trees,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/data/resources";

const icons: Record<Category, LucideIcon> = {
  restaurants: Utensils,
  gelaterie: IceCreamBowl,
  bars: Martini,
  cafes: Coffee,
  rooftops: Building2,
  culture: Landmark,
  balades: Trees,
};

export function CategoryIcon({ category, className }: { category: Category; className?: string }) {
  const Icon = icons[category];
  return <Icon className={className} aria-hidden="true" />;
}
