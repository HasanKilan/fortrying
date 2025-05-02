
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Types
type Seller = {
  id: string;
  name: string;
  email: string;
  storeName: string;
};

type SellerAuthContextType = {
  seller: Seller | null;
  isAuthenticated: boolean;
  checkingAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, storeName: string) => Promise<void>;
  logout: () => void;
};

// Mock data - This would be replaced with actual API calls in a production app
const mockSellers = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    password: "password123",
    storeName: "متجر أحمد"
  },
  {
    id: "2",
    name: "فاطمة علي",
    email: "fatima@example.com",
    password: "password123",
    storeName: "بوتيك فاطمة"
  }
];

// Create context
const SellerAuthContext = createContext<SellerAuthContextType>({} as SellerAuthContextType);

// Provider component
export const SellerAuthProvider = ({ children }: { children: ReactNode }) => {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedSeller = localStorage.getItem("sellerData");
    if (storedSeller) {
      setSeller(JSON.parse(storedSeller));
    }
    setCheckingAuth(false);
  }, []);

  // Login function - in a real app this would call an API
  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundSeller = mockSellers.find(
          (s) => s.email === email && s.password === password
        );

        if (foundSeller) {
          // Remove password for security
          const { password, ...sellerData } = foundSeller;
          setSeller(sellerData);
          localStorage.setItem("sellerData", JSON.stringify(sellerData));
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800); // Simulate network delay
    });
  };

  // Register function - in a real app this would call an API
  const register = async (name: string, email: string, password: string, storeName: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check if email already exists
        if (mockSellers.some((s) => s.email === email)) {
          reject(new Error("Email already in use"));
          return;
        }

        // In a real app, this would be handled by the server
        const newSeller = {
          id: String(mockSellers.length + 1),
          name,
          email,
          storeName
        };

        setSeller(newSeller);
        localStorage.setItem("sellerData", JSON.stringify(newSeller));
        resolve();
      }, 800);
    });
  };

  // Logout function
  const logout = () => {
    setSeller(null);
    localStorage.removeItem("sellerData");
  };

  const value = {
    seller,
    isAuthenticated: !!seller,
    checkingAuth,
    login,
    register,
    logout
  };

  return (
    <SellerAuthContext.Provider value={value}>
      {children}
    </SellerAuthContext.Provider>
  );
};

// Custom hook
export const useSellerAuth = () => {
  const context = useContext(SellerAuthContext);
  if (context === undefined) {
    throw new Error("useSellerAuth must be used within a SellerAuthProvider");
  }
  return context;
};
