import { useState } from "react";
import { Search, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/CartSheet";
import { useCart } from "@/hooks/use-cart";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <Link to="/" className="mr-6 flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 rounded-full bg-trendyol-orange flex items-center justify-center text-white">
              T
            </div>
            <span className="hidden font-bold sm:inline-block">تريندي</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link to="/" className="nav-link text-sm font-medium">
              الرئيسية
            </Link>
            <Link to="#" className="nav-link text-sm font-medium">
              الفئات
            </Link>
            <Link to="#" className="nav-link text-sm font-medium">
              المنتجات
            </Link>
            <Link to="#" className="nav-link text-sm font-medium">
              العروض
            </Link>
            <Link to="#" className="nav-link text-sm font-medium">
              تخفيضات
            </Link>
            <Link to="/seller/login" className="nav-link text-sm font-medium text-trendyol-orange">
              بوابة البائعين
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground rtl-search-icon" />
              <input
                type="search"
                placeholder="البحث..."
                className="rounded-md border pl-8 pr-10 focus:border-trendyol-orange focus:outline-none focus:ring-1 focus:ring-trendyol-orange"
              />
            </div>
          </div>

          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative" 
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="badge-count">{itemCount}</span>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      <CartSheet isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  );
}
