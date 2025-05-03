
// Updated Hero component with Trendyol-style carousel banner
// File path: src/components/Hero.tsx

import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const banners = [
  {
    id: "1",
    title: "تشكيلة الربيع 2025",
    subtitle: "أزياء عصرية بأسعار مناسبة",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: "from-rose-900/80 to-rose-900/50",
    actionText: "تسوق الآن"
  },
  {
    id: "2",
    title: "تخفيضات حتى 70%",
    subtitle: "على مجموعة مختارة من الملابس والأحذية",
    image: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "from-blue-900/80 to-blue-900/50",
    actionText: "اكتشف العروض"
  },
  {
    id: "3",
    title: "أحدث الإصدارات",
    subtitle: "وصل حديثاً - تشكيلة جديدة من أشهر الماركات",
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "from-green-900/80 to-green-900/50",
    actionText: "استكشف الآن"
  }
];

export const Hero = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goToPrev = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };
  
  const goToNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };
  
  const banner = banners[currentBanner];
  
  return (
    <div className="relative w-full">
      {/* Main Banner */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        {banners.map((b, index) => (
          <div 
            key={b.id} 
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l bg-black/30"></div>
            <img 
              src={b.image} 
              alt={b.title} 
              className="w-full h-full object-cover" 
            />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-lg">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white">
                    {b.title}
                  </h1>
                  <p className="text-sm md:text-lg mb-4 md:mb-6 text-white/90">
                    {b.subtitle}
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-trendyol-orange hover:bg-trendyol-orange/90 text-white"
                  >
                    {b.actionText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button 
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm"
          onClick={goToPrev}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        <button 
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm"
          onClick={goToNext}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentBanner ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
