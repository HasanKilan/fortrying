
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Spring Collection 2025</h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Discover the latest trends in fashion with our new spring collection. 
            Up to 50% off on selected items.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-trendyol-orange hover:bg-trendyol-orange/90 text-white"
            >
              Shop Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent hover:bg-white/10 text-white border-white"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="rounded-lg bg-white/10 p-2 shadow-xl animate-fade-in">
            <div className="aspect-[4/3] rounded overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Spring Collection" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-trendyol-orange text-white font-bold px-4 py-2 rounded-lg shadow-lg transform md:scale-110 animate-fade-in">
            <p className="text-sm">Limited Time</p>
            <p className="text-xl">-50%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
