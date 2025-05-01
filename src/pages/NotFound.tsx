// Localized NotFound.tsx — Arabic 404 Page
// File path: src/pages/NotFound.tsx

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4 rtl:text-right">
      <h1 className="text-5xl font-bold text-trendyol-orange mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-2">الصفحة غير موجودة</p>
      <p className="text-sm text-gray-500 mb-6">عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها.</p>
      <Link
        to="/"
        className="px-5 py-2 bg-trendyol-orange text-white rounded hover:bg-trendyol-orange/90 transition"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;
