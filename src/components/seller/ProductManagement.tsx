
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash, Eye, Filter } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "قميص قطني أزرق",
    category: "ملابس",
    price: 149.99,
    stock: 45,
    status: "active"
  },
  {
    id: "2",
    name: "سماعات لاسلكية",
    category: "إلكترونيات",
    price: 299.99,
    stock: 20,
    status: "active"
  },
  {
    id: "3",
    name: "حذاء رياضي أسود",
    category: "أحذية",
    price: 199.99,
    stock: 15,
    status: "active"
  },
  {
    id: "4",
    name: "حقيبة جلدية",
    category: "إكسسوارات",
    price: 349.99,
    stock: 8,
    status: "active"
  },
  {
    id: "5",
    name: "ساعة ذكية",
    category: "إلكترونيات",
    price: 499.99,
    stock: 3,
    status: "low_stock"
  },
  {
    id: "6",
    name: "عطر رجالي فاخر",
    category: "عطور",
    price: 399.99,
    stock: 12,
    status: "active"
  },
  {
    id: "7",
    name: "بنطلون جينز",
    category: "ملابس",
    price: 129.99,
    stock: 0,
    status: "out_of_stock"
  },
  {
    id: "8",
    name: "نظارة شمسية",
    category: "إكسسوارات",
    price: 159.99,
    stock: 25,
    status: "active"
  }
];

// Product interface
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "low_stock" | "out_of_stock";
}

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  // Product form state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    status: "active"
  });
  
  // Filter products based on search term and active tab
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && product.status === "active";
    if (activeTab === "low_stock") return matchesSearch && product.status === "low_stock";
    if (activeTab === "out_of_stock") return matchesSearch && product.status === "out_of_stock";
    
    return matchesSearch;
  });
  
  // Handle product selection
  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    
    setProducts(prev => prev.filter(product => !selectedProducts.includes(product.id)));
    toast.success(`تم حذف ${selectedProducts.length} منتج بنجاح`);
    setSelectedProducts([]);
  };
  
  // Handle adding a new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    const newProductWithId = {
      ...newProduct,
      id: String(products.length + 1)
    };
    
    setProducts(prev => [...prev, newProductWithId]);
    toast.success("تمت إضافة المنتج بنجاح");
    setIsAddDialogOpen(false);
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      status: "active"
    });
  };
  
  // Handle delete product
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    toast.success("تم حذف المنتج بنجاح");
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">إدارة المنتجات</CardTitle>
          
          <div className="flex items-center gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>إضافة منتج</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>إضافة منتج جديد</DialogTitle>
                  <DialogDescription>
                    أدخل تفاصيل المنتج الجديد. انقر على حفظ عند الانتهاء.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">اسم المنتج</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="أدخل اسم المنتج"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">الفئة</Label>
                    <Input
                      id="category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      placeholder="الفئة"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">السعر (ر.س)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock">المخزون</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddProduct}>حفظ</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            {selectedProducts.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={handleBulkDelete}
                className="flex items-center gap-2"
              >
                <Trash className="h-4 w-4" />
                <span>حذف ({selectedProducts.length})</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث عن المنتجات..."
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
                <TabsTrigger value="all">الكل ({products.length})</TabsTrigger>
                <TabsTrigger value="active">
                  متاح ({products.filter(p => p.status === "active").length})
                </TabsTrigger>
                <TabsTrigger value="low_stock">
                  مخزون منخفض ({products.filter(p => p.status === "low_stock").length})
                </TabsTrigger>
                <TabsTrigger value="out_of_stock">
                  نفذ ({products.filter(p => p.status === "out_of_stock").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4 mt-4">
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-12 px-4 text-right align-middle font-medium">
                            <Checkbox 
                              checked={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedProducts(filteredProducts.map(p => p.id));
                                } else {
                                  setSelectedProducts([]);
                                }
                              }}
                            />
                          </th>
                          <th className="h-12 px-4 text-right align-middle font-medium">المنتج</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">الفئة</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">السعر</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">المخزون</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">الحالة</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map(product => (
                            <tr 
                              key={product.id} 
                              className="border-b transition-colors hover:bg-muted/50"
                            >
                              <td className="p-4 align-middle">
                                <Checkbox 
                                  checked={selectedProducts.includes(product.id)}
                                  onCheckedChange={() => handleProductSelect(product.id)}
                                />
                              </td>
                              <td className="p-4 align-middle font-medium">{product.name}</td>
                              <td className="p-4 align-middle">{product.category}</td>
                              <td className="p-4 align-middle">{product.price} ر.س</td>
                              <td className="p-4 align-middle">{product.stock}</td>
                              <td className="p-4 align-middle">
                                <span className={`inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium ${
                                  product.status === "active" ? "bg-green-100 text-green-700" :
                                  product.status === "low_stock" ? "bg-yellow-100 text-yellow-700" :
                                  "bg-red-100 text-red-700"
                                }`}>
                                  {product.status === "active" ? "متاح" :
                                   product.status === "low_stock" ? "مخزون منخفض" :
                                   "نفذ من المخزون"}
                                </span>
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex justify-center items-center gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleDeleteProduct(product.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="p-4 text-center text-muted-foreground">
                              لا توجد منتجات متطابقة مع معايير البحث
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
    </div>
  );
}
