import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { SellerHeader } from "@/components/seller/SellerHeader";
import { SellerSidebar } from "@/components/seller/SellerSidebar";
import { DashboardOverview } from "@/components/seller/DashboardOverview";
import { ProductManagement } from "@/components/seller/ProductManagement";
import { OrderManagement } from "@/components/seller/OrderManagement";
import { Reports } from "@/components/seller/Reports";
import { useSellerAuth } from "@/hooks/use-seller-auth";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { isAuthenticated, checkingAuth } = useSellerAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkingAuth && !isAuthenticated) {
      navigate("/seller/login");
    }
  }, [isAuthenticated, checkingAuth, navigate]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <SellerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SellerHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 md:w-[400px]">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>لوحة التحكم</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span>المنتجات</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span>الطلبات</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>التقارير</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <DashboardOverview />
            </TabsContent>
            
            <TabsContent value="products" className="space-y-4">
              <ProductManagement />
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-4">
              <OrderManagement />
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-4">
              <Reports />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
