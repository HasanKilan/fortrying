// Let's start with Header.tsx localization (Arabic UI, keep product names in English)

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, ShoppingBag, User, Heart, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from "@/hooks/use-cart";
import { Link } from "react-router-dom";

export const Header = () => {
  const { items } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const isMobile = useIsMobile();

  const categories = [
    "نساء", "رجال", "أطفال", "منزل وديكور", "جمال", "إلكترونيات", "رياضة"
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 w-full">
      <div className="container px-4 mx-auto">
        {/* Top nav */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85%] sm:w-[350px]">
                  <div className="py-4">
                    <h3 className="text-lg font-medium mb-4 px-4">الفئات</h3>
                    <nav className="space-y-1">
                      {categories.map((category) => (
                        <a key={category} href="#" className="block px-4 py-2.5 hover:bg-trendyol-lightGray text-trendyol-black">
                          {category}
                        </a>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-trendyol-orange">تريندهافن</span>
            </a>
          </div>

          {/* Search */}
          <div className={`${isMobile ? 'hidden' : 'flex'} flex-1 mx-6 max-w-2xl`}>
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 rtl-search-icon" />
              <Input 
                placeholder="ابحث عن منتج أو ماركة أو فئة" 
                className="pr-10 pl-4 py-2 h-10 rounded"
              />
              <Button 
                size="sm" 
                className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 bg-trendyol-orange hover:bg-trendyol-orange/90 rtl-search-button"
              >
                بحث
              </Button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2 space-x-reverse">
            {isMobile && (
              <Button variant="ghost" size="icon" className="relative">
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
              <span className="sr-only">الحساب</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="sr-only">المفضلة</span>
              {wishlistCount > 0 && (
                <span className="badge-count">{wishlistCount}</span>
              )}
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative ml-2">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">السلة</span>
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 transform translate-x-1/3 -translate-y-1/3 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Category nav for desktop */}
        {!isMobile && (
          <nav className="flex items-center space-x-0 space-x-reverse space-x-6 py-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <a key={category} href="#" className="nav-link whitespace-nowrap text-sm font-medium py-1">
                {category}
              </a>
            ))}
          </nav>
        )}

        {/* Mobile search bar */}
        {isMobile && (
          <div className="pb-3 px-2">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="ابحث عن المنتجات..." 
                className="pr-10 pl-4 py-1.5 h-9 rounded bg-gray-50"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
