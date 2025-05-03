import { useState } from "react";
import { Menu, Search, ShoppingBag, User, ChevronDown, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/CartSheet";
import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { MegaMenu } from "@/components/MegaMenu";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const isMobile = useIsMobile();

  const handleCategoryHover = (category: string) => {
    if (!isMobile) {
      setActiveMegaMenu(category);
    }
  };

  const handleCategoryLeave = () => {
    if (!isMobile) {
      setActiveMegaMenu(null);
    }
  };

  const handleMobileCategoryClick = (category: string) => {
    if (activeMobileCategory === category) {
      setActiveMobileCategory(null);
    } else {
      setActiveMobileCategory(category);
    }
  };

  const categories = [
    { id: "women", name: "ملابس نسائية" },
    { id: "men", name: "ملابس رجالية" },
    { id: "kids", name: "الأطفال" },
    { id: "home", name: "المنزل" },
    { id: "beauty", name: "الجمال" },
    { id: "electronics", name: "الإلكترونيات" },
    { id: "sports", name: "الرياضة" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="bg-gray-100">
        <div className="container flex justify-end text-xs py-1 text-gray-600">
          <div className="flex items-center gap-3">
            <Link to="#" className="hover:text-trendyol-orange">كوبونات الخصم</Link>
            <Link to="#" className="hover:text-trendyol-orange">اشتري الآن</Link>
            <Link to="#" className="hover:text-trendyol-orange">المساعدة والدعم</Link>
          </div>
        </div>
      </div>
      
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-trendyol-orange flex items-center justify-center text-white">
            T
          </div>
          <span className="hidden font-bold sm:inline-block">تريندي</span>
        </Link>
        
        {/* Desktop Categories Navigation */}
        <nav className="hidden md:flex items-center relative flex-1 justify-center">
          <Button 
            variant="ghost" 
            className="mr-4 gap-1 font-bold border border-gray-200"
            onMouseEnter={() => handleCategoryHover('all')}
          >
            <Menu className="h-5 w-5" />
            كل الفئات
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          <div className="hidden md:flex gap-4 text-sm">
            {categories.map(category => (
              <div
                key={category.id}
                className="relative py-4"
                onMouseEnter={() => handleCategoryHover(category.id)}
                onMouseLeave={handleCategoryLeave}
              >
                <Link 
                  to="#" 
                  className="nav-link flex items-center gap-1 font-medium"
                >
                  {category.name}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </Link>
              </div>
            ))}
            <Link to="/seller/login" className="nav-link py-4 font-medium text-trendyol-orange">
              بوابة البائعين
            </Link>
          </div>
        </nav>
        
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search */}
          <div className="relative hidden md:block flex-1 max-w-md">
            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground rtl-search-icon" />
            <input
              type="search"
              placeholder="البحث عن منتجات، فئات، ماركات..."
              className="w-full rounded-md border pl-8 pr-10 focus:border-trendyol-orange focus:outline-none focus:ring-1 focus:ring-trendyol-orange"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden md:flex"
            >
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative" 
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="badge-count">{itemCount}</span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Mobile Menu Button - Now on the right side */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">فتح القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0">
              <div className="flex flex-col h-full overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex items-center mb-4 space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-8 rounded-full bg-trendyol-orange flex items-center justify-center text-white">
                      T
                    </div>
                    <span className="font-bold">تريندي</span>
                  </div>
                  
                  <div className="relative w-full">
                    <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground rtl-search-icon" />
                    <input
                      type="search"
                      placeholder="البحث..."
                      className="w-full rounded-md border pl-8 pr-10 py-2 focus:border-trendyol-orange focus:outline-none focus:ring-1 focus:ring-trendyol-orange"
                    />
                  </div>
                </div>
                
                <ScrollArea className="flex-1 overflow-auto">
                  <div className="p-4">
                    <nav className="flex flex-col space-y-1">
                      <Link to="/" className="py-2 px-2 hover:bg-muted rounded-md text-sm font-medium">
                        الرئيسية
                      </Link>
                      
                      {categories.map(category => (
                        <div key={category.id} className="flex flex-col">
                          <button 
                            onClick={() => handleMobileCategoryClick(category.id)}
                            className="py-2 px-2 hover:bg-muted rounded-md text-sm font-medium flex justify-between items-center"
                          >
                            {category.name}
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${activeMobileCategory === category.id ? 'rotate-180' : ''}`} 
                            />
                          </button>
                          
                          {activeMobileCategory === category.id && (
                            <div className="pr-4 mt-1">
                              <MegaMenu category={category.id} />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <Link to="/seller/login" className="py-2 px-2 hover:bg-muted rounded-md text-sm font-medium text-trendyol-orange">
                        بوابة البائعين
                      </Link>
                    </nav>
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <User className="h-4 w-4 mr-2" />
                      حسابي
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      المفضلة
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Mobile horizontal scrolling categories - Fixed to enable proper scrolling */}
      {isMobile && (
        <div className="w-full overflow-x-auto border-t scrollbar-hide">
          <div className="flex py-2 px-4 gap-4 whitespace-nowrap min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleMobileCategoryClick(category.id)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeMobileCategory === category.id 
                    ? 'bg-trendyol-orange text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mega menu that appears on hover */}
      {activeMegaMenu && (
        <div 
          className="absolute w-full bg-white shadow-lg border-t z-50"
          onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
          onMouseLeave={handleCategoryLeave}
        >
          <MegaMenu category={activeMegaMenu} />
        </div>
      )}
      
      <CartSheet isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  );
}
