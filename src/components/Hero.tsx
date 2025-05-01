// Localized Hero.tsx — Arabic marketing banner section

import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <div className="relative bg-gradient-to-l from-gray-900 to-gray-800 text-white w-full overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row-reverse items-center">
        <div className="md:w-1/2 md:pl-8 mb-8 md:mb-0 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">مجموعة ربيع 2025</h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            اكتشف أحدث صيحات الموضة مع مجموعتنا الجديدة لهذا الموسم. خصومات تصل إلى 50٪ على منتجات مختارة.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-trendyol-orange hover:bg-trendyol-orange/90 text-white"
            >
              تسوّق الآن
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent hover:bg-white/10 text-white border-white"
            >
              اعرف المزيد
            </Button>
          </div>
        </div>

        <div className="md:w-1/2 relative">
          <div className="rounded-lg bg-white/10 p-2 shadow-xl animate-fade-in">
            <div className="aspect-[4/3] rounded overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="مجموعة الربيع" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-trendyol-orange text-white font-bold px-4 py-2 rounded-lg shadow-lg transform md:scale-110 animate-fade-in">
            <p className="text-sm">لفترة محدودة</p>
            <p className="text-xl">-50٪</p>
          </div>
        </div>
      </div>
    </div>
  );
};