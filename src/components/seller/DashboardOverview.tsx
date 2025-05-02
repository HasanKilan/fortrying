
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, ShoppingCart, Package, TrendingUp, AlertTriangle } from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            إجمالي المبيعات
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">١٢,٣٤٥ ر.س</div>
          <p className="text-xs text-muted-foreground">
            +١٨.١٪ من الشهر الماضي
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            الطلبات الجديدة
          </CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+٥٧</div>
          <p className="text-xs text-muted-foreground">
            +٢.١٪ من الأسبوع الماضي
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            المنتجات النشطة
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">٢٤٣</div>
          <p className="text-xs text-muted-foreground">
            +٤ منتجات جديدة هذا الأسبوع
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            تنبيهات المخزون
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">٨</div>
          <p className="text-xs text-muted-foreground">
            منتجات بحاجة إلى تجديد المخزون
          </p>
        </CardContent>
      </Card>
      
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>تقرير المبيعات</CardTitle>
          <CardDescription>
            إجمالي المبيعات والطلبات لآخر ٣٠ يوم
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
            <LineChart className="h-8 w-8 text-muted-foreground" />
            <span className="mr-2 text-muted-foreground">بيانات المبيعات</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>الطلبات الحديثة</CardTitle>
          <CardDescription>
            آخر ٥ طلبات تم استلامها
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 rounded-md border p-3">
                <div>
                  <p className="text-sm font-medium">طلب #{100 + i}</p>
                  <p className="text-sm text-muted-foreground">
                    {i === 0 ? "اليوم" : i === 1 ? "أمس" : `قبل ${i} أيام`}
                  </p>
                </div>
                <div className="mr-auto">
                  <p className="text-sm font-medium">{120 + i * 30} ر.س</p>
                  <p className={`text-xs ${i < 2 ? "text-trendyol-orange" : "text-green-500"}`}>
                    {i < 2 ? "قيد المعالجة" : "تم الشحن"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>أداء الفئات</CardTitle>
          <CardDescription>
            أفضل الفئات مبيعاً في هذا الشهر
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
            <BarChart className="h-8 w-8 text-muted-foreground" />
            <span className="mr-2 text-muted-foreground">بيانات الفئات</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
