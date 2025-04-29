
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductGrid title="New Arrivals" subtitle="Check out our latest collection" />
        <Features />
        <ProductGrid title="Best Sellers" subtitle="Our most popular products" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
