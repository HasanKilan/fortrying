
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useSellerAuth } from "@/hooks/use-seller-auth";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useSellerAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/seller/dashboard");
    } catch (error) {
      toast.error("فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-[380px] max-w-[90%]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">مركز البائعين</CardTitle>
          <CardDescription>
            قم بتسجيل الدخول إلى حساب البائع الخاص بك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  كلمة المرور
                </label>
                <Link
                  to="/seller/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            ليس لديك حساب؟{" "}
            <Link to="/seller/register" className="text-primary hover:underline">
              إنشاء حساب
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

export default SellerLogin;
