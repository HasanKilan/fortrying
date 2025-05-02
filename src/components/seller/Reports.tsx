
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  LineChart, 
  PieChart,
  Download,
  TrendingUp,
  TrendingDown 
} from "lucide-react";

export function Reports() {
  const [dateRange, setDateRange] = useState("month");
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">التقارير والإحصائيات</h2>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="اختر الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">اليوم</SelectItem>
              <SelectItem value="week">الأسبوع الماضي</SelectItem>
              <SelectItem value="month">الشهر الماضي</SelectItem>
              <SelectItem value="quarter">الربع الماضي</SelectItem>
              <SelectItem value="year">السنة الماضية</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>تصدير</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>المبيعات</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>المنتجات</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>العملاء</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Sales Report */}
        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  إجمالي المبيعات
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">٥٧,٨٩٢ ر.س</div>
                <p className="text-xs text-green-500">
                  +١٨.٢٪ مقارنة بالفترة السابقة
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  عدد الطلبات
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">١٦٤</div>
                <p className="text-xs text-green-500">
                  +٢٢.٥٪ مقارنة بالفترة السابقة
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  متوسط قيمة الطلب
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">٣٥٣ ر.س</div>
                <p className="text-xs text-red-500">
                  -٤.٣٪ مقارنة بالفترة السابقة
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>تقرير المبيعات</CardTitle>
              <CardDescription>
                إجمالي المبيعات حسب الفترة الزمنية
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <BarChart className="h-8 w-8 text-muted-foreground" />
                <span className="mr-2 text-muted-foreground">رسم بياني للمبيعات</span>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                تم تحديث البيانات اليوم، ٠٢ مايو ٢٠٢٥
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Products Report */}
        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>المنتجات الأكثر مبيعاً</CardTitle>
                <CardDescription>
                  أفضل ٥ منتجات من حيث المبيعات
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[250px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="mr-2 text-muted-foreground">رسم بياني للمنتجات</span>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  تم تحديث البيانات اليوم، ٠٢ مايو ٢٠٢٥
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المنتجات حسب الفئة</CardTitle>
                <CardDescription>
                  توزيع المبيعات حسب فئات المنتجات
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[250px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="mr-2 text-muted-foreground">رسم بياني للفئات</span>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  تم تحديث البيانات اليوم، ٠٢ مايو ٢٠٢٥
                </p>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>أداء المنتجات</CardTitle>
              <CardDescription>
                تفاصيل أداء المنتجات الأعلى مبيعاً
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-right align-middle font-medium">المنتج</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">الفئة</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">المبيعات</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">الإيرادات</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">متوسط التقييم</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">سماعات لاسلكية</td>
                      <td className="p-4 align-middle">إلكترونيات</td>
                      <td className="p-4 align-middle">١٨٣</td>
                      <td className="p-4 align-middle">٥٤,٨٥١ ر.س</td>
                      <td className="p-4 align-middle">٤.٨</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">حذاء رياضي أسود</td>
                      <td className="p-4 align-middle">أحذية</td>
                      <td className="p-4 align-middle">١٥٧</td>
                      <td className="p-4 align-middle">٣١,٣٤٣ ر.س</td>
                      <td className="p-4 align-middle">٤.٥</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">قميص قطني أزرق</td>
                      <td className="p-4 align-middle">ملابس</td>
                      <td className="p-4 align-middle">١٤٢</td>
                      <td className="p-4 align-middle">٢١,٢٩٨ ر.س</td>
                      <td className="p-4 align-middle">٤.٧</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">ساعة ذكية</td>
                      <td className="p-4 align-middle">إلكترونيات</td>
                      <td className="p-4 align-middle">١٣٥</td>
                      <td className="p-4 align-middle">٦٧,٤٨٥ ر.س</td>
                      <td className="p-4 align-middle">٤.٩</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">حقيبة جلدية</td>
                      <td className="p-4 align-middle">إكسسوارات</td>
                      <td className="p-4 align-middle">١١٩</td>
                      <td className="p-4 align-middle">٤١,٦٢٩ ر.س</td>
                      <td className="p-4 align-middle">٤.٦</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Customers Report */}
        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  عملاء جدد
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">٨٧</div>
                <p className="text-xs text-green-500">
                  +١٢.٨٪ مقارنة بالفترة السابقة
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  معدل التكرار
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">٥٣٪</div>
                <p className="text-xs text-green-500">
                  +٥.٢٪ مقارنة بالفترة السابقة
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  قيمة العميل
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">٧٩٨ ر.س</div>
                <p className="text-xs text-red-500">
                  -١.٧٪ مقارنة بالفترة السابقة
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>تقرير العملاء</CardTitle>
              <CardDescription>
                توزيع العملاء حسب المناطق
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <PieChart className="h-8 w-8 text-muted-foreground" />
                <span className="mr-2 text-muted-foreground">رسم بياني للعملاء</span>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                تم تحديث البيانات اليوم، ٠٢ مايو ٢٠٢٥
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
