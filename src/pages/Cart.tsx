// Localized Cart.tsx — Arabic Cart Page
// File path: src/pages/Cart.tsx

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, clearCart, removeItem } = useCart();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-10 rtl:text-right">
      <h1 className="text-2xl font-bold mb-6">سلة التسوق</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">سلتك فارغة حالياً.</p>
      ) : (
        <div className="space-y-6">
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-start justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded border"
                  />
                  <div>
                    <p className="font-medium text-lg">{item.name}</p>
                    <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="font-semibold text-trendyol-orange">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-500 hover:underline mt-1"
                  >
                    إزالة
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-lg font-medium">الإجمالي:</span>
            <span className="text-xl font-bold text-trendyol-orange">${total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={clearCart} className="text-red-600 border-red-400 hover:bg-red-50">
              إفراغ السلة
            </Button>
            <Button className="bg-trendyol-orange text-white hover:bg-trendyol-orange/90">
              المتابعة إلى الدفع
            </Button>
          </div>
        </div>
      )}

      <div className="mt-10">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          ← العودة للتسوق
        </Link>
      </div>
    </div>
  );
};

export default Cart;
