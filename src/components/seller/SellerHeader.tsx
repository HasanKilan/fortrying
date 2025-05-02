
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, User } from "lucide-react";
import { useSellerAuth } from "@/hooks/use-seller-auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SellerHeader() {
  const { seller, logout } = useSellerAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("تم تسجيل الخروج بنجاح");
    navigate("/seller/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <div className="relative rtl:ml-auto">
          <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="البحث..."
            className="w-48 md:w-64 lg:w-80 pl-8 pr-10"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-trendyol-orange" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-block text-sm font-medium">
            {seller?.name}
          </span>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
