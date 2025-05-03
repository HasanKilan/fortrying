
import { Link } from "react-router-dom";

interface MegaMenuColumn {
  title: string;
  links: string[];
}

interface FeaturedItem {
  title: string;
  image: string;
  link: string;
}

interface MegaMenuData {
  columns: MegaMenuColumn[];
  featured?: FeaturedItem;
}

interface MegaMenuProps {
  category: string;
}

// Sample mega menu data (would typically come from an API)
const megaMenuData: Record<string, MegaMenuData> = {
  all: {
    columns: [
      {
        title: "ملابس نسائية",
        links: ["فساتين", "بلوزات", "تنانير", "بناطيل", "جاكيتات", "معاطف", "ملابس داخلية"]
      },
      {
        title: "ملابس رجالية",
        links: ["قمصان", "بناطيل", "تي شيرت", "جينز", "بدلات", "جاكيتات", "ملابس داخلية"]
      },
      {
        title: "أحذية وحقائب",
        links: ["أحذية نسائية", "أحذية رجالية", "حقائب يد", "حقائب ظهر", "محافظ", "أحزمة"]
      },
      {
        title: "إلكترونيات",
        links: ["هواتف ذكية", "أجهزة لوحية", "لابتوب", "سماعات", "ساعات ذكية", "أجهزة منزلية"]
      }
    ]
  },
  women: {
    columns: [
      {
        title: "ملابس",
        links: ["فساتين", "بلوزات", "تنانير", "بناطيل", "جاكيتات", "معاطف"]
      },
      {
        title: "أحذية",
        links: ["كعب عالي", "أحذية مسطحة", "صنادل", "أحذية رياضية", "بوت"]
      },
      {
        title: "إكسسوارات",
        links: ["حقائب", "مجوهرات", "أوشحة", "نظارات شمسية", "قبعات"]
      },
      {
        title: "ماركات",
        links: ["زارا", "مانجو", "إتش آند إم", "أديداس", "نايك", "بوما"]
      }
    ],
    featured: {
      title: "تخفيضات الموسم",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      link: "#"
    }
  },
  men: {
    columns: [
      {
        title: "ملابس",
        links: ["قمصان", "تي شيرت", "بناطيل", "جينز", "شورت", "بدلات"]
      },
      {
        title: "أحذية",
        links: ["أحذية كاجوال", "أحذية رسمية", "أحذية رياضية", "صنادل"]
      },
      {
        title: "إكسسوارات",
        links: ["أحزمة", "ساعات", "نظارات شمسية", "محافظ"]
      },
      {
        title: "ماركات",
        links: ["لاكوست", "تومي هيلفيجر", "رالف لورين", "نايك", "أديداس"]
      }
    ]
  },
  kids: {
    columns: [
      {
        title: "أولاد",
        links: ["تي شيرت", "بناطيل", "جاكيتات", "ملابس داخلية"]
      },
      {
        title: "بنات",
        links: ["فساتين", "بلوزات", "تنانير", "جاكيتات"]
      },
      {
        title: "أطفال صغار",
        links: ["ملابس", "أحذية", "مستلزمات"]
      },
      {
        title: "مستلزمات المدرسة",
        links: ["حقائب", "قرطاسية", "زي مدرسي"]
      }
    ]
  },
  home: {
    columns: [
      {
        title: "غرفة المعيشة",
        links: ["أرائك", "طاولات", "سجاد", "إضاءة", "ديكور"]
      },
      {
        title: "غرفة النوم",
        links: ["أسرّة", "خزانات", "مفارش", "وسائد"]
      },
      {
        title: "مطبخ",
        links: ["أدوات طهي", "أدوات تقديم", "أجهزة صغيرة"]
      },
      {
        title: "حمام",
        links: ["مناشف", "ستائر", "إكسسوارات"]
      }
    ]
  },
  beauty: {
    columns: [
      {
        title: "مكياج",
        links: ["وجه", "عيون", "شفاه", "أظافر"]
      },
      {
        title: "عناية بالبشرة",
        links: ["منظفات", "مرطبات", "واقي شمس", "ماسكات"]
      },
      {
        title: "عناية بالشعر",
        links: ["شامبو", "بلسم", "علاجات", "تصفيف"]
      },
      {
        title: "عطور",
        links: ["نسائية", "رجالية", "مجموعات"]
      }
    ]
  },
  electronics: {
    columns: [
      {
        title: "هواتف وأجهزة لوحية",
        links: ["هواتف ذكية", "أجهزة لوحية", "إكسسوارات"]
      },
      {
        title: "كمبيوتر",
        links: ["لابتوب", "سطح المكتب", "شاشات", "إكسسوارات"]
      },
      {
        title: "أجهزة منزلية",
        links: ["تلفزيونات", "ثلاجات", "غسالات", "مكيفات"]
      },
      {
        title: "صوتيات",
        links: ["سماعات", "مكبرات صوت", "أنظمة صوت"]
      }
    ]
  },
  sports: {
    columns: [
      {
        title: "ملابس رياضية",
        links: ["رجالية", "نسائية", "أطفال"]
      },
      {
        title: "أحذية رياضية",
        links: ["جري", "كرة قدم", "تنس", "كرة سلة"]
      },
      {
        title: "معدات",
        links: ["أوزان", "يوجا", "كرات", "اكسسوارات"]
      },
      {
        title: "رياضات",
        links: ["كرة قدم", "جري", "سباحة", "كرة سلة"]
      }
    ]
  }
};

export const MegaMenu = ({ category }: MegaMenuProps) => {
  const menuData = megaMenuData[category as keyof typeof megaMenuData] || megaMenuData.all;

  return (
    <div className="container py-6 grid grid-cols-4 gap-8">
      {menuData.columns.map((column, index) => (
        <div key={index}>
          <h3 className="font-bold text-gray-900 mb-3">{column.title}</h3>
          <ul className="space-y-2">
            {column.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link to="#" className="text-sm text-gray-600 hover:text-trendyol-orange">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      {menuData.featured && (
        <div className="col-span-1">
          <div className="rounded-lg overflow-hidden">
            <Link to={menuData.featured.link}>
              <h3 className="font-bold text-gray-900 mb-2">{menuData.featured.title}</h3>
              <img 
                src={menuData.featured.image} 
                alt={menuData.featured.title} 
                className="w-full h-40 object-cover rounded" 
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
