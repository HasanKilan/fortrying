
import { Facebook, Twitter, Instagram, YouTube } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Footer = () => {
  const categories = [
    "Women", "Men", "Kids", "Home & Living", "Beauty", "Electronics", "Sports"
  ];

  const companyLinks = [
    "About Us", "Careers", "Partner with Us", "Press", "Contact Us"
  ];

  const helpLinks = [
    "Shipping & Delivery", "Returns & Exchanges", "FAQ", "Payment Options",
    "Size Guide", "Privacy Policy", "Terms of Service"
  ];

  return (
    <footer className="bg-trendyol-black text-white pt-12 pb-6">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Categories */}
          <div>
            <h4 className="text-lg font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-lg font-medium mb-4">Help & Support</h4>
            <ul className="space-y-2">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-trendyol-black border-gray-600 text-white placeholder:text-gray-400"
              />
              <Button className="bg-trendyol-orange hover:bg-trendyol-orange/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social & Payment */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <YouTube className="h-5 w-5" />
              </a>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} TrendHaven. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
