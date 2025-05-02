import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Eye, Package } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Order interface
interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  items: number;
  status: "new" | "processing" | "shipped" | "delivered" | "canceled";
}

// Mock order data
const mockOrders: Order[] = [
  {
    id: "10001",
    customer: "أحمد محمد",
    date: "2024-05-01",
    total: 349.97,
    items: 3,
    status: "new"
  },
  {
    id: "10002",
    customer: "سارة علي",
    date: "2024-05-01",
    total: 199.99,
    items: 1,
    status: "new"
  },
  {
    id: "10003",
    customer: "خالد عمر",
    date: "2024-04-30",
    total: 649.95,
    items: 2,
    status: "processing"
  },
  {
    id: "10004",
    customer: "فاطمة أحمد",
    date: "2024-04-29",
    total: 899.97,
    items: 4,
    status: "processing"
  },
  {
    id: "10005",
    customer: "محمد عبدالله",
    date: "2024-04-28",
    total: 299.99,
    items: 1,
    status: "shipped"
  },
  {
    id: "10006",
    customer: "نورا حسن",
    date: "2024-04-27",
    total: 749.95,
    items: 3,
    status: "shipped"
  },
  {
    id: "10007",
    customer: "عمر خالد",
    date: "2024-04-26",
    total: 499.99,
    items: 1,
    status: "delivered"
  },
  {
    id: "10008",
    customer: "ليلى محمد",
    date: "2024-04-25",
    total: 129.99,
    items: 1,
    status: "delivered"
  },
  {
    id: "10009",
    customer: "يوسف أحمد",
    date: "2024-04-24",
    total: 1299.95,
    items: 2,
    status: "canceled"
  }
];

