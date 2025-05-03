
// Localized Index.tsx — Arabic Homepage with Full Layout
// File path: src/pages/Index.tsx

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { FloatingCartPreview } from "@/components/FloatingCartPreview";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full rtl:text-right">
      <Header />
      <main className="flex-grow overflow-x-hidden w-full">
        <Hero />
        <ProductGrid title="وصل حديثاً" subtitle="استعرض أحدث تشكيلاتنا المميزة" />
        <Features />
        <ProductGrid title="الأكثر مبيعاً" subtitle="منتجاتنا الأكثر شهرة بين العملاء" />
      </main>
      <Footer />

      {/* Floating Cart Preview Button */}
      <FloatingCartPreview />
    </div>
  );
};

export default Index;
