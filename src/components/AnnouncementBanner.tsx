
// Top announcement banner similar to Trendyol's
// File path: src/components/AnnouncementBanner.tsx

import { ArrowRight } from "lucide-react";

export const AnnouncementBanner = () => {
  return (
    <div className="bg-trendyol-orange text-white w-full py-3 relative">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center">
          <span className="text-sm md:text-base font-medium">تم إطلاق موقعنا الجديد! استمتع بتجربة تسوق رائعة</span>
          <button className="bg-white text-trendyol-orange rounded-full flex items-center justify-center px-3 py-1 mr-4 text-sm font-bold">
            اطلب الآن <ArrowRight className="h-4 w-4 mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
