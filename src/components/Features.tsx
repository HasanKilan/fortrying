
import { Truck, RefreshCcw, ShieldCheck, Clock } from "lucide-react";

const features = [
  {
    title: "Free Shipping",
    description: "On orders over $50",
    icon: Truck,
  },
  {
    title: "Easy Returns",
    description: "30-day return policy",
    icon: RefreshCcw,
  },
  {
    title: "Secure Payments",
    description: "Protected checkout",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "Always here to help",
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
