
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BarChart, 
  Box, 
  FileText, 
  Home, 
  Package, 
  Settings, 
  ShoppingCart 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSellerAuth } from "@/hooks/use-seller-auth";

interface SellerSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SellerSidebar({ activeTab, setActiveTab }: SellerSidebarProps) {
  const { seller } = useSellerAuth();
  
  return (
    <div className="hidden border-l bg-background md:block md:w-64 lg:w-72">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="w-8 h-8 rounded-full bg-trendyol-orange flex items-center justify-center text-white">
            T
          </div>
          <span className="text-lg">مركز البائعين</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="flex flex-col gap-2 p-4">
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {seller?.storeName}
            </h2>
            <div className="space-y-1">
              <Button
                variant={activeTab === "overview" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  activeTab === "overview" && "bg-accent"
                )}
                onClick={() => setActiveTab("overview")}
              >
                <Home className="h-4 w-4" />
                لوحة التحكم
              </Button>
              <Button
                variant={activeTab === "products" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  activeTab === "products" && "bg-accent"
                )}
                onClick={() => setActiveTab("products")}
              >
                <Box className="h-4 w-4" />
                المنتجات
              </Button>
              <Button
                variant={activeTab === "orders" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  activeTab === "orders" && "bg-accent"
                )}
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingCart className="h-4 w-4" />
                الطلبات
              </Button>
              <Button
                variant={activeTab === "inventory" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  activeTab === "inventory" && "bg-accent"
                )}
                onClick={() => setActiveTab("inventory")}
              >
                <Package className="h-4 w-4" />
                المخزون
              </Button>
              <Button
                variant={activeTab === "reports" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  activeTab === "reports" && "bg-accent"
                )}
                onClick={() => setActiveTab("reports")}
              >
                <BarChart className="h-4 w-4" />
                التقارير
              </Button>
            </div>
          </div>
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              الإعدادات
            </h2>
            <div className="space-y-1">
              <Button
                variant={activeTab === "settings" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  activeTab === "settings" && "bg-accent"
                )}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-4 w-4" />
                إعدادات الحساب
              </Button>
              <Button
                variant={activeTab === "help" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  activeTab === "help" && "bg-accent"
                )}
                onClick={() => setActiveTab("help")}
              >
                <FileText className="h-4 w-4" />
                مركز المساعدة
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