// Mock order details
const mockOrderItems = [
  { id: "1", name: "قميص قطني أزرق", price: 149.99, quantity: 1 },
  { id: "2", name: "سماعات لاسلكية", price: 299.99, quantity: 1 },
  { id: "5", name: "حذاء رياضي أسود", price: 199.99, quantity: 1 }
];

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");
  
  // Filter orders based on search term and active tab
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.includes(searchTerm) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && order.status === activeTab;
  });
  
  // Handle viewing order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsDialogOpen(true);
  };
  
  // Handle updating order status
  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status);
    setIsUpdateDialogOpen(true);
  };
  
  // Save updated status
  const saveUpdatedStatus = () => {
    if (!selectedOrder || !updatedStatus) return;
    
    setOrders(prev => 
      prev.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: updatedStatus as Order["status"] } 
          : order
      )
    );
    
    toast.success("تم تحديث حالة الطلب بنجاح");
    setIsUpdateDialogOpen(false);
  };
  
  // Format date to Arabic format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">إدارة الطلبات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث بواسطة رقم الطلب أو اسم العميل..."
                  className="pl-8 pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>تصفية</span>
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">الكل ({orders.length})</TabsTrigger>
                <TabsTrigger value="new">
                  جديد ({orders.filter(o => o.status === "new").length})
                </TabsTrigger>
                <TabsTrigger value="processing">
                  قيد المعالجة ({orders.filter(o => o.status === "processing").length})
                </TabsTrigger>
                <TabsTrigger value="shipped">
                  تم الشحن ({orders.filter(o => o.status === "shipped").length})
                </TabsTrigger>
                <TabsTrigger value="delivered">
                  تم التوصيل ({orders.filter(o => o.status === "delivered").length})
                </TabsTrigger>
                <TabsTrigger value="canceled">
                  ملغي ({orders.filter(o => o.status === "canceled").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4 mt-4">
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-12 px-4 text-right align-middle font-medium">رقم الطلب</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">العميل</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">التاريخ</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">الإجمالي</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">العناصر</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">الحالة</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {filteredOrders.length > 0 ? (
                          filteredOrders.map(order => (
                            <tr 
                              key={order.id} 
                              className="border-b transition-colors hover:bg-muted/50"
                            >
                              <td className="p-4 align-middle font-medium">#{order.id}</td>
                              <td className="p-4 align-middle">{order.customer}</td>
                              <td className="p-4 align-middle">{formatDate(order.date)}</td>
                              <td className="p-4 align-middle">{order.total} ر.س</td>
                              <td className="p-4 align-middle">{order.items}</td>
                              <td className="p-4 align-middle">
                                <span className={`inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium ${
                                  order.status === "new" ? "bg-blue-100 text-blue-700" :
                                  order.status === "processing" ? "bg-yellow-100 text-yellow-700" :
                                  order.status === "shipped" ? "bg-purple-100 text-purple-700" :
                                  order.status === "delivered" ? "bg-green-100 text-green-700" :
                                  "bg-red-100 text-red-700"
                                }`}>
                                  {order.status === "new" ? "جديد" :
                                   order.status === "processing" ? "قيد المعالجة" :
                                   order.status === "shipped" ? "تم الشحن" :
                                   order.status === "delivered" ? "تم التوصيل" :
                                   "ملغي"}
                                </span>
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex justify-center items-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleViewOrder(order)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleUpdateStatus(order)}
                                  >
                                    <Package className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="p-4 text-center text-muted-foreground">
                              لا توجد طلبات متطابقة مع معايير البحث
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              طلب من {selectedOrder?.customer} بتاريخ {selectedOrder && formatDate(selectedOrder.date)}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm font-medium">رقم الطلب: #{selectedOrder?.id}</p>
                <p className="text-sm text-muted-foreground">
                  الحالة: {
                    selectedOrder?.status === "new" ? "جديد" :
                    selectedOrder?.status === "processing" ? "قيد المعالجة" :
                    selectedOrder?.status === "shipped" ? "تم الشحن" :
                    selectedOrder?.status === "delivered" ? "تم التوصيل" :
                    "ملغي"
                  }
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">القيمة الإجمالية: {selectedOrder?.total} ر.س</p>
                <p className="text-sm text-muted-foreground">عدد المنتجات: {selectedOrder?.items}</p>
              </div>
            </div>
            
            <h4 className="text-sm font-medium mb-2">منتجات الطلب</h4>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-10 px-4 text-right align-middle font-medium">المنتج</th>
                      <th className="h-10 px-4 text-right align-middle font-medium">السعر</th>
                      <th className="h-10 px-4 text-right align-middle font-medium">الكمية</th>
                      <th className="h-10 px-4 text-right align-middle font-medium">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {mockOrderItems.map(item => (
                      <tr 
                        key={item.id} 
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <td className="p-2 align-middle font-medium">{item.name}</td>
                        <td className="p-2 align-middle">{item.price} ر.س</td>
                        <td className="p-2 align-middle">{item.quantity}</td>
                        <td className="p-2 align-middle">{(item.price * item.quantity).toFixed(2)} ر.س</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تحديث حالة الطلب</DialogTitle>
            <DialogDescription>
              تحديث حالة الطلب #{selectedOrder?.id} للعميل {selectedOrder?.customer}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">الحالة الحالية</label>
                <div className={`inline-flex h-8 items-center rounded-full px-3 text-sm font-medium ${
                  selectedOrder?.status === "new" ? "bg-blue-100 text-blue-700" :
                  selectedOrder?.status === "processing" ? "bg-yellow-100 text-yellow-700" :
                  selectedOrder?.status === "shipped" ? "bg-purple-100 text-purple-700" :
                  selectedOrder?.status === "delivered" ? "bg-green-100 text-green-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {selectedOrder?.status === "new" ? "جديد" :
                   selectedOrder?.status === "processing" ? "قيد المعالجة" :
                   selectedOrder?.status === "shipped" ? "تم الشحن" :
                   selectedOrder?.status === "delivered" ? "تم التوصيل" :
                   "ملغي"}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">الحالة الجديدة</label>
                <Select value={updatedStatus} onValueChange={setUpdatedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر حالة الطلب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">جديد</SelectItem>
                    <SelectItem value="processing">قيد المعالجة</SelectItem>
                    <SelectItem value="shipped">تم الشحن</SelectItem>
                    <SelectItem value="delivered">تم التوصيل</SelectItem>
                    <SelectItem value="canceled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={saveUpdatedStatus}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
