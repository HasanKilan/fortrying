
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, ShoppingBag, User, Heart, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const isMobile = useIsMobile();

  const categories = [
    "نساء", "رجال", "أطفال", "منزل وديكور", "جمال", "إلكترونيات", "رياضة"
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 w-full">
      <div className="container px-4 mx-auto">
        {/* Top navigation bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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
                        <a 
                          key={category} 
                          href="#" 
                          className="block px-4 py-2.5 hover:bg-trendyol-lightGray text-trendyol-black"
                        >
                          {category}
                        </a>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-trendyol-orange">TrendHaven</span>
            </a>
          </div>

          {/* Search */}
          <div className={`${isMobile ? 'hidden' : 'flex'} flex-1 mx-6 max-w-2xl`}>
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 rtl-search-icon" />
              <Input 
                placeholder="ابحث عن المنتجات والماركات والفئات" 
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

          {/* User actions */}
          <div className="flex items-center space-x-0 space-x-reverse space-x-4">
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
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">السلة</span>
              {cartCount > 0 && (
                <span className="badge-count">{cartCount}</span>
              )}
            </Button>
          </div>
        </div>

        {/* Categories navigation - hide on mobile */}
        {!isMobile && (
          <nav className="flex items-center space-x-0 space-x-reverse space-x-6 py-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <a 
                key={category} 
                href="#" 
                className="nav-link whitespace-nowrap text-sm font-medium py-1"
              >
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
