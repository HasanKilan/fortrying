
// Localized ProductCard.tsx with Trendyol-style UI elements
// File path: src/components/ProductCard.tsx

import { Heart, ShoppingBag, Eye, Truck } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    image: string;
    isNew?: boolean;
    discount?: number;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { name, brand, price, originalPrice, image, isNew, discount } = product;
  const { addItem } = useCart();

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const getDiscountLabel = () => {
    return discount ? `-${discount}%` : null;
  };

  return (
    <div className="group product-card-hover product-card bg-white rounded-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 rtl:text-right h-full">
      <div className="relative aspect-[3/4]">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        {/* Product badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {isNew && (
            <div className="bg-trendyol-green text-white text-xs font-bold py-1 px-2 rounded">جديد</div>
          )}
          {discount && (
            <div className="bg-trendyol-orange text-white text-xs font-bold py-1 px-2 rounded">
              {getDiscountLabel()}
            </div>
          )}
          <div className="bg-white text-trendyol-orange border border-trendyol-orange text-[10px] font-bold py-0.5 px-1 rounded flex items-center">
            <Truck className="h-3 w-3 ml-0.5" />
            شحن سريع
          </div>
        </div>

        {/* Wishlist Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "absolute top-2 left-2 bg-white/80 hover:bg-white shadow-sm transition-colors rounded-full w-8 h-8 p-1",
            isWishlisted ? "text-red-500" : "text-gray-600"
          )}
          onClick={toggleWishlist}
        >
          <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
        </Button>

        {/* Quick action buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 to-transparent">
          <Button 
            size="sm" 
            className="add-to-cart w-full bg-trendyol-orange text-white hover:bg-trendyol-orange/90"
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              })
            }
          >
            <ShoppingBag className="h-4 w-4 ml-1" /> أضف للسلة
          </Button>
        </div>
      </div>

      <div className="p-3">
        <div className="text-xs font-medium text-trendyol-orange mb-1">{brand}</div>
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 h-10">{name}</h3>
        
        <div className="mt-2 flex items-baseline">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-black">{price.toFixed(2)} د.إ</span>
            {originalPrice && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 line-through">{originalPrice.toFixed(2)} د.إ</span>
                {discount && <span className="text-xs text-trendyol-orange font-semibold">{getDiscountLabel()}</span>}
              </div>
            )}
          </div>
        </div>
        
        {/* Rating stars - static example */}
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400 text-xs">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span className="text-gray-300">★</span>
          </div>
          <span className="text-xs text-gray-500 ml-1">(42)</span>
        </div>
      </div>
    </div>
  );
};
