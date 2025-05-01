// Localized FloatingCartPreview.tsx — Arabic UI with custom drawer, quantity controls, and clear/animated buttons
// File path: src/components/FloatingCartPreview.tsx

import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import { motion } from "framer-motion";

export const FloatingCartPreview = () => {
  const { items, removeItem, updateItemQuantity, clearCart } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-trendyol-orange text-white px-4 py-2 rounded-full shadow-lg transition"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-sm font-medium">السلة ({itemCount})</span>
        </motion.button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[85%] sm:w-[350px] rtl:text-right">
        <h2 className="text-center text-lg font-semibold mb-4">معاينة السلة</h2>

        {items.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">سلتك فارغة.</p>
        ) : (
          <ul className="space-y-4 overflow-y-auto max-h-[75vh] pr-1">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 border-b pb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xs font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-trendyol-orange">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            ))}
            <li className="pt-2">
              <div className="flex flex-col gap-2">
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button className="w-full bg-trendyol-orange text-white hover:bg-orange-600">
                    المتابعة إلى الدفع
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    تفريغ السلة
                  </Button>
                </motion.div>
              </div>
            </li>
          </ul>
        )}
      </SheetContent>
    </Sheet>
  );
};
