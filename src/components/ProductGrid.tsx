// Localized ProductGrid.tsx — Static data version (RTL + Arabic)
// File path: src/components/ProductGrid.tsx

import { ProductCard } from "./ProductCard";

// بيانات المنتجات
const products = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    brand: "Fashion Basics",
    price: 24.99,
    originalPrice: 34.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    discount: 28,
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    brand: "Denim Co.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isNew: true,
  },
  {
    id: "3",
    name: "Oversized Hoodie with Print",
    brand: "Urban Style",
    price: 39.99,
    originalPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    discount: 33,
  },
  {
    id: "4",
    name: "Classic Leather Sneakers",
    brand: "FootGear",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "5",
    name: "Formal Business Shirt",
    brand: "Executive Line",
    price: 54.99,
    originalPrice: 69.99,
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    discount: 21,
  },
  {
    id: "6",
    name: "Summer Beach Shorts",
    brand: "Coastal Collection",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isNew: true,
  },
  {
    id: "7",
    name: "Winter Puffer Jacket",
    brand: "Cold Armor",
    price: 129.99,
    originalPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    discount: 27,
  },
  {
    id: "8",
    name: "Designer Sunglasses",
    brand: "Vision Elite",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isNew: true,
  },
];

interface ProductGridProps {
  title?: string;
  subtitle?: string;
}

export const ProductGrid = ({ title = "منتجات مميزة", subtitle }: ProductGridProps) => {
  return (
    <div className="py-10 w-full overflow-hidden rtl:text-right">
      <div className="container px-4 mx-auto">
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
