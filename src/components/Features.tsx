
import { Truck, RefreshCcw, ShieldCheck, Clock } from "lucide-react";

const features = [
  {
    title: "شحن مجاني",
    description: "للطلبات فوق 50 دولار",
    icon: Truck,
  },
  {
    title: "إرجاع سهل",
    description: "سياسة إرجاع 30 يومًا",
    icon: RefreshCcw,
  },
  {
    title: "دفع آمن",
    description: "حماية عند الدفع",
    icon: ShieldCheck,
  },
  {
    title: "دعم 24/7",
    description: "متواجدون دائمًا للمساعدة",
    icon: Clock,
  },
];

export const Features = () => {
  return (
    <div className="bg-trendyol-lightGray py-10">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="p-3 bg-trendyol-orange/10 rounded-full mb-3">
                <feature.icon className="h-6 w-6 text-trendyol-orange" />
              </div>
              <h3 className="font-medium text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
