// Localized Footer.tsx — Arabic UI labels

import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 border-t border-gray-200">
      <div className="container mx-auto px-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 text-gray-700">
        <div>
          <h3 className="text-lg font-bold mb-3">من نحن</h3>
          <p className="text-sm leading-relaxed">
            TrendHaven هو وجهتك المثالية لاكتشاف أحدث صيحات الموضة والمنتجات عالية الجودة.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">روابط سريعة</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">الرئيسية</a></li>
            <li><a href="/cart" className="hover:underline">السلة</a></li>
            <li><a href="#" className="hover:underline">المفضلة</a></li>
            <li><a href="#" className="hover:underline">الحساب</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">الدعم</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">الأسئلة الشائعة</a></li>
            <li><a href="#" className="hover:underline">الشحن والإرجاع</a></li>
            <li><a href="#" className="hover:underline">سياسة الخصوصية</a></li>
            <li><a href="#" className="hover:underline">اتصل بنا</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">اشترك في النشرة البريدية</h3>
          <p className="text-sm mb-4">اشترك لتصلك أحدث العروض والمنتجات مباشرة في بريدك.</p>
          <div className="flex gap-2">
            <Input type="email" placeholder="البريد الإلكتروني" className="flex-1" />
            <Button className="bg-trendyol-orange hover:bg-trendyol-orange/90 text-white">اشترك</Button>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-8 text-gray-500">
        © {new Date().getFullYear()} تريندهافن. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};
