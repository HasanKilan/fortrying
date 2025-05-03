
// Localized Index.tsx — Arabic Homepage with Full Layout
// File path: src/pages/Index.tsx

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { FloatingCartPreview } from "@/components/FloatingCartPreview";
import { CategoryIcons } from "@/components/CategoryIcons";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full rtl:text-right">
      <AnnouncementBanner />
      <Header />
      <main className="flex-grow overflow-x-hidden w-full">
        <Hero />
        <CategoryIcons />
        <div className="py-4 container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-100 rounded-lg p-4 text-center">
              <h3 className="text-green-800 font-bold text-lg">أضيف حديثاً للسلة</h3>
            </div>
            <div className="bg-amber-100 rounded-lg p-4 text-center">
              <h3 className="text-amber-800 font-bold text-lg">الأكثر مبيعاً</h3>
            </div>
            <div className="bg-pink-100 rounded-lg p-4 text-center">
              <h3 className="text-pink-800 font-bold text-lg">منتجات مميزة</h3>
            </div>
          </div>
        </div>
        <ProductGrid title="المنتجات الشائعة" subtitle="استعرض أكثر المنتجات شعبية بين العملاء" />
        <Features />
        <ProductGrid title="وصل حديثاً" subtitle="تشكيلة جديدة من أحدث المنتجات" />
      </main>
      <Footer />

      {/* Floating Cart Preview Button */}
      <FloatingCartPreview />
    </div>
  );
};

export default Index;
