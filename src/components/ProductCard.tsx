// Localized ProductCard.tsx — Arabic keywords with original structure retained + style tweaks
// File path: src/components/ProductCard.tsx

import { Heart, ShoppingBag, Eye } from "lucide-react";
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

  return (
    <div className="group product-card-hover product-card bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm rtl:text-right">
      <div className="relative aspect-[3/4]">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center transition-transform group-hover:scale-105"
        />

        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-trendyol-green text-white">جديد</Badge>
          )}
          {discount && (
            <Badge className="bg-trendyol-orange text-white">{discount}% تخفيض</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "absolute top-2 right-2 bg-white/80 hover:bg-white shadow-sm transition-colors",
            isWishlisted ? "text-red-500" : "text-gray-600"
          )}
          onClick={toggleWishlist}
        >
          <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
        </Button>

        {/* Quick action buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent">
          <Button 
            size="sm" 
            className="add-to-cart flex-1 me-1 bg-trendyol-orange text-white hover:bg-trendyol-orange/90"
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
            <ShoppingBag className="h-4 w-4 me-1" /> اشتري
          </Button>

          <Button 
            size="sm" 
            variant="secondary" 
            className="quick-view p-0 w-9 h-9 bg-white text-black hover:bg-gray-100"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-3">
        <div className="text-sm font-medium text-gray-500">{brand}</div>
        <h3 className="font-medium text-gray-900 mt-1 line-clamp-2">{name}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-trendyol-orange">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};