
import { useState } from "react";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/CartSheet";
import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const isMobile = useIsMobile();

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
          
          {/* Desktop Navigation */}
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
          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] p-0">
              <div className="flex flex-col h-full py-6 px-4 overflow-auto">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center mb-4 px-2 space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-8 rounded-full bg-trendyol-orange flex items-center justify-center text-white">
                      T
                    </div>
                    <span className="font-bold">تريندي</span>
                  </div>
                  
                  <nav className="flex flex-col space-y-4 w-full">
                    <Link to="/" className="py-2 px-2 hover:bg-muted rounded-md text-sm font-medium">
                      الرئيسية
                    </Link>
                    <Link to="#" className="py-2 px-2 hover:bg-muted rounded-md text-sm font-medium">
                      الفئات
                    </Link>
                    <Link to="#" className="py-2 px-2 hover:bg-muted rounded-md text-sm font-medium">
                      المنتجات
                    </Link>
                    <Link to="#" className="py-2 px-2 hover:bg-muted rounded-md text-sm font-medium">
                      العروض
                    </Link>
                    <Link to="#" className="py-2 px-2 hover:bg-muted rounded-md text-sm font-medium">
                      تخفيضات
                    </Link>
                    <Link to="/seller/login" className="py-2 px-2 hover:bg-muted rounded-md text-sm font-medium text-trendyol-orange">
                      بوابة البائعين
                    </Link>
                  </nav>
                  
                  <div className="mt-auto pt-4 border-t">
                    <div className="relative w-full mb-4">
                      <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground rtl-search-icon" />
                      <input
                        type="search"
                        placeholder="البحث..."
                        className="w-full rounded-md border pl-8 pr-10 focus:border-trendyol-orange focus:outline-none focus:ring-1 focus:ring-trendyol-orange"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <User className="h-4 w-4 mr-2" />
                        حسابي
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
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
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      <CartSheet isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  );
}
