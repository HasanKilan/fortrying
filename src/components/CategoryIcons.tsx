
// Category icons with circular badges
// File path: src/components/CategoryIcons.tsx

import { ShoppingBag, Gift, Percent, Coffee, CreditCard, Tag, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "العروض",
    icon: Percent,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500",
    badge: "جديد"
  },
  {
    name: "أفضل الأسعار",
    icon: Tag,
    bgColor: "bg-violet-100",
    iconColor: "text-violet-500"
  },
  {
    name: "اشتري الآن",
    icon: ShoppingBag,
    bgColor: "bg-indigo-100", 
    iconColor: "text-indigo-500"
  },
  {
    name: "عروض مميزة",
    icon: Gift,
    bgColor: "bg-red-100",
    iconColor: "text-red-500"
  },
  {
    name: "كوبونات خصم",
    icon: Zap,
    bgColor: "bg-amber-100",
    iconColor: "text-amber-500",
    badge: "جديد"
  },
  {
    name: "الائتمان",
    icon: CreditCard,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500"
  },
  {
    name: "مطاعم",
    icon: Coffee,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
    badge: "جديد"
  }
];

export const CategoryIcons = () => {
  return (
    <div className="py-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex overflow-x-auto gap-6 justify-center pb-2">
          {categories.map((category) => (
            <Link to="#" key={category.name} className="flex flex-col items-center min-w-[80px] group">
              <div className={`relative w-16 h-16 rounded-full ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <category.icon className={`h-7 w-7 ${category.iconColor}`} />
                {category.badge && (
                  <span className="absolute -top-1 -left-1 bg-trendyol-orange text-white text-[10px] px-1 py-0.5 rounded-full">
                    {category.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-2 text-center font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
