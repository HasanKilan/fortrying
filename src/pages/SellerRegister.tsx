
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useSellerAuth } from "@/hooks/use-seller-auth";

const SellerRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useSellerAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword || !storeName) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(name, email, password, storeName);
      toast.success("تم إنشاء الحساب بنجاح");
      navigate("/seller/dashboard");
    } catch (error) {
      toast.error("فشل إنشاء الحساب. يرجى المحاولة مرة أخرى");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-[480px] max-w-[90%]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">إنشاء حساب بائع</CardTitle>
          <CardDescription>
            سجل لبدء بيع منتجاتك على منصتنا
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                الاسم الكامل
              </label>
              <Input
                id="name"
                placeholder="محمد أحمد"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="storeName" className="text-sm font-medium">
                اسم المتجر
              </label>
              <Input
                id="storeName"
                placeholder="متجر المستقبل"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                كلمة المرور
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                تأكيد كلمة المرور
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            لديك حساب بالفعل؟{" "}
            <Link to="/seller/login" className="text-primary hover:underline">
              تسجيل الدخول
            </Link>
          </div>
          <div className="text-center text-sm">
            <Link to="/" className="text-muted-foreground hover:underline">
              العودة إلى موقع المتجر
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SellerRegister;
