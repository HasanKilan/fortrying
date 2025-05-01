// Localized CartSheet.tsx — Arabic UI
// File path: src/components/CartSheet.tsx

import { useCart } from "@/hooks/use-cart";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const CartSheet = () => {
  const { items, removeItem, clearCart } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">عرض السلة</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] sm:w-[350px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">السلة</h2>
          {itemCount > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:underline"
            >
              إفراغ السلة
            </button>
          )}
        </div>

        {itemCount === 0 ? (
          <p className="text-sm text-gray-500">سلتك فارغة حالياً.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    إزالة
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between text-sm">
                <span>الإجمالي:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link to="/cart">
                <Button className="mt-4 w-full bg-trendyol-orange hover:bg-trendyol-orange/90 text-white">
                  الذهاب إلى السلة
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
