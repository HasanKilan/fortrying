// Localized Features.tsx — Arabic features section

import {
  Truck,
  ShieldCheck,
  RefreshCcw,
  BadgePercent,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "شحن سريع",
    description: "نوصل طلباتك خلال 2-4 أيام عمل في جميع أنحاء البلاد.",
  },
  {
    icon: ShieldCheck,
    title: "دفع آمن",
    description: "نستخدم أحدث تقنيات التشفير لحماية بياناتك.",
  },
  {
    icon: RefreshCcw,
    title: "إرجاع مجاني",
    description: "يمكنك إرجاع المنتجات خلال 14 يوماً بدون أي رسوم إضافية.",
  },
  {
    icon: BadgePercent,
    title: "خصومات حصرية",
    description: "احصل على عروض وخصومات حصرية عند الاشتراك في نشرتنا.",
  },
];

export const Features = () => {
  return (
    <section className="py-12 bg-white border-t border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center space-y-3">
              <div className="bg-gray-100 rounded-full p-3">
                <Icon className="w-6 h-6 text-trendyol-orange" />
              </div>
              <h3 className="font-semibold text-md">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
